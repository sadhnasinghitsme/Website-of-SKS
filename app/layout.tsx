import type { Metadata, Viewport } from "next";
import { Archivo, Poppins } from "next/font/google";
import "./globals.css";
import { content } from "@/lib/content";

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const { school } = content;
const title = `${school.name}, Noida — Admissions ${content.hero.eyebrow}`.trim();
const description = `Admissions at ${school.name}, ${school.location}. CBSE-affiliated (No. ${school.affiliationNo}) co-educational school opposite Sector 137 Metro Station, run by the ${school.trust}. Enquire online.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://sksworldschoolnoida.ac.in"),
  title,
  description,
  keywords: [
    "SKS World School",
    "Noida Sector 137 school",
    "CBSE school Noida Expressway",
    "school admission Noida",
    "best school in Noida Expressway",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    images: [content.images.campus],
  },
  icons: { icon: content.images.logoMark },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B2547",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
