import { content } from "@/lib/content";

export function AdmissionProcess() {
  const { admissions } = content;

  return (
    <section id="admissions" className="container-page py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Admissions</p>
        <h2 className="mt-2 text-3xl text-brick sm:text-4xl">{admissions.heading}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{admissions.intro}</p>
      </div>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2">
        {admissions.steps.map((step, i) => (
          <li key={step.title} className="relative rounded-xl border border-ink/10 bg-white p-5 pl-6 shadow-sm">
            <span className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-1 rounded-r bg-flame" />
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-semibold text-lagoon">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg text-ink">{step.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
