import { content } from "@/lib/content";

export function AdmissionProcess() {
  const { admissions } = content;

  return (
    <section id="admissions" className="container-page py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Admissions</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">{admissions.heading}</h2>
        <span className="rule-gold mt-4" />
        <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{admissions.intro}</p>
      </div>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2">
        {admissions.steps.map((step, i) => (
          <li key={step.title} className="relative rounded-2xl border border-ink/10 bg-white p-5 pl-6 shadow-sm transition-shadow hover:shadow-card">
            <span
              className={`absolute left-0 top-5 h-[calc(100%-2.5rem)] w-1.5 rounded-r ${
                ["bg-sky", "bg-berry", "bg-lagoon", "bg-grape"][i % 4]
              }`}
            />
            <div className="flex items-baseline gap-3">
              <span
                className={`font-display text-2xl font-black ${
                  ["text-sky", "text-berry", "text-lagoon", "text-grape"][i % 4]
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-ink">{step.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
