import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Career — ${content.school.name}, Noida`,
  description:
    "Faculty recruitment at SKS World School, Noida (Sector 137). Send your CV and the Faculty Recruitment form to be considered for future vacancies.",
  alternates: { canonical: "/career" },
};

const { contact } = content;

const APPLY_STEPS = [
  "Complete the Form for Faculty Recruitment with your personal, educational and work-experience details.",
  "Attach your CV and two passport-size photographs.",
  "Send it by email to contact@sksworldschoolnoida.ac.in, or by post to SKS World School, SS, Sector 137, Noida.",
];

export default function CareerPage() {
  return (
    <PageShell
      eyebrow="Career"
      title="Work With Us"
      intro="The core motive behind the efforts made by the schools run under the SKS Group of Institutions has always been to provide a holistic and meaningful education in addition to the pursuit of academic excellence."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <p className="text-[15px] leading-relaxed text-ink/75 sm:text-base">
            SKS World School is one of the top-ranking schools in Noida. We may
            not have a specific vacancy at the moment, but we welcome applications
            from qualified and passionate educators and will get back to you when
            a vacancy arises.
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-brick-700 sm:text-2xl">
            How to apply
          </h2>
          <span className="rule-gold mt-4" />
          <ol className="mt-6 space-y-4">
            {APPLY_STEPS.map((step, i) => (
              <li key={step.slice(0, 20)} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brick-700 font-display text-sm font-bold text-flame">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-ink/75">{step}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-xs text-ink/45">
            The Form for Faculty Recruitment collects personal details, contact
            information, educational qualifications (high school to
            post-graduation), work experience, subject specialisation, current
            and expected salary, and joining timeline.
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-ink/10 bg-sand p-6 shadow-card">
          <h3 className="font-display text-base font-bold text-brick-700">
            Send your application to
          </h3>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all font-medium text-brick-700 underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Post</dt>
              <dd className="mt-1 not-italic text-ink/75">
                SKS World School, SS, Sector 137, Noida, Uttar Pradesh 201305
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Phone</dt>
              <dd className="mt-1 space-x-2">
                {contact.phones.map((p, i) => (
                  <span key={p}>
                    {i > 0 && <span className="text-ink/30">·</span>}{" "}
                    <a
                      href={`tel:+91${p}`}
                      className="font-medium text-brick-700"
                    >
                      {p}
                    </a>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </PageShell>
  );
}
