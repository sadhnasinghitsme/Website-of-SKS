import type { Config } from "tailwindcss";

/**
 * Cool / premium palette (redesign).
 *
 * Primary  — deep navy, used for the hero, stat band, feature blocks and the
 *            final CTA. Header and footer stay near-white.
 *   navy    #14315C  ·  darker #0F2649 / #0B1F3A  ·  tint #EAF0F8
 * Accent   — soft gold, used sparingly for CTAs, the "Admissions Open" badge,
 *            stat numbers and highlights.
 *   gold    #D4A94D  ·  hover #BE9339
 * Secondary— muted teal, minimal — eyebrows, small icons, pale callout fills.
 *   teal    #3E7C79  ·  darker #2F5F5D  ·  tint #EAF2F1
 * Neutrals — cool off-white base with a light-grey for alternating sections;
 *            charcoal-navy text.
 *
 * Token names (brick / flame / lagoon / paper / sand / ink) are kept so the
 * component markup is unchanged — only the values move.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary — navy
        brick: {
          DEFAULT: "#14315C",
          600: "#0F2649",
          700: "#0B1F3A",
          50: "#EAF0F8",
        },
        // accent — gold
        flame: {
          DEFAULT: "#D4A94D",
          600: "#BE9339",
        },
        // secondary — muted teal
        lagoon: {
          DEFAULT: "#3E7C79",
          700: "#2F5F5D",
          50: "#EAF2F1",
        },
        ink: "#1C2A3A",
        paper: "#FAFBFC",
        sand: "#EDF1F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.06), 0 12px 28px -12px rgba(15,23,42,0.18)",
        lift: "0 24px 60px -24px rgba(11,31,58,0.35)",
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
