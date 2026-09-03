import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `School Timings — ${content.school.name}, Noida`,
  description:
    "Seasonal class timings at SKS World School, Noida (Sector 137), and administration office hours.",
  alternates: { canonical: "/school-timings" },
};

const ROWS = [
  {
    classes: "Classes I – IX",
    summer: "7:45 AM – 1:45 PM",
    winter: "8:10 AM – 2:10 PM",
  },
];

export default function SchoolTimingsPage() {
  return (
    <PageShell
      eyebrow="Academics"
      title="School Timings"
      intro="The school follows a structured seasonal schedule through the year."
    >
      <div className="max-w-3xl">
        <div className="overflow-x-auto rounded-2xl border border-ink/10 shadow-card">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-brick-700 text-white">
                <th className="px-5 py-4 font-display font-semibold">Class</th>
                <th className="px-5 py-4 font-display font-semibold">
                  Summer <span className="font-normal text-white/70">(April – November)</span>
                </th>
                <th className="px-5 py-4 font-display font-semibold">
                  Winter <span className="font-normal text-white/70">(December – March)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.classes} className="border-t border-ink/10 bg-white">
                  <td className="px-5 py-4 font-semibold text-brick-700">
                    {r.classes}
                  </td>
                  <td className="px-5 py-4 text-ink/75">{r.summer}</td>
                  <td className="px-5 py-4 text-ink/75">{r.winter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl border border-ink/10 bg-sand p-5">
          <p className="font-display text-base font-semibold text-brick-700">
            Administration Office
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
            {content.contact.officeHours}. Registration forms are available at the
            Administration Office on all working days from 9:00 AM to 2:00 PM.
          </p>
        </div>

        <p className="mt-6 text-xs text-ink/45">
          Timings as published on the school&rsquo;s website; please confirm the
          current schedule with the school office before planning travel.
        </p>
      </div>
    </PageShell>
  );
}
