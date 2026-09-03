"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { content, telHref } from "@/lib/content";
import { SlideMenu } from "./SlideMenu";

export function Header() {
  const { images, school, contact } = content;
  const phone = contact.phones[0];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-200 supports-[backdrop-filter]:bg-white/80 ${
        scrolled ? "border-ink/10 shadow-header" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label={`${school.name} home`}>
          <Image
            src={images.logo}
            alt={`${school.name} logo`}
            width={308}
            height={90}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={telHref(phone)}
            className="hidden items-center gap-2 text-sm font-semibold text-brick hover:text-flame-700 sm:inline-flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brick-50 text-brick">
              <PhoneIcon />
            </span>
            {phone}
          </a>
          <a href="/#enquiry" className="btn-primary px-4 py-2.5 text-[13px] sm:px-6 sm:text-sm">
            Admission Enquiry
          </a>
          <SlideMenu />
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5c.5 0 .9.3 1 .8l.9 3c.1.4 0 .8-.3 1L6.8 12a13 13 0 0 0 5.2 5.2l1.7-1.3c.3-.2.7-.3 1-.2l3 .9c.5.1.8.5.8 1V21c0 .6-.5 1-1 1A17 17 0 0 1 3 6c0-.6.4-1 1-1h2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
