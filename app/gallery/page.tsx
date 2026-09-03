import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Gallery — ${content.school.name}, Noida`,
  description:
    "Moments from assemblies, celebrations and activities at SKS World School, Noida (Sector 137).",
  alternates: { canonical: "/gallery" },
};

const BASE = "https://sksworldschoolnoida.ac.in/wp-content/uploads";

const ALBUMS: { title: string; images: string[] }[] = [
  {
    title: "A New Beginning — First Day in School",
    images: [
      `${BASE}/2026/06/FIRST-DAY.jpg`,
      `${BASE}/2026/06/FIRST-DAY-1.jpg`,
      `${BASE}/2026/06/FIRST-DAY-2.jpg`,
      `${BASE}/2026/06/FIRST-DAY-3.jpg`,
      `${BASE}/2026/06/FIRST-DAY-4.jpg`,
    ],
  },
  {
    title: "Earth Day Celebration",
    images: [
      `${BASE}/2026/06/EARTH-DAY.jpg`,
      `${BASE}/2026/06/EARTH-DAY-1.jpg`,
      `${BASE}/2026/06/EARTH-DAY-2.jpg`,
      `${BASE}/2026/06/EARTH-DAY-3.jpg`,
      `${BASE}/2026/06/EARTH-DAY-4.jpg`,
    ],
  },
  {
    title: "Mother's Day Celebration",
    images: [
      `${BASE}/2026/06/MOTHERS-DAY.jpg`,
      `${BASE}/2026/06/MOTHERS-DAY-1.jpg`,
      `${BASE}/2026/06/MOTHERS-DAY-2.jpg`,
      `${BASE}/2026/06/MOTHERS-DAY-3.jpg`,
      `${BASE}/2026/06/MOTHERS-DAY-4.jpg`,
    ],
  },
  {
    title: "Creative Expressions: The Learning Canvas",
    images: [
      `${BASE}/2026/06/CREATIVE-EXPRESSIONS.jpg`,
      `${BASE}/2026/06/CREATIVE-EXPRESSIONS-1.jpg`,
      `${BASE}/2026/06/CREATIVE-EXPRESSIONS-2.jpg`,
      `${BASE}/2026/06/CREATIVE-EXPRESSIONS-3.jpg`,
      `${BASE}/2026/06/CREATIVE-EXPRESSIONS-4.jpg`,
    ],
  },
  {
    title: "Children's Day Celebration",
    images: [
      `${BASE}/2025/11/1-1.jpg`,
      `${BASE}/2025/11/2-2.jpg`,
      `${BASE}/2025/11/3-2.jpg`,
      `${BASE}/2025/11/4-1.jpg`,
      `${BASE}/2025/11/5-1.jpg`,
      `${BASE}/2025/11/6-1.jpg`,
    ],
  },
  {
    title: "Holi Celebration",
    images: [
      `${BASE}/2026/03/1.jpg`,
      `${BASE}/2026/03/2.jpg`,
      `${BASE}/2026/03/3.jpg`,
      `${BASE}/2026/03/4.jpg`,
      `${BASE}/2026/03/5.jpg`,
    ],
  },
];

export default function GalleryPage() {
  return (
    <PageShell
      eyebrow="Campus"
      title="Gallery"
      intro="Assemblies, celebrations and everyday learning at SKS World School, Sector 137."
    >
      <div className="space-y-14">
        {ALBUMS.map((album) => (
          <section key={album.title}>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-bold text-brick-700 sm:text-2xl">
                {album.title}
              </h2>
              <span className="h-px flex-1 bg-ink/10" />
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {album.images.map((src) => (
                <li
                  key={src}
                  className="group overflow-hidden rounded-xl border border-ink/10 bg-sand shadow-sm"
                >
                  {/* Photos re-hosted on sksworldschoolnoida.ac.in */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={album.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-xs text-ink/45">
        Photographs from the school&rsquo;s gallery, hosted on
        sksworldschoolnoida.ac.in.
      </p>
    </PageShell>
  );
}
