import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `FAQs — ${content.school.name}, Noida`,
  description:
    "Frequently asked questions about admissions, transport, timings, safety and academics at SKS World School, Noida.",
  alternates: { canonical: "/faqs" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does SKS World School belong to a chain of schools?",
    a: "Yes. SKS World School belongs to the chain of schools managed and run by the SKS Educational & Social Trust. New campuses are planned near Pari Chowk (Greater Noida), Ghaziabad and Vrindavan.",
  },
  {
    q: "What is the admission process?",
    a: "The parents register the child (online or in the school office) for the age-appropriate class and submit documents accordingly. On completion of the registration process, parents are invited for an interaction with the Principal. Admission is confirmed on payment of the fees.",
  },
  {
    q: "Does the school provide transport?",
    a: "Yes. All the school buses are new. The bus routes are customised according to the pickups so as to reduce the travel time for the children. All the buses of different routes are mobile connected.",
  },
  {
    q: "Are meals provided?",
    a: "No. Meals are available at the canteen on a pay-and-buy basis.",
  },
  {
    q: "What board of education does SKS World School follow?",
    a: "The school follows the CBSE curriculum and is affiliated to CBSE, New Delhi (Affiliation No. 2134003).",
  },
  {
    q: "Is the school co-educational?",
    a: "Yes. The school admits boys and girls from Pre-Nursery onwards.",
  },
  {
    q: "Does the school conduct any outbound trips?",
    a: "Yes, the school provides an outbound trip for the students annually. These trips are optional and expenses have to be borne by parents.",
  },
  {
    q: "What is SKS World School's approach to education?",
    a: "A holistic approach where students are taught the way they want to learn. Students learn by doing. Every lesson in every class, every day is a lesson for a lifetime.",
  },
  {
    q: "Whom do I contact for admissions?",
    a: "Parents can contact the school administration in three main ways: (1) send an enquiry by mail to contact@sksworldschoolnoida.ac.in, (2) fill the online registration form on the website and send the details, or (3) call directly on 9319910888 or 9540530100.",
  },
  {
    q: "Is day-boarding facility available?",
    a: "No.",
  },
  {
    q: "What about the academic performance of the school's students?",
    a: "The school students have consistently achieved 100% results in the Board exams conducted by CBSE.",
  },
  {
    q: "What is the teacher–student ratio?",
    a: "The ratio is 1:25. The school is very particular that each student is provided individual care and attention at all times.",
  },
  {
    q: "How is the teaching faculty selected?",
    a: "Appropriate educational qualifications, relevant experience, a demonstration lesson and a rigorous interview process are the selection criteria.",
  },
  {
    q: "What co-curricular activities are offered?",
    a: "The co-curricular activities include music, dance, sports, educational visits, excursions, picnics, etc.",
  },
  {
    q: "What are the school timings?",
    a: "Classes I–IX run 7:45 AM – 1:45 PM during summer (April–November) and 8:10 AM – 2:10 PM during winter (December–March).",
  },
  {
    q: "How many students are there in one class?",
    a: "25 children per class for Kindergarten. From Classes I and II there are 35, and from Classes III to XII there are 40 students in each class.",
  },
  {
    q: "Is there an entrance exam for admission?",
    a: "No written tests are required at the pre-primary level; admission is confirmed after an interaction with the Principal. For senior classes (Class I onwards), admission is sought after the child attempts entrance tests in English, Mathematics, Science and Hindi.",
  },
  {
    q: "What child-safety measures are adopted by the school?",
    a: "The school has implemented measures such as CCTV, a soft padded play area, a separate bus-boarding lane, SMS alerts to parents, an infirmary, and first aid even in the school bus.",
  },
  {
    q: "Does the school have adequate medical facilities?",
    a: "The school maintains an infirmary with trained personnel providing first aid, has tie-ups with nearby hospitals for emergencies and ambulance services, and conducts periodic health screenings including eye, dental and general check-ups.",
  },
  {
    q: "Is the chain of SKS World School air-conditioned?",
    a: "The chain of SKS World School is not fully air-conditioned, as classrooms are well ventilated and airy, while other amenities such as the Library and Auditorium are air-conditioned.",
  },
];

export default function FaqsPage() {
  return (
    <PageShell
      eyebrow="Admissions"
      title="Frequently Asked Questions"
      intro="Answers to the questions parents ask most often about SKS World School, Noida."
    >
      <div className="mx-auto max-w-3xl divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white shadow-card">
        {FAQS.map((item) => (
          <details key={item.q} className="group px-5 py-4 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-brick-700 [&::-webkit-details-marker]:hidden">
              {item.q}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-flame-700 transition-transform duration-200 group-open:rotate-45"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-sm text-ink/60">
        Still have a question?{" "}
        <a href="/#enquiry" className="font-semibold text-brick-700 underline">
          Send an admission enquiry
        </a>{" "}
        or call {content.contact.phones[0]}.
      </p>
    </PageShell>
  );
}
