import type { Config } from "tailwindcss";

/**
 * Bold / saturated palette (redesign).
 *
 * Inspired by dpsgrnoida.in + krmangalamgn.com, tuned for primary-colour energy:
 * clean white section backgrounds carry the content, and the accents are fully
 * saturated (rose, violet, royal-blue, orange, green) so they pop rather than
 * blend. Navy stays reserved for headings and the deep contrast bands.
 *
 * Primary   — royal navy-blue: headings, hero, stat band, footer, dark CTAs.
 *   #123C7A  ·  #0F3161  ·  #0B2547  ·  #071A33  ·  tint #E8F0FC
 * Accent    — vivid gold: pill CTAs, badges, stat numbers, gradient dividers.
 *   #FFB100  ·  #E09600  ·  text #8A5A00  ·  tint #FFF3D4
 * Secondary — deep teal: the Programmes band, eyebrows, icon chips.
 *   #0A7D71  ·  #065C53  ·  tint #D9F2EE
 *
 * Card / pill / section accents (each with a 50 tint + a text-safe 700):
 *   berry #E11D48 (rose)   grape #7C3AED (violet)   sky #1668E3 (blue)
 *   lime  #4D9E0E (green)  coral #F26419 (orange)
 *
 * Token names (brick / flame / lagoon / paper / sand / ink) are unchanged so the
 * component markup keeps working — only the values move.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary — royal navy blue
        brick: {
          DEFAULT: "#123C7A",
          600: "#0F3161",
          700: "#0B2547",
          800: "#071A33",
          50: "#E8F0FC",
        },
        // accent — vivid gold
        flame: {
          DEFAULT: "#FFB100",
          600: "#E09600",
          700: "#8A5A00",
          50: "#FFF3D4",
        },
        // secondary — deep teal
        lagoon: {
          DEFAULT: "#0A7D71",
          700: "#065C53",
          50: "#D9F2EE",
        },
        // card / pill / section accents — fully saturated
        berry: {
          DEFAULT: "#E11D48",
          700: "#9F1239",
          50: "#FFE4E9",
        },
        grape: {
          DEFAULT: "#7C3AED",
          700: "#5B21B6",
          50: "#EDE9FE",
        },
        sky: {
          DEFAULT: "#1668E3",
          700: "#0F4CA8",
          50: "#E0EDFF",
        },
        lime: {
          DEFAULT: "#4D9E0E",
          700: "#3A7A0A",
          50: "#E8F8CC",
        },
        coral: {
          DEFAULT: "#F26419",
          700: "#B4400E",
          50: "#FFE7D6",
        },
        ink: "#1F2A3C",
        paper: "#FFFFFF",
        sand: "#F3ECDD",
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo", "Segoe UI", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 4px rgba(19,61,122,0.06), 0 18px 40px -18px rgba(19,61,122,0.22)",
        lift: "0 28px 64px -24px rgba(11,37,71,0.38)",
        header: "0 6px 24px -12px rgba(11,37,71,0.26)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
