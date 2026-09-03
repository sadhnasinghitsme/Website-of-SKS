import Image from "next/image";
import { content } from "@/lib/content";

/**
 * One cohesive icon set for the "Why SKS World School" grid — Lucide
 * (https://lucide.dev, ISC licence), inlined so there's no runtime dependency.
 * Every icon: 24×24 viewBox, 1.75 stroke, rounded caps/joins, navy `currentColor`.
 * No third-party brand marks.
 */
const ICONS: Record<string, React.ReactNode> = {
  // bot
  robotics: (
    <>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
    </>
  ),
  // presentation
  smartboard: (
    <>
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </>
  ),
  // bus
  transport: (
    <>
      <path d="M8 6v6M15 6v6M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </>
  ),
  // message-square-text
  sms: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  // film
  documentary: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4" />
    </>
  ),
  // award
  award: (
    <>
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </>
  ),
  // shield-check
  cbse: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  // venetian-mask (theatre masks)
  drama: (
    <>
      <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z" />
      <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" />
      <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" />
    </>
  ),
};

function FeatureIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[22px] w-[22px]"
    >
      {ICONS[name] ?? ICONS.award}
    </svg>
  );
}

export function WhySks() {
  const { keyFactors, welcome, images } = content;

  return (
    <section id="why" className="container-page py-16 sm:py-20">
      {/* image-right / text-left card row */}
      <div className="card grid gap-0 lg:grid-cols-2">
        <div className="p-7 sm:p-10">
          <p className="eyebrow">Why SKS World School</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">{welcome.heading}</h2>
          <span className="rule-gold mt-4" />
          {/* paragraphs[0] is shown in the About strip under the hero */}
          {welcome.paragraphs[1] && (
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              {welcome.paragraphs[1]}
            </p>
          )}
        </div>

        <div className="relative order-first min-h-[260px] lg:order-last lg:min-h-full">
          <Image
            src={images.whyPhoto}
            alt="Students in an interactive classroom at SKS World School"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyFactors.map((f, i) => (
          <li
            key={f.title}
            className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-card"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full text-white ${
                ["bg-sky", "bg-berry", "bg-lagoon", "bg-grape", "bg-coral", "bg-brick", "bg-lime-700"][
                  i % 7
                ]
              }`}
            >
              <FeatureIcon name={f.key} />
            </span>
            <span className="text-sm font-semibold leading-snug text-ink">{f.title}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-ink/45">
        Key Factors as listed on the school&rsquo;s homepage.
      </p>
    </section>
  );
}
