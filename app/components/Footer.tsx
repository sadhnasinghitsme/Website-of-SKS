import Image from "next/image";
import { content, telHref } from "@/lib/content";

export function Footer() {
  const { school, contact, social, images, growingGroup } = content;
  const year = new Date().getFullYear();

  const linkGroups: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "About",
      links: [
        { label: "About SKS World School", href: "/#about" },
        { label: "Why SKS World School", href: "/#why" },
        { label: "Our philosophy", href: "/#about" },
      ],
    },
    {
      title: "Admissions",
      links: [
        { label: "Admission process", href: "/#admissions" },
        { label: "Admission enquiry", href: "/#enquiry" },
        { label: "Location & connectivity", href: "/#location" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Our programmes", href: "/#programmes" },
        { label: "Beyond curriculum", href: "/#beyond" },
        { label: "At a glance", href: "/#why" },
      ],
    },
  ];

  const socials: { label: string; href: string; icon: React.ReactNode }[] = [
    { label: "Facebook", href: social.facebook, icon: <FacebookIcon /> },
    { label: "Instagram", href: social.instagram, icon: <InstagramIcon /> },
    { label: "YouTube", href: social.youtube, icon: <YouTubeIcon /> },
    { label: "LinkedIn", href: social.linkedin, icon: <LinkedInIcon /> },
  ];

  return (
    <footer className="bg-brick-800 text-white/70">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        {/* brand + contact */}
        <div className="sm:col-span-2">
          <span className="inline-flex rounded-lg bg-white px-3 py-2">
            <Image
              src={images.logo}
              alt={`${school.name} logo`}
              width={308}
              height={90}
              className="h-10 w-auto"
            />
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {school.type} run under the aegis of the {school.trust}, led by its
            Chairman {school.chairman}. Affiliated to {school.board}, New Delhi —
            Affiliation No. {school.affiliationNo}.
          </p>

          <address className="mt-5 space-y-1 text-sm not-italic text-white/60">
            {contact.addressLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <div className="mt-3 space-y-1 text-sm">
            {contact.phones.map((p) => (
              <a
                key={p}
                href={telHref(p)}
                className="block font-medium text-white hover:text-flame"
              >
                {p}
              </a>
            ))}
            <a
              href={`mailto:${contact.email}`}
              className="block break-all font-medium text-white hover:text-flame"
            >
              {contact.email}
            </a>
          </div>
          <p className="mt-3 text-xs text-white/45">{contact.officeHours}</p>
        </div>

        {linkGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-flame">
              {group.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* group schools + social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-flame">
            Group Schools
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            {growingGroup.campuses.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-flame">
            Follow
          </h3>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-flame hover:bg-flame hover:text-brick"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {school.name}, Noida. All rights reserved.</p>
          <p>
            Content sourced from{" "}
            <a
              href="https://sksworldschoolnoida.ac.in/"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              sksworldschoolnoida.ac.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.6l.4-3h-3V8.1c0-.9.3-1.5 1.6-1.5H17V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12ZM10 15V9l5 3-5 3Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.5v10H3.5v-10h3ZM5 3.5A1.75 1.75 0 1 1 5 7a1.75 1.75 0 0 1 0-3.5ZM20.5 18.5h-3v-5.3c0-1.3-.5-2.1-1.6-2.1-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8v5.4h-3s.04-9.1 0-10h3v1.4c.4-.6 1.1-1.5 2.8-1.5 2 0 3.6 1.3 3.6 4.2v5.9Z" />
    </svg>
  );
}
