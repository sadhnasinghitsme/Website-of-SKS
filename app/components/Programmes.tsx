import Image from "next/image";
import { content } from "@/lib/content";

export function Programmes() {
  const { programmes } = content;

  return (
    <section id="programmes" className="bg-lagoon doodle-dark">
      <div className="container-page py-16 sm:py-20">
        <p className="eyebrow text-flame">Curriculum</p>
        <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">{programmes.heading}</h2>
        <span className="rule-gold mt-4" />
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">
          {programmes.subheading}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {programmes.items.map((p, i) => (
            <article key={p.title} className="card group flex flex-col">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`cat-tag absolute left-3 top-3 ${
                    ["bg-sky", "bg-grape", "bg-coral"][i % 3]
                  }`}
                >
                  Curriculum
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/60">
          Programme areas and descriptions from the school&rsquo;s Curriculum page.
        </p>
      </div>
    </section>
  );
}
