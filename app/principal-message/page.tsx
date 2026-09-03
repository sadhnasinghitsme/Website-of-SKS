import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Principal's Message — ${content.school.name}, Noida`,
  description:
    "A message from the Principal of SKS World School, Noida, on the school's approach to purposeful, value-based learning.",
  alternates: { canonical: "/principal-message" },
};

const PARAGRAPHS = [
  "It gives me immense pleasure and sense of pride to be associated with SKS World School where we work with a mission to impart quality education to children from all sections of society without any prejudice.",
  "The School years are time for growth, challenges and discovery.",
  "We at SKS World School firmly believe that each and every child is very special and significant with a different hue and a different fragrance. We will leave no stone unturned to open vistas of growth for children where they can show their creativity and exercise their imagination and to surpass thyself.",
  "With the support of highly qualified and trained teachers, we envisage to provide an environment where learning is purposeful, progressive and empowering. In this era, quality education goes way beyond the theoretical knowledge with emphasis on values and skills that help young minds evolve into better individuals.",
  "Parents are important stake holders in our bid to provide quality education and skill building amongst students and we are grateful to all parents for their continuous support and active participation in our aim for improving the quality of education and shaping our children to gear up for the bright future.",
];

export default function PrincipalMessagePage() {
  return (
    <PageShell eyebrow="About" title="Principal's Message">
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
              Principal
            </p>
            <p className="text-xs uppercase tracking-wider text-ink/55">
              SKS World School, Noida
            </p>
          </div>
        </aside>

        <article>
          <blockquote className="border-l-2 border-flame pl-5 font-display text-xl italic leading-relaxed text-brick-700 sm:text-2xl">
            &ldquo;The future belongs to those who believe in the beauty of their
            dreams.&rdquo;
            <cite className="mt-2 block text-sm not-italic uppercase tracking-wider text-ink/50">
              — Eleanor Roosevelt
            </cite>
          </blockquote>

          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink/75 sm:text-base">
            {PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="font-display text-lg font-bold text-brick-700">Principal</p>
            <p className="text-sm text-ink/60">SKS World School, Sector 137, Noida</p>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
