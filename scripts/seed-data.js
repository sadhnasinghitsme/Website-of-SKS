"use strict";

/**
 * Seed content migrated from the Next.js frontend pages
 * (app/news/page.tsx, app/achievements/page.tsx), which in turn were taken from
 * sksworldschoolnoida.ac.in/our-events and /achievements.
 *
 * `date` values are ISO strings; ambiguous "Month YYYY" labels were pinned to
 * the 1st, and date ranges to the first day.
 */

const news = [
  { date: "2026-03-17", category: "Trip", title: "Trip to McDonald's", description: "A fun-filled outing for Pre-Nursery to Class 1. Children relished their favourite meals and learned about table manners and sharing with friends." },
  { date: "2026-03-06", category: "Workshop", title: "Bloom's Taxonomy Workshop", description: "A teacher development session by Varun Sharma, author of Communicating Over Troubled Waters, on using Bloom's Taxonomy to make teaching more effective and engaging." },
  { date: "2026-02-21", category: "Workshop", title: "Workshop on POCSO", description: "A child-safety awareness session by Ms. Namrata covering key provisions of the Act and the role of teachers in ensuring child safety." },
  { date: "2026-02-16", category: "Event", title: "Annual Sports Meet", description: "A day-long athletic celebration of drills, races, chess and badminton — full of energy, sportsmanship and proud moments." },
  { date: "2026-02-07", category: "Event", title: "FUNFINITY Fair", description: "A campus-wide creative showcase, from the exhibition to the high-energy Fun Zone, with student work displays and interactive activities." },
  { date: "2026-01-30", category: "Trip", title: "Victory Adventure Camp", description: "A two-phase outdoor experience for Mont to Class 8 with zip line, trampoline, commando crawl, burma bridge and tug of war, with meals provided." },
  { date: "2026-01-01", category: "Assembly", title: "Veer Baal Diwas", description: "A commemorative assembly honouring the courage and sacrifice of the Sahibzades." },
  { date: "2025-11-01", category: "Workshop", title: "Strengthening Assessment and Evaluation Workshop", description: "A session to enhance teachers' proficiency in formative and summative assessment — Bloom's Taxonomy-based question design, SMART learning outcomes, the LAAR cycle, Competency Based Education and portfolio integration." },
  { date: "2025-11-01", category: "Workshop", title: "CBSE Joyful Mathematics Workshop — Middle Stage", description: "Strengthening the teaching and learning of Mathematics through activity-based, conceptual and student-centred methods, with a Back to Basics approach and a focus on common student errors." },
  { date: "2025-11-04", category: "Programme", title: "Handwashing Awareness Programme", description: "In partnership with the Physical Education Foundation of India, the Illness to Wellness Foundation and Savlon, Mr. Yogesh Sharma guided students through the seven steps of effective handwashing." },
  { date: "2025-11-01", category: "Competition", title: "Inter-School Competition — SYNERGIA-3: Harmonizing Talent", description: "A multi-school event of debate, storytelling, dance, music, art and sports. Mayoor School, Noida emerged as the overall trophy winner." },
  { date: "2025-10-01", category: "Programme", title: "Capacity Building Programme: Mental Health and Wellness", description: "A programme for teachers on emotional and behavioural issues in children, teacher well-being, the school counsellor's role, adolescence and the benefits of meditation." },
  { date: "2025-10-01", category: "Workshop", title: "Cyber Security and a Safe Digital Future", description: "Ms. Laxmi (Police Commissionerate), DIG Rajiv Narayan Mishra and Sub-Inspector Sachin Yadav spoke on strong passwords, careful sharing of personal information, and staying alert against online frauds and cyberbullying." },
  { date: "2025-10-01", category: "Assembly", title: "Fire Safety Awareness — No Crackers Diwali", description: "Mr. Yogendra Chaurasia encouraged a celebration without smoke or noise and demonstrated fire-safety measures such as handling diyas carefully and keeping water nearby." },
  { date: "2025-10-01", category: "Celebration", title: "Grandparents' Day Celebration", description: "Pre-Nursery to Prep welcomed grandparents with songs, dances, games, special performances and handmade cards as tokens of love." },
  { date: "2025-09-27", category: "Trip", title: "Mahavatar Narsimha — Movie Outing", description: "An animated film screening exploring devotion, courage and divine intervention through the story of Bhakt Prahlad and Lord Narsimha, reinforcing faith, resilience and righteousness." },
  { date: "2025-09-20", category: "Workshop", title: "CBSE Social Science Workshop", description: "Held at Cambridge School, Sector 27, Noida and facilitated by Ms. Shivani Chaudhary and Ms. Ritu Goel on Competency Based Assessment and creating quality questions." },
  { date: "2025-09-01", category: "Trip", title: "KidZania Educational Trip", description: "Mont and Grade 1 students became doctors, chefs, pilots and firefighters for the day, earning KidZania money by completing tasks and learning to be creative and work as a team." },
  { date: "2025-05-01", category: "Celebration", title: "Mother's Day Celebration", description: "Games, competitions and talent shows in honour of mothers." },
  { date: "2025-05-07", category: "Event", title: "Mock Drill", description: "An emergency-preparedness exercise for students and staff." },
  { date: "2025-05-03", category: "Event", title: "School Elections", description: "Students took part in the democratic process to elect the school council." },
  { date: "2024-10-08", category: "Assembly", title: "Class III A Special Assembly — Dussehra", description: "A dance performance and soulful songs paying tribute to Lord Rama and the triumph of good over evil." },
  { date: "2024-10-28", category: "Celebration", title: "Halloween Celebration", description: "Montessori and Class 1 festivities with costumes and craft." },
  { date: "2024-10-26", category: "Competition", title: "Synergia 2024", description: "A multi-institutional creative showcase hosted on campus." },
  { date: "2024-10-01", category: "Trip", title: "Kohinoor Biscuit Factory Visits", description: "Classes 2–4 witnessed biscuit-making, learned about quality control and sampled fresh biscuits." },
  { date: "2024-11-09", category: "Trip", title: "Kiran Nadar Museum Educational Tour", description: "Grades VI–VIII visited the museum for exposure to contemporary and modern art." },
  { date: "2024-01-01", category: "Event", title: "Veer Gatha 4.0 — Gallantry Honours", description: "Students paid tribute to India's Gallantry Award winners through heartfelt creations celebrating their valour and sacrifice." },
  { date: "2024-08-23", category: "Celebration", title: "National Space Day", description: "A celebration of the Chandrayaan-3 success with colouring contests, slogan writing and painting activities." },
  { date: "2024-08-23", category: "Celebration", title: "Janmashtami Celebration", description: "Class 1 presented a dance and skit on Krishna's life while other classes crafted props and handmade cards." },
  { date: "2024-08-01", category: "Celebration", title: "Raksha Bandhan", description: "Nursery to Class 8 made rakhis and cards celebrating the bond between brothers and sisters." },
  { date: "2024-08-15", category: "Celebration", title: "78th Independence Day", description: "Flag-hoisting, a student assembly, a Class 3 C dance and tricolour crafts, with a choir rendition of Ekla Chalo Re." },
  { date: "2024-06-27", category: "Programme", title: "Staff Health Check-up", description: "In partnership with Felix Hospital — blood pressure, blood sugar, BMI and lipid profile screening, plus visual acuity tests and retinoscopy." },
  { date: "2024-06-25", category: "Workshop", title: "CBSE Workshop: Bal Vatika and Jadui Pitara", description: "Held at Delhi World Public School, Noida Extension for around 200 teachers and 75 principals, facilitated by Ms. Yashika on effective teaching methodologies." },
  { date: "2024-06-01", category: "Celebration", title: "International Yoga Day", description: "Students and staff took part in a guided yoga session on campus." },
  { date: "2024-01-01", category: "Celebration", title: "75th Republic Day Celebration", description: "Flag-hoisting by Principal Mrs. Rachna Agarwal, a special student assembly and craft activities in a vibrant spirit of patriotism." },
  { date: "2023-12-01", category: "Workshop", title: "Guru Dakshita Induction Training", description: "A CBSE programme for principals and teachers covering the structure, policies and guidelines of all CBSE departments, aligned with NEP 2020." },
  { date: "2023-11-04", category: "Competition", title: "Inter-School Competition", description: "Classes Nursery to VIII from multiple schools took part — a reminder that inter-school competitions are about personal growth and learning, not only winning." },
];

const achievements = [
  {
    title: "AISSE Result — Session 2024-25",
    year: "2024-25",
    description:
      "The school's students appeared for the CBSE All India Secondary School Examination (Class X) for the 2024-25 session, continuing SKS World School's record of consistent board results.",
  },
  {
    title: "British Council International School Award",
    year: "2018-21",
    date: "2018-12-05",
    description:
      "Awarded for Outstanding Development of the International Dimension in the Curriculum, recognising the school's work in nurturing global citizenship in students. The International School Award (ISA) was conferred for the 2018-21 cycle, with the ceremony held on 5 December 2018 in Delhi.",
  },
  {
    title: "India's Most Trusted Education Brand of the Year Award 2025",
    year: "2025",
    description:
      "SKS World School was recognised among India's Most Trusted Education Brands of the Year for 2025.",
  },
  {
    title: "School of India Award",
    description:
      "The school has been featured in the School of India awards, which recognise institutions for excellence in school education.",
  },
];

module.exports = { news, achievements };
