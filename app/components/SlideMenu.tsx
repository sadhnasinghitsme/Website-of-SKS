"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { content } from "@/lib/content";

type Child = { label: string; href?: string; external?: boolean; tag?: string };
type Item = { label: string; href?: string; children?: Child[] };

const HEADER_OFFSET = 100;

/* House colours (blue · green · gold · red), rotated across the top-level nav
   items as a hover highlight — left accent bar + matching tint. */
const HOUSE_ACCENT = [
  "hover:border-sky hover:bg-sky-50",
  "hover:border-lime hover:bg-lime-50",
  "hover:border-flame hover:bg-flame-50",
  "hover:border-berry hover:bg-berry-50",
];

const NAV: Item[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "Overview", href: "/#about" },
      { label: "Our Vision & Philosophy", href: "/vision-philosophy" },
      { label: "Chairman's Message", href: "/chairman-message" },
      { label: "Principal's Message", href: "/principal-message" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Curriculum", href: "/#curriculum" },
      { label: "Beyond Curriculum", href: "/#beyond-curriculum" },
      { label: "Our Teachers", href: "/our-teachers" },
      { label: "School Timings", href: "/school-timings" },
    ],
  },
  {
    label: "Campus",
    children: [
      { label: "Gallery", href: "/gallery" },

    ],
  },
  { label: "News & Events", href: "/news" },
  { label: "Achievements", href: "/achievements" },
  {
    label: "Admissions",
    children: [
     
      { label: "Fee Structure", href: "/fee-structure" },
      { label: "FAQs", href: "/faqs" },

    ],
  },
 
  { label: "Contact", href: "/contact" },
  { label: "Career", href: "/career" },
];

export function SlideMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  /* close whenever the route changes */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* while open: lock scroll, Escape to close, manage focus */
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  const openMenu = () => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  };

  const scrollToHash = (hash: string) => {
    const el = document.getElementById(hash.replace(/^#/, ""));
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const onLinkClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const hashIndex = href.indexOf("#");
      const isAnchor = href.startsWith("/#") || href.startsWith("#");

      if (isAnchor) {
        const hash = href.slice(hashIndex);
        if (pathname === "/") {
          e.preventDefault();
          setOpen(false);
          scrollToHash(hash);
          window.history.replaceState(null, "", hash);
        } else {
          e.preventDefault();
          setOpen(false);
          router.push(`/${hash}`);
          window.setTimeout(() => scrollToHash(hash), 400);
        }
        return;
      }

      // plain route link — let Next handle it, just close the panel
      setOpen(false);
    };

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brick-700 transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <>
            {/* dimmed backdrop */}
            <div
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className={`fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            {/* slide-in panel */}
            <div
              role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-y-0 right-0 z-[95] flex w-full flex-col bg-white shadow-lift transition-transform duration-300 ease-out md:w-1/2 lg:max-w-xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          aria-hidden="true"
          className="h-1 w-full shrink-0 bg-[linear-gradient(90deg,#1668E3_0%,#4D9E0E_34%,#FFB100_67%,#E11D48_100%)]"
        />
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-8">
          <span className="font-display text-lg font-bold text-brick-700">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brick-700 text-white transition hover:bg-brick focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 sm:px-5">
          <ul className="space-y-1">
            {NAV.map((item, i) => {
              const hasChildren = !!item.children?.length;
              const accent = HOUSE_ACCENT[i % HOUSE_ACCENT.length];

              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      onClick={onLinkClick(item.href!)}
                      className={`block rounded-xl border-l-4 border-transparent px-4 py-3.5 font-display text-lg font-bold text-brick-700 transition-colors ${accent}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = expanded === item.label;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border-l-4 border-transparent px-4 py-3.5 text-left font-display text-lg font-bold text-brick-700 transition-colors ${accent}`}
                  >
                    {item.label}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className={`shrink-0 text-flame-700 transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      <path
                        d="m9 6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <ul className="min-h-0 overflow-hidden pb-2 pl-4">
                      {item.children!.map((c) => {
                        if (!c.href) {
                          return (
                            <li key={c.label}>
                              <span className="flex items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-[15px] font-medium text-ink/45">
                                {c.label}
                                {c.tag && (
                                  <span className="cat-tag shrink-0">{c.tag}</span>
                                )}
                              </span>
                            </li>
                          );
                        }
                        if (c.external) {
                          return (
                            <li key={c.label}>
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-2.5 text-[15px] font-medium text-brick-700/80 transition hover:bg-brick-50 hover:text-brick-700"
                              >
                                {c.label}
                              </a>
                            </li>
                          );
                        }
                        return (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={onLinkClick(c.href)}
                              className="block rounded-lg px-4 py-2.5 text-[15px] font-medium text-brick-700/80 transition hover:bg-brick-50 hover:text-brick-700"
                            >
                              {c.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
          </>,
          document.body,
        )}
    </>
  );
}
