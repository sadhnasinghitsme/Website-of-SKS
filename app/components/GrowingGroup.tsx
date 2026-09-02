import { content } from "@/lib/content";

export function GrowingGroup() {
  const { growingGroup } = content;

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="rounded-3xl bg-brick px-6 py-12 text-white sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          SKS Group of Institutions
        </p>
        <h2 className="mt-2 text-3xl text-white sm:text-4xl">{growingGroup.heading}</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">
          {growingGroup.intro}
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {growingGroup.campuses.map((c) => (
            <li
              key={c.name}
              className="rounded-xl border border-white/15 bg-white/5 p-5"
            >
              <span className="inline-block rounded-full bg-flame px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink">
                {c.status}
              </span>
              <p className="mt-3 font-display text-lg leading-snug">{c.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
