import Image from "next/image";
import { content } from "@/lib/content";

export function BeyondCurriculum() {
  const { beyondCurriculum } = content;

  return (
    <section id="beyond-curriculum">
      <div className="container-page py-16 sm:py-20">
        <p className="eyebrow">{beyondCurriculum.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">
          {beyondCurriculum.heading}
        </h2>
        <span className="rule-gold mt-4" />

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {beyondCurriculum.items.map((it, i) => (
            <li key={it.title} className="card group flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`cat-tag absolute left-3 top-3 ${
                    ["bg-lime", "bg-coral", "bg-sky", "bg-grape"][i % 4]
                  }`}
                >
                  Activity
                </span>
              </div>
              <p className="px-4 py-4 text-center text-sm font-semibold leading-snug text-ink">
                {it.title}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-ink/45">
          Activities from the school&rsquo;s Key Factors and Infrastructure pages;
          photos re-hosted from sksworldschoolnoida.ac.in.
        </p>
      </div>
    </section>
  );
}
