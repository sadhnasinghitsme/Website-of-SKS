import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Chairman's Message — ${content.school.name}, Noida`,
  description:
    "A message from Shri S.K. Sharma, Chairman, SKS Group, on the vision behind SKS World School, Noida.",
  alternates: { canonical: "/chairman-message" },
};

const PARAGRAPHS = [
  "It feels delightful to exemplify the endeavour, motivation and striving of the mentors and parents who come forward and join hands for the better growth of students. Staying informed is the vital factor for every walk of life. To keep abreast of the latest technology and developing society, we have directed all our efforts towards bringing up the Chain of SKS World Schools as Centre of Excellence in Education and nurturing the children of present into the Celebrities/leaders of tomorrow.",
  "I am pleased to extend my appreciation towards the untiring efforts put in by the Principal, Staff, Parents to evolve the school as a real abode of education. Having faith in Almighty I expect the consistency in good work and best spirit and wish the school to scale to a new level of success in coming years.",
];

export default function ChairmanMessagePage() {
  return (
    <PageShell eyebrow="About" title="Chairman's Message">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col items-center rounded-2xl border border-ink/10 bg-sand p-6 text-center shadow-card">
            <span
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-brick-700 font-display text-2xl font-bold text-flame"
            >
              SKS
            </span>
            <p className="mt-4 font-display text-lg font-bold text-brick-700">
              Shri S.K. Sharma
            </p>
            <p className="text-xs uppercase tracking-wider text-ink/55">
              Chairman, SKS Group
            </p>
          </div>
        </aside>

        <article>
          <blockquote className="border-l-2 border-flame pl-5 font-display text-xl italic leading-relaxed text-brick-700 sm:text-2xl">
            &ldquo;Education is the foundation upon which we build our future.&rdquo;
            <cite className="mt-2 block text-sm not-italic uppercase tracking-wider text-ink/50">
              — Christine Gregoire
            </cite>
          </blockquote>

          <p className="mt-8 font-display text-lg font-semibold text-ink">
            Dear Parents,
          </p>

          <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-ink/75 sm:text-base">
            {PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="font-display text-lg font-bold text-brick-700">
              Shri S.K. Sharma
            </p>
            <p className="text-sm text-ink/60">Chairman, SKS Group</p>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
