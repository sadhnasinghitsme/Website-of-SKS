"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";

export function Stats() {
  const { stats } = content;
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-brick text-white">
      <div ref={ref} className="container-page py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl text-white sm:text-3xl">SKS World School at a glance</h2>
          {stats.editable && (
            <span className="rounded bg-flame/20 px-2 py-1 text-[11px] font-medium text-flame">
              Editable placeholders — confirm with the school
            </span>
          )}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.items.map((s) => (
            <div key={s.label} className="border-l-2 border-flame pl-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold text-flame sm:text-4xl">
                {s.displayValue ?? <Counter to={s.value} run={shown} />}
                {s.displayValue ? "" : s.suffix}
              </dd>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Counter({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n.toLocaleString("en-IN")}</>;
}
