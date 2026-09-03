import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `Our Teachers — ${content.school.name}, Noida`,
  description:
    "Qualified and competent faculty at SKS World School, Noida, who re-engineer the curriculum and bring emerging technology into the classroom.",
  alternates: { canonical: "/our-teachers" },
};

const PARAGRAPHS = [
  "The core motive behind the efforts made by the schools run under the SKS Group of Institutions has always been to provide a holistic and meaningful education in addition to the pursuit of academic excellence.",
  "To hone the skills of children at their best, we have qualified and competent faculty in our team who continue to re-engineer our curriculum, develop new and different methods of delivering course content and bring emerging technology in our classrooms.",
  "Our experienced teachers take care of every student in the academic subjects and in their social training. Every faculty member plays a vital role in holistic development of the child.",
  "Our mentors take help of various methods — individual, groups and whole-class teaching — that is accurate to the work being covered and the requirements of every child individually.",
  "The teachers at SKS World School are experts in their field of education and encourage learning among students. They not only ensure that students do well in studies but also enable them to explore, understand and develop a passion for learning beyond academics through unique teaching methods.",
];

const HIGHLIGHTS = [
  {
    title: "1:25 teacher–student ratio",
    body: "The school is particular that each student is provided individual care and attention at all times.",
  },
  {
    title: "Rigorous selection",
    body: "Appropriate educational qualifications, relevant experience, a demonstration lesson and a rigorous interview process are the selection criteria.",
  },
  {
    title: "Continuous training",
    body: "Highly qualified and trained teachers create an environment where learning is purposeful, progressive and empowering.",
  },
];

export default function OurTeachersPage() {
  return (
    <PageShell
      eyebrow="Academics"
      title="Our Teachers"
      intro="Every faculty member plays a vital role in the holistic development of the child."
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div className="space-y-5 text-[15px] leading-relaxed text-ink/75 sm:text-base">
          {PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="space-y-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm"
            >
              <p className="font-display text-base font-semibold text-brick-700">
                {h.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
