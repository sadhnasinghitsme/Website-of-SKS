import Image from "next/image";
import { content } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";

export function Hero() {
  const { hero, images } = content;
  const [l1, l2, l3] = hero.headlineLines;

  return (
    <section className="relative isolate bg-brick-700 lg:min-h-[600px]">
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,58,0.80)_0%,rgba(11,31,58,0.58)_42%,rgba(11,31,58,0.30)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,31,58,0.40)_0%,rgba(11,31,58,0)_58%)] sm:bg-[linear-gradient(0deg,rgba(11,31,58,0.24)_0%,rgba(11,31,58,0)_52%)]" />
      </div>

      <div className="container-page grid items-center gap-10 pb-16 pt-14 sm:pt-16 lg:grid-cols-[1fr_minmax(350px,420px)] lg:gap-12 lg:pb-24 lg:pt-24">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">{l1}</span>
            <span className="block text-flame">{l2}</span>
            <span className="block">{l3}</span>
          </h1>

          <p className="mt-5 text-base text-white/80 sm:text-lg">{hero.subhead}</p>

          <span className="mt-6 block h-px w-24 bg-flame" />
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
