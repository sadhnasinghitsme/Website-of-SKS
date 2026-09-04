import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBar } from "./MobileBar";

/**
 * Shared shell for the secondary pages reached from the slide-in menu.
 * Navy title band + gold rule, matching the home-page section styling,
 * then the page body inside the standard container.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <section className="bg-brick-700 text-white doodle-dark">
          <div className="container-page py-14 sm:py-20">
            <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-flame">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden="true" className="text-white/40">
                /
              </span>
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
                {intro}
              </p>
            )}
            <span className="rule-gold mt-6" />
          </div>
        </section>

        <div className="container-page py-14 sm:py-20">{children}</div>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
