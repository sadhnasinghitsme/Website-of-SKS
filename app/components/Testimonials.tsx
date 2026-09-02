import { content } from "@/lib/content";

export function Testimonials() {
  const { testimonials } = content;

  return (
    <section className="bg-sand">
      <div className="container-page py-16 sm:py-20">
        <p className="eyebrow">What parents say</p>
        <h2 className="mt-2 text-3xl text-brick sm:text-4xl">In their words</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-card sm:p-8"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" className="text-flame" aria-hidden="true">
                <path
                  d="M10 7c-3 1-4.5 3.4-4.5 6.5V18H10v-4.5H7.7C7.9 11 8.8 9.6 10.5 9L10 7Zm8 0c-3 1-4.5 3.4-4.5 6.5V18H18v-4.5h-2.3c.2-2.5 1.1-3.9 2.8-4.5L18 7Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-ink/10 pt-4">
                <span className="font-display text-lg text-brick">{t.name}</span>
                <span className="block text-xs uppercase tracking-wider text-ink/50">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
