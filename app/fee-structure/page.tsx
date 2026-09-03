import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Fee Structure — ${content.school.name}, Noida`,
  description:
    "Composite fee structure documents for SKS World School, Noida (Sector 137), by academic year.",
  alternates: { canonical: "/fee-structure" },
};

const SITE = "https://sksworldschoolnoida.ac.in";

const DOCS: { year: string; label: string; href: string }[] = [
  {
    year: "2026–27",
    label: "Composite Fee Structure for Academic Year 2026-27",
    href: `${SITE}/wp-content/uploads/2026/01/Fees-Structure-26-27.pdf`,
  },
  {
    year: "2025–26",
    label: "Composite Fee Structure for Academic Year 2025-26",
    href: `${SITE}/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-19-at-12.34.44-PM.pdf`,
  },
  {
    year: "2024–25",
    label: "Composite Fee Structure for Academic Year 2024-25",
    href: `${SITE}/wp-content/uploads/2025/05/sks-fees-structure-2024-25.pdf`,
  },
  {
    year: "2023–24",
    label: "Composite Fee Structure for Academic Year 2023-24",
    href: `${SITE}/wp-content/uploads/2024/09/fee-structure-2023-24-to-upload.pdf`,
  },
  {
    year: "2022–23",
    label: "Composite Fee Structure for Academic Year 2022-23",
    href: `${SITE}/wp-content/uploads/2024/09/fees-2022-23.pdf`,
  },
  {
    year: "2021–22",
    label: "Fee Structure — Composite Annual Fees 2021-22",
    href: `${SITE}/wp-content/uploads/2024/09/fee-cbse.pdf`,
  },
];

function PdfIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

export default function FeeStructurePage() {
  return (
    <PageShell
      eyebrow="Admissions"
      title="Fee Structure"
      intro="The core motive behind the efforts made by the schools run under the SKS Group of Institutions has always been to provide a holistic and meaningful education in addition to the pursuit of academic excellence."
    >
      <div className="max-w-3xl">
        <h2 className="font-display text-xl font-bold text-brick-700 sm:text-2xl">
          Composite fee structure by academic year
        </h2>
        <span className="rule-gold mt-4" />

        <ul className="mt-8 space-y-3">
          {DOCS.map((d) => (
            <li key={d.year}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-ink/10 bg-white p-4 shadow-sm transition hover:border-brick/30 hover:shadow-card"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brick-50 text-brick-700">
                  <PdfIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold text-brick-700">
                    {d.year}
                  </span>
                  <span className="block truncate text-sm text-ink/60">
                    {d.label}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-flame-700">
                  PDF
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-4 border-t border-ink/10 pt-8">
          <div>
            <p className="font-display text-base font-semibold text-brick-700">
              Fee deposit
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              On confirmation of grant of admission, parents are required to
              deposit the fee within the stipulated time. Failing this, the offer
              of admission stands cancelled and the seat is offered to another
              applicant.
            </p>
          </div>
          <div>
            <p className="font-display text-base font-semibold text-brick-700">
              No donation
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              {content.admissions.antiDonation}
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs text-ink/45">
          Fee documents are published on sksworldschoolnoida.ac.in. Please confirm
          the current year&rsquo;s fee with the school office.
        </p>
      </div>
    </PageShell>
  );
}
