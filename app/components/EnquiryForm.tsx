"use client";

import { useState } from "react";
import { content, waHref } from "@/lib/content";
import { api, ApiError } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";
type Variant = "enquiry" | "contact";

const COPY = {
  enquiry: {
    eyebrow: "Admission Enquiry",
    heading: "Provide Your Details",
    sub: "The admissions team will call you back.",
    submit: "Submit Enquiry",
    submitting: "Sending…",
    successTitle: "Enquiry received",
    successBody:
      "Thank you — your enquiry has reached the admissions team. We will call you shortly.",
    again: "Submit another enquiry",
  },
  contact: {
    eyebrow: "Contact form",
    heading: "Send us a message",
    sub: "Fill in your details and we'll get back to you.",
    submit: "Send Message",
    submitting: "Sending…",
    successTitle: "Message sent",
    successBody:
      "Thank you for reaching out — we've received your message and will get back to you soon.",
    again: "Send another message",
  },
} as const satisfies Record<Variant, Record<string, string>>;

export function EnquiryForm({
  compact = false,
  pill = false,
  variant = "enquiry",
  onSuccess,
}: {
  compact?: boolean;
  pill?: boolean;
  variant?: Variant;
  onSuccess?: () => void;
}) {
  const { gradeOptions, contact } = content;
  const isContact = variant === "contact";
  const copy = COPY[variant];

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    grade: "",
    message: "",
    company: "", // honeypot
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const input = `field-input${pill ? " rounded-full px-4" : ""}`;
  const area = `field-input resize-none${pill ? " rounded-3xl px-4" : ""}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: a filled "company" field means a bot — pretend success, send nothing.
    if (form.company.trim()) {
      setStatus("success");
      setMessage(copy.successBody);
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      if (isContact) {
        await api.submitContact({
          name: form.name.trim(),
          email: form.email.trim(),
          mobile: form.phone.trim(),
          message: form.message.trim(),
        });
      } else {
        await api.submitEnquiry({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          grade: form.grade || undefined,
          message: form.message.trim() || undefined,
        });
      }

      setStatus("success");
      setMessage(copy.successBody);
      setForm({ name: "", phone: "", email: "", grade: "", message: "", company: "" });

      if (!isContact) {
        try {
          sessionStorage.setItem("sks_enquiry_submitted", "1");
        } catch {
          /* storage blocked — fine */
        }
      }
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError) {
        setMessage(
          err.fieldErrors?.length
            ? err.fieldErrors.map((f) => f.message).join(" ")
            : err.message,
        );
      } else {
        setMessage("Something went wrong. Please try again, or call us instead.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-lagoon/30 bg-lagoon-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-lagoon text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-lg text-brick">{copy.successTitle}</p>
        <p className="mt-1 text-sm text-ink/70">{message}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-lagoon-700 underline"
        >
          {copy.again}
        </button>
      </div>
    );
  }

  const waMessage = `Hi, I would like to enquire about admission at ${content.school.name}${
    form.grade ? ` for ${form.grade}` : ""
  }.${form.name ? ` Name: ${form.name}.` : ""}`;

  return (
    <form
      onSubmit={onSubmit}
      className={
        compact
          ? "space-y-3"
          : "rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-7"
      }
    >
      {!compact && (
        <div className="mb-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-1 font-display text-xl sm:text-2xl">{copy.heading}</h2>
          <p className="mt-1 text-sm text-ink/60">{copy.sub}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="field-label">
            {isContact ? "Name" : "Student / Parent name"}
            <span className="text-flame-600"> *</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            className={input}
            placeholder="Full name"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="phone" className="field-label">
            {isContact ? "Mobile number" : "Phone"}
            <span className="text-flame-600"> *</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-medium text-ink/45">
              +91
            </span>
            <input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9 ]{10,12}"
              value={form.phone}
              onChange={set("phone")}
              className={`${input} pl-11`}
              placeholder="Mobile number"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="field-label">
            Email
            {isContact && <span className="text-flame-600"> *</span>}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required={isContact}
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            className={input}
            placeholder="you@email.com"
          />
        </div>

        {!isContact && (
          <div className="sm:col-span-2">
            <label htmlFor="grade" className="field-label">
              Grade applying for
            </label>
            <select
              id="grade"
              name="grade"
              value={form.grade}
              onChange={set("grade")}
              className={input}
            >
              <option value="">Select a class</option>
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Message
            {isContact && <span className="text-flame-600"> *</span>}
          </label>
          <textarea
            id="message"
            name="message"
            required={isContact}
            rows={compact ? 2 : 3}
            value={form.message}
            onChange={set("message")}
            className={area}
            placeholder={
              isContact
                ? "How can we help?"
                : "Anything you would like the admissions team to know"
            }
          />
        </div>
      </div>

      {/* honeypot — hidden from humans, tempting to bots */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={set("company")}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-brick-50 px-3 py-2 text-sm text-brick-700"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="btn-primary mt-4 w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>

      <p className="mt-3 text-center text-xs text-ink/50">
        Prefer WhatsApp?{" "}
        <a
          href={waHref(contact.phones[0], waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-lagoon-700 underline"
        >
          Message us on {contact.phones[0]}
        </a>
      </p>
    </form>
  );
}
