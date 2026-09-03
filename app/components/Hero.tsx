import Image from "next/image";
import { content } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";

export function Hero() {
  const { hero, images } = content;
  const [l1, l2, l3] = hero.headlineLines;

  return (
    <section className="relative isolate bg-brick-700 lg:min-h-[640px]">
      {/* full-bleed campus photo from sksworldschoolnoida.ac.in + navy overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.heroPhoto}
          alt="SKS World School campus, Sector 137 Noida"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay: darker on the left (behind the headline), fading lighter to
            the right and toward the top so the campus photo stays visible.
            A little extra weight at the bottom on small screens keeps the
            stacked headline readable. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,0.90)_0%,rgba(11,37,71,0.68)_44%,rgba(11,37,71,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,26,51,0.55)_0%,rgba(11,37,71,0)_60%)] sm:bg-[linear-gradient(0deg,rgba(11,37,71,0.30)_0%,rgba(11,37,71,0)_52%)]" />
      </div>

      <div className="container-page grid items-center gap-10 pb-16 pt-14 sm:pt-16 lg:grid-cols-[1fr_minmax(350px,420px)] lg:gap-12 lg:pb-24 lg:pt-28">
        <div className="max-w-2xl">
          <span className="badge-hot">{hero.eyebrow}</span>

          <h1 className="mt-6 font-display text-[2.75rem] font-black leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.1]">
            <span className="block">{l1}</span>
            <span className="block text-flame">{l2}</span>
            <span className="block">{l3}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hero.subhead}
          </p>

          <span className="rule-gold mt-8" />
        </div>

        <div className="lg:-mb-28">
          <div id="enquiry" className="scroll-mt-28">
            <EnquiryForm pill />
          </div>
        </div>
      </div>
    </section>
  );
}
