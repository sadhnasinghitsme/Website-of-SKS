import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Our Vision & Philosophy — ${content.school.name}, Noida`,
  description:
    "The SKS Group's commitment to a well-rounded, values-driven education that goes beyond academic achievement — individual attention and value-based learning at SKS World School, Noida.",
  alternates: { canonical: "/vision-philosophy" },
};

const PARAGRAPHS = [
  "The SKS Group of Institutions is committed to delivering a well-rounded, values-driven education that goes beyond academic achievement alone.",
  "We place strong emphasis on nurturing personal values alongside learning, believing that academic growth should form the foundation — not the entirety — of a child's development. Our approach is to give every student individual attention and a values-based education that helps them realize their full potential and grow into capable leaders.",
  "SKS World School is an English-medium, co-educational institution operating under the SKS Educational & Social Trust, led by Chairman Shri S.K. Sharma.",
];

export default function VisionPhilosophyPage() {
  const { philosophy } = content;

  return (
    <PageShell eyebrow="About" title="Our Vision & Philosophy">
      <div className="max-w-3xl space-y-5 text-[15px] leading-relaxed text-ink/75 sm:text-base">
        {PARAGRAPHS.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <div className="mt-12 border-t border-ink/10 pt-10">
        <h2 className="font-display text-xl sm:text-2xl">Our core values</h2>
        <span className="rule-gold mt-4" />
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {philosophy.values.map((v) => (
            <div key={v.name} className="border-l-2 border-flame pl-4">
              <dt className="font-display text-base font-semibold text-ink">
                {v.name}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink/70">{v.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PageShell>
  );
}
