import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { EnquiryForm } from "../components/EnquiryForm";
import { content, telHref, waHref } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact Us — ${content.school.name}, Noida`,
  description:
    "Get in touch with SKS World School, Sector 137, Noida — address, phone numbers, email and admission enquiries.",
  alternates: { canonical: "/contact" },
};

const { school, contact } = content;
const waMessage = `Hi, I would like to enquire about admission at ${school.name}.`;

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 3.5c.5 0 .9.3 1 .8l.9 3c.1.4 0 .8-.3 1L6.8 12a13 13 0 0 0 5.2 5.2l1.7-1.3c.3-.2.7-.3 1-.2l3 .9c.5.1.8.5.8 1V21c0 .6-.5 1-1 1A17 17 0 0 1 3 6c0-.6.4-1 1-1h2.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A8 8 0 1 1 12 20Zm4.5-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.9.9-1.1 2-.8 3.1a11 11 0 0 0 4.6 5c.7.3 1.7.7 2.5.6.7-.1 1.4-.6 1.7-1.1.2-.4.2-.8.1-1l-.4-.2Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Contact Us"
      intro={`${school.name} — ${contact.addressLines
        .slice(1)
        .join(", ")}. Affiliated to ${school.board}, New Delhi — Affiliation No. ${school.affiliationNo}.`}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Contact details */}
        <div>
          <p className="eyebrow">Reach us</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">
            Admissions &amp; general enquiries
          </h2>
          <span className="rule-gold mt-4" />

          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-700">
                <PinIcon />
              </span>
              <div>
                <dt className="eyebrow">Address</dt>
                <dd className="mt-1.5">
                  <address className="space-y-0.5 text-[15px] not-italic leading-relaxed text-ink/75">
                    {contact.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-700">
                <PhoneIcon />
              </span>
              <div>
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-1.5 space-y-0.5 text-[15px] text-ink/75">
                  {contact.phones.map((p) => (
                    <a
                      key={p}
                      href={telHref(p)}
                      className="block font-medium text-brick hover:text-flame-700"
                    >
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-700">
                <MailIcon />
              </span>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-1.5 text-[15px]">
                  <a
                    href={`mailto:${contact.email}`}
                    className="break-all font-medium text-brick hover:text-flame-700"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-700">
                <PhoneIcon />
              </span>
              <div>
                <dt className="eyebrow">Office hours</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-ink/75">
                  {contact.officeHours}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waHref(contact.phones[0], waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon />
              WhatsApp us
            </a>
            <a
              href={contact.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Contact form — POSTs to the backend /api/contact endpoint */}
        <div id="enquiry" className="scroll-mt-28">
          <EnquiryForm variant="contact" />
        </div>
      </div>

      {/* Embedded Google Map — same embed as the homepage #location section */}
      <div className="mt-14">
        <h2 className="font-display text-2xl sm:text-3xl">Find us</h2>
        <span className="rule-gold mt-4" />
        <div className="relative mt-6 h-72 overflow-hidden rounded-2xl border border-ink/10 bg-sand shadow-card sm:h-96">
          <span className="absolute inset-0 flex items-center justify-center text-sm text-ink/45">
            Loading map…
          </span>
          <iframe
            title={`Map to ${school.name}`}
            src={contact.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="relative h-full w-full border-0"
          />
        </div>
      </div>
    </PageShell>
  );
}
