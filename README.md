# SKS World School, Noida — Admissions Landing Page

Single-page, mobile-first admissions landing page for **SKS World School,
Sector 137, Noida** (CBSE Affiliation No. 2134003), run by the SKS Educational
& Social Trust.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. Deployable
on Vercel with zero configuration.

## How content works

Nothing on the page is hand-typed marketing copy. A build-time script,
[`scripts/fetch-content.mjs`](scripts/fetch-content.mjs), scrapes the live
school website with `cheerio` and writes:

| Output | Contents |
|---|---|
| `content/school.json` | all copy — hero/welcome intro, Key Factors, admission process + anti-donation notice, parent testimonials, proximity list, contact details, upcoming campuses |
| `public/images/**` | logo, the hero campus photo (`banner-1.jpg` — the homepage `2nd-banner.jpg`, an aerial shot of the building with the SKS signage), the other homepage banners, the campus photo, and the Programmes / Beyond-Curriculum activity photos — all re-hosted from the source site so `next/image` can optimize them (never hot-linked). The homepage "Key Factors" icons are third-party brand logos (LEGO, British Council, CBSE…) so they are **not** re-hosted — the "Why SKS" grid uses an inlined Lucide icon set instead. |

Sources scraped:

- `/` — hero / "Welcome to SKS World School" intro, Key Factors, testimonials, footer
- `/about-sksws-noida/` — location copy + proximity/connectivity list
- `/admission-guidelines/` — admission steps, selection & rejection policy, anti-donation caution
- `/contact-us/` — phones, email, address, map
- `/curriculum/` — "Our Programmes" domains + descriptions (Academics, Co-curricular, Physical Education)
- `/infrastructure/` — real photos for "Our Programmes", "Beyond Curriculum", and the text-left/image-right split in the "About" (campus grounds) and "Why SKS" (classroom) sections
- `/about-sksws-noida/` — "Prime Location" copy + proximity/connectivity list (shown in the About section)
- `/our-vision-philosophy/` + `/core-value/` — "Our Philosophy" statement + the three core values (Harmony and Respect, Honesty and Truthfulness, Thirst for Excellence)

The script runs automatically on `predev` and `prebuild`. If the site is
unreachable at build time it keeps the committed `content/school.json`, so the
build never breaks. Re-run manually:

```bash
npm run fetch:content          # refresh JSON, keep existing images
node scripts/fetch-content.mjs --force   # also re-download images
```

### Editable placeholders

Content the live site does **not** publish is written as a clearly marked
placeholder in `content/school.json` — never invented:

- `stats.items[*]` — the "at a glance" counters render as `—` with an
  "editable placeholder" badge. Set `displayValue` to `null` and put a real
  number in `value` to publish a figure.

## Enquiry form

`app/api/enquiry/route.ts` validates the lead (name + phone required, honeypot,
per-instance rate limit) and emails it via [Resend](https://resend.com).

Set these environment variables (see `.env.example`):

```
RESEND_API_KEY=re_...
ENQUIRY_TO=contact@sksworldschoolnoida.ac.in
ENQUIRY_FROM=SKS World School <admissions@your-verified-domain>
# ENQUIRY_CC=frontdesk@...        # optional
```

Without `RESEND_API_KEY` the route still returns `200` and logs the enquiry to
the server console — convenient for local development and preview deploys. The
form also offers a prefilled **WhatsApp** fallback link to the school number.

The same form appears in a **session pop-up** (`EnquiryPopup.tsx`) that opens
once — after 15s on the page or when the visitor scrolls past 50%, whichever is
first. It never reappears once shown/dismissed, or if any enquiry form on the
page was already submitted (tracked in `sessionStorage`: `sks_popup_seen`,
`sks_enquiry_submitted`).

## Local development

```bash
npm install
cp .env.example .env.local     # optional — add RESEND_API_KEY to send real mail
npm run dev                    # http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel (framework preset: Next.js —
   detected automatically).
2. Add the environment variables above in **Project → Settings → Environment
   Variables**.
3. Deploy. `prebuild` refreshes the content from the live site on every build.

## Project structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD
  page.tsx              section assembly
  globals.css           Tailwind layers + brand component classes
  api/enquiry/route.ts  lead handler (Resend)
  components/           Header, Hero (full-bleed campus photo + floating form),
                        AboutStrip (intro + Board/Campus/Admissions-desk),
                        EnquiryForm, EnquiryPopup (session modal), WhySks,
                        Programmes (curriculum domains), BeyondCurriculum
                        (4-up co-curricular grid), Stats, AdmissionProcess,
                        Testimonials, Location, GrowingGroup, FinalCta,
                        Footer, MobileBar
lib/content.ts          typed accessor for content/school.json
content/school.json     generated content (committed as a fallback)
scripts/fetch-content.mjs   build-time scraper + image pipeline
```

## Design

Palette and type are derived from the school's own logo — brick red `#9B2F33`,
flame orange `#F58634`, lagoon teal `#1983A4` on a warm paper neutral — rather
than a generic template identity. Display type is Fraunces; body is Inter.
