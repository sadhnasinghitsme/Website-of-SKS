import { NextResponse } from "next/server";
import { content } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Payload {
  name?: string;
  phone?: string;
  email?: string;
  grade?: string;
  message?: string;
  company?: string; // honeypot
}

// Best-effort in-memory rate limit (per warm serverless instance).
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept so bots don't learn.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 160);
  const grade = clean(body.grade, 40);
  const message = clean(body.message, 2000);

  const digits = phone.replace(/\D/g, "");
  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter a name." }, { status: 422 });
  }
  if (digits.length < 10 || digits.length > 12) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 422 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });
  }

  const to = process.env.ENQUIRY_TO || content.contact.email;
  const from = process.env.ENQUIRY_FROM || "SKS World School <onboarding@resend.dev>";
  const cc =
    process.env.ENQUIRY_CC?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  const apiKey = process.env.RESEND_API_KEY;

  const submittedAt = new Date().toISOString();
  const lines = [
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email || "—"}`,
    `Grade:   ${grade || "—"}`,
    `Message: ${message || "—"}`,
    ``,
    `IP:      ${ip}`,
    `Time:    ${submittedAt}`,
  ].join("\n");

  const html = `
    <h2 style="font-family:Georgia,serif;color:#9B2F33;margin:0 0 12px">New admission enquiry</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td style="padding:4px 0"><strong>${esc(name)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td style="padding:4px 0"><a href="tel:${esc(digits)}">${esc(phone)}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td style="padding:4px 0">${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Grade</td><td style="padding:4px 0">${esc(grade) || "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">Message</td><td style="padding:4px 0">${esc(message).replace(/\n/g, "<br>") || "—"}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;margin-top:16px">Submitted ${esc(submittedAt)} · IP ${esc(ip)}</p>
  `;

  if (!apiKey) {
    // Dev / preview without a key: don't fail the UX, just log.
    console.warn("[enquiry] RESEND_API_KEY not set — enquiry logged only:\n" + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      cc: cc.length ? cc : undefined,
      replyTo: email || undefined,
      subject: `Admission enquiry — ${name}${grade ? ` (${grade})` : ""}`,
      text: lines,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] send failed:", err);
    return NextResponse.json(
      { error: "Could not send right now. Please call the admissions desk." },
      { status: 502 },
    );
  }
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
