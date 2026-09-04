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
    <section className="bg-brick-700 text-white doodle-dark">
      <div ref={ref} className="container-page py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-white sm:text-3xl">
              SKS World School at a glance
            </h2>
            <span className="rule-gold mt-4" />
          </div>
          {stats.editable && (
            <span className="rounded bg-flame/20 px-2 py-1 text-[11px] font-medium text-flame">
              Editable placeholders — confirm with the school
            </span>
          )}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.items.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl border border-white/10 border-t-4 bg-white/[0.04] p-5 sm:p-6 ${
                ["border-t-flame", "border-t-sky", "border-t-coral", "border-t-lime"][i % 4]
              }`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd
                className={`font-display text-4xl font-black sm:text-5xl ${
                  ["text-flame", "text-sky", "text-coral", "text-lime"][i % 4]
                }`}
              >
                {s.displayValue ?? <Counter to={s.value} run={shown} />}
                {s.displayValue ? "" : s.suffix}
              </dd>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
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
