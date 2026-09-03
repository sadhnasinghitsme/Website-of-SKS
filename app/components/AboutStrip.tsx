import Image from "next/image";
import { content, telHref } from "@/lib/content";

export function AboutStrip() {
  const { welcome, school, contact, about, philosophy, images } = content;

  const facts = [
    { label: "Board", value: `CBSE · Affiliation No. ${school.affiliationNo}` },
    { label: "Campus", value: "Opp. Sector 137 Metro Station" },
    {
      label: "Admissions desk",
      value: contact.phones[0],
      href: telHref(contact.phones[0]),
    },
  ];

  return (
    <section id="about" className="bg-paper">
      <div className="container-page pb-14 pt-16 lg:pb-16 lg:pt-36">
        {/* 1 — About SKS World School — image-left / text-right card row */}
        <div className="card grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[260px] lg:min-h-full">
            <Image
              src={images.aboutPhoto}
              alt="SKS World School campus grounds, Sector 137 Noida"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="p-7 sm:p-10">
            <p className="eyebrow">About the school</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">
              About SKS World School
            </h2>
            <span className="rule-gold mt-4" />
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75 sm:text-base">
              {welcome.paragraphs[0]}
            </p>

            <dl className="mt-8 grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-3">
              {facts.map((it) => (
                <div key={it.label}>
                  <dt className="eyebrow">{it.label}</dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold text-ink">
                    {it.href ? (
                      <a href={it.href} className="text-brick hover:text-flame-700">
                        {it.value}
                      </a>
                    ) : (
                      it.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 2 — Prime Location */}
        <div className="mt-14 border-t border-ink/10 pt-10">
          <h3 className="font-display text-xl sm:text-2xl">Prime Location</h3>
          <span className="rule-gold mt-4" />
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/75">
            {about.locationCopy}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {about.proximity.map((p, i) => (
              <li
                key={p.place}
                className={`rounded-full px-3.5 py-1.5 text-sm text-white shadow-sm ${
                  ["bg-sky", "bg-grape", "bg-lagoon", "bg-coral", "bg-berry", "bg-brick", "bg-lime-700"][
                    i % 7
                  ]
                }`}
              >
                <span className="font-display font-bold">{p.distance}</span>
                <span className="text-white/50"> — </span>
                <span className="text-white/90">{p.place}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3 — Our Philosophy */}
        <div className="mt-14 border-t border-ink/10 pt-10">
          <h3 className="font-display text-xl sm:text-2xl">{philosophy.heading}</h3>
          <span className="rule-gold mt-4" />
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/75">
            {philosophy.statement}
          </p>

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
      </div>
    </section>
  );
}
