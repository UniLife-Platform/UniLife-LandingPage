export interface ScholarshipItem {
  id: string;
  title: string;
  provider: string;
  category: "undergraduate" | "masters" | "fellowship" | "competition" | "internship" | "training" | "event_sponsor";
  awardValue: string;
  coverage: string;
  targetAudience: string;
  deadline: string;
  daysRemaining: number;
  featured?: boolean;
  status: "open" | "closing_soon" | "verified_ongoing";
  summary: string;
  eligibility: string[];
  perks: string[];
  applicationUrl: string;
  requirements: string[];
  tags: string[];
  verifiedSource: {
    name: string;
    domain: string;
    verifiedAt: string;
    sourceType: "corporate" | "foundation" | "government" | "tech_brand" | "ngo";
    officialUrl: string;
  };
}

export const ACTIVE_2026_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: "sp-mtn-science-tech-2026",
    title: "MTN Foundation Science & Technology Scholarship Scheme (STSS)",
    provider: "MTN Nigeria Foundation",
    verifiedSource: {
      name: "MTN Foundation Direct Portal",
      domain: "mtn.ng/scholarships",
      verifiedAt: "2026-09-15",
      sourceType: "foundation",
      officialUrl: "https://www.mtn.ng/scholarships/",
    },
    category: "undergraduate",
    awardValue: "₦300,000 / year",
    coverage: "Annual tuition stipend till graduation + Laptop & Mentorship",
    targetAudience: "200L/300L STEM Undergraduates in Nigerian Public Tertiary Institutions",
    deadline: "2026-11-30",
    daysRemaining: 76,
    featured: true,
    status: "open",
    summary:
      "Recognizes and funds high-achieving Nigerian undergraduate students in Science and Technology courses with direct tuition support until graduation.",
    eligibility: [
      "Full-time 200L/300L students in STEM disciplines",
      "Cumulative Grade Point Average (CGPA) of 3.5 or equivalent (2:1 or First Class)",
      "Studying in accredited Nigerian Federal or State Universities, Polytechnics, or Colleges of Education",
    ],
    perks: [
      "₦300,000 annual direct bank stipend",
      "Employability training workshops with MTN Executives",
      "Priority consideration for MTN National Youth Service Corps (NYSC) placement",
    ],
    applicationUrl: "https://www.mtn.ng/scholarships/",
    requirements: ["Valid Student ID", "Current Official Transcript", "Passport Photograph", "Admission Letter"],
    tags: ["Undergraduate", "STEM", "Nigeria", "₦300k/yr"],
  },
  {
    id: "sp-selar-tuition-fund-2026",
    title: "Selar Undergraduate Tuition Fund for Nigerian Students",
    provider: "Selar (Africa Creator Economy)",
    verifiedSource: {
      name: "Selar Official Scholarships",
      domain: "selar.co",
      verifiedAt: "2026-09-15",
      sourceType: "tech_brand",
      officialUrl: "https://selar.co/tuitionfund",
    },
    category: "undergraduate",
    awardValue: "₦10,000,000 Total Fund (₦500,000 per Student)",
    coverage: "Direct financial grant for tuition and academic development",
    targetAudience: "Undergraduates in Any Nigerian Accredited Tertiary Institution",
    deadline: "2026-11-15",
    daysRemaining: 61,
    featured: true,
    status: "open",
    summary:
      "An equity-focused tuition grant provided by Selar to alleviate academic financial strain for Nigerian students who demonstrate passion, creativity, and drive.",
    eligibility: [
      "Must be currently enrolled in an accredited tertiary institution in Nigeria",
      "Open to all levels of study (100L – 500L) across all departments",
      "Statement of purpose outlining financial need and academic ambitions",
    ],
    perks: [
      "₦500,000 cash grant paid directly to recipient",
      "Free access to Selar Digital Creator Masterclasses",
      "Internship & shadowing opportunities at Selar",
    ],
    applicationUrl: "https://www.scholarshipregion.com/selar-tuition-fund/",
    requirements: ["School ID / Admission Verification", "Statement of Purpose Essay", "Bank Details"],
    tags: ["Undergraduate", "All Faculties", "Tuition Grant", "₦500k/Student"],
  },
  {
    id: "sp-indomie-scholarship-2026",
    title: "Indomie Community & Under-Graduate Scholarship Scheme",
    provider: "Dufil Prima Foods Plc (Indomie)",
    verifiedSource: {
      name: "Scholarship Region Dufil Hub",
      domain: "scholarshipregion.com",
      verifiedAt: "2026-09-15",
      sourceType: "corporate",
      officialUrl: "https://www.scholarshipregion.com/dufil-prima-foods-scholarship/",
    },
    category: "undergraduate",
    awardValue: "₦200,000 / year",
    coverage: "Annual academic grant and living allowance",
    targetAudience: "Nigerian Undergraduates (Nutrition, Food Science, Engineering, Management)",
    deadline: "2026-12-10",
    daysRemaining: 86,
    status: "open",
    summary:
      "Dufil Prima Foods' flagship educational award assisting brilliant undergraduates in Nigerian universities to pursue degree courses without tuition delays.",
    eligibility: [
      "Full-time undergraduate in any accredited Nigerian university",
      "Minimum 3.0 CGPA on a 5.0 grading scale",
      "Completed Senior Secondary School Certificate with minimum 5 credits",
    ],
    perks: [
      "Annual scholarship disbursement",
      "Indomie youth ambassador recognition and products package",
      "Factory tour and industrial attachment consideration",
    ],
    applicationUrl: "https://www.scholarshipregion.com/dufil-prima-foods-scholarship/",
    requirements: ["O-Level Certificate", "University Admission Letter", "Current Semester Results Slip"],
    tags: ["Undergraduate", "Food Science", "Engineering", "Corporate Award"],
  },
  {
    id: "sp-nnpc-seplat-2026",
    title: "NNPC / SEPLAT Energy JV National Undergraduate Scholarship",
    provider: "Seplat Energy Plc & NNPC",
    verifiedSource: {
      name: "Seplat Growth Academy",
      domain: "seplatgrowthacademy.com",
      verifiedAt: "2026-09-15",
      sourceType: "corporate",
      officialUrl: "https://seplatgrowthacademy.com/scholarship/",
    },
    category: "undergraduate",
    awardValue: "₦150,000 – ₦250,000 / year",
    coverage: "Annual educational maintenance grant until graduation",
    targetAudience: "200L+ Undergraduates in Federal and State Universities",
    deadline: "2026-11-20",
    daysRemaining: 66,
    featured: true,
    status: "open",
    summary:
      "A flagship joint venture educational initiative aimed at enhancing educational development and human capital in Nigeria.",
    eligibility: [
      "Must be in second year (200 Level) or higher in an approved federal/state university",
      "Minimum CGPA of 3.5 on 5.0 scale",
      "Enrolled in approved disciplines: Engineering, Computer Science, Economics, Geology, Law, Medicine, Agriculture",
    ],
    perks: [
      "Prompt annual financial support",
      "Invitations to Seplat Energy academic masterclasses",
      "Access to industry mentors",
    ],
    applicationUrl: "https://seplatgrowthacademy.com/scholarship/",
    requirements: ["University ID", "Official Statement of Results/Transcript", "LGA Certificate of Origin"],
    tags: ["Undergraduate", "Energy", "200L+", "National Merit"],
  },
  {
    id: "sp-shell-spdc-2026",
    title: "NNPC / SPDC JV National University Scholarship Scheme",
    provider: "The Shell Petroleum Development Company of Nigeria Limited",
    verifiedSource: {
      name: "Shell Nigeria Education Desk",
      domain: "shell.com.ng",
      verifiedAt: "2026-09-15",
      sourceType: "corporate",
      officialUrl: "https://www.shell.com.ng/sustainability/communities/education-programmes/scholarships.html",
    },
    category: "undergraduate",
    awardValue: "₦250,000 / year",
    coverage: "Full educational grant renewed annually with academic progress",
    targetAudience: "100L/200L Students in Nigerian Federal & State Universities",
    deadline: "2026-12-15",
    daysRemaining: 91,
    status: "open",
    summary:
      "One of Nigeria's longest-running and most respected corporate university scholarship programs, open to students across all faculties.",
    eligibility: [
      "Nigerian citizen enrolled full-time in an accredited Nigerian university",
      "Minimum 7 credits (including Maths and English) in one WAEC/NECO sitting",
      "Maintain minimum 3.0 CGPA on 5.0 scale for yearly renewal",
    ],
    perks: [
      "Direct university funding",
      "Invitations to Shell tech hackathons and innovation hubs",
      "Priority consideration for student internships",
    ],
    applicationUrl: "https://www.shell.com.ng/sustainability/communities/education-programmes/scholarships.html",
    requirements: ["O-Level Results", "JAMB Result Slip", "University Admission Letter", "Student ID"],
    tags: ["Undergraduate", "Shell", "All Faculties", "Renewable"],
  },
  {
    id: "sp-google-generation-emea-2026",
    title: "Generation Google Scholarship (EMEA & Africa)",
    provider: "Google Education & Student Programs",
    verifiedSource: {
      name: "Google Build Your Future",
      domain: "buildyourfuture.withgoogle.com",
      verifiedAt: "2026-09-15",
      sourceType: "tech_brand",
      officialUrl: "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-emea",
    },
    category: "fellowship",
    awardValue: "€7,000 (~₦12,500,000)",
    coverage: "One-time financial award for tuition, books, computer hardware, and living expenses",
    targetAudience: "Computer Science & Engineering Undergraduates & Masters Students",
    deadline: "2026-11-15",
    daysRemaining: 61,
    featured: true,
    status: "closing_soon",
    summary:
      "Awarded to students intending to enter computer science who demonstrate outstanding academic performance and leadership in technology.",
    eligibility: [
      "Currently enrolled as full-time undergraduate or master's student in Africa/EMEA",
      "Studying Computer Science, Computer Engineering, or closely related technical field",
      "Demonstrated passion for technology and community impact",
    ],
    perks: [
      "€7,000 cash grant paid directly",
      "Google Virtual Student Retreat & Leadership Workshops",
      "Mentorship pairing with Google Senior Engineers",
    ],
    applicationUrl: "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-emea",
    requirements: ["Resume / CV", "Academic Transcript", "Responses to short-essay questions"],
    tags: ["Fellowship", "Tech", "Global Brand", "€7,000 Award"],
  },
  {
    id: "sp-iccr-indian-govt-2026",
    title: "Government of India ICCR Full Scholarships (Undergrad & Masters)",
    provider: "Indian Council for Cultural Relations (ICCR)",
    verifiedSource: {
      name: "ICCR Portal / Scholarship Region",
      domain: "scholarshipregion.com",
      verifiedAt: "2026-09-15",
      sourceType: "government",
      officialUrl: "https://www.scholarshipregion.com/category/scholarships/masters-scholarships/",
    },
    category: "masters",
    awardValue: "100% Fully Funded (Tuition + Flight + Monthly Living Allowance)",
    coverage: "Full tuition waiver, visa fees, round-trip economy airfare, hostel accommodation, and monthly stipend",
    targetAudience: "Nigerian High School Graduates (for BSc) and University Graduates (for MSc / PhD)",
    deadline: "2027-01-31",
    daysRemaining: 138,
    status: "open",
    summary:
      "A prestigious bilateral government scholarship program offering comprehensive funding for African students to pursue undergraduate and postgraduate degrees at top universities in India.",
    eligibility: [
      "Proficiency in English language (minimum requirement)",
      "Age 18–30 for Undergraduate courses; up to 35 for Masters/PhD",
      "Medical fitness certificate from an accredited government hospital",
    ],
    perks: [
      "100% full tuition waiver",
      "Free university accommodation and meals",
      "Monthly living stipend deposited in INR",
      "Return international flight tickets",
    ],
    applicationUrl: "https://www.scholarshipregion.com/category/scholarships/masters-scholarships/",
    requirements: ["Academic Certificates & Transcripts", "International Passport", "Medical Fitness Certificate", "Passport Photograph"],
    tags: ["Masters", "Undergraduate", "Fully Funded", "International Flight"],
  },
  {
    id: "sp-notre-dame-scholars-2026",
    title: "University of Notre Dame Undergraduate Scholars Award (USA)",
    provider: "University of Notre Dame, USA",
    verifiedSource: {
      name: "Notre Dame Admissions / Scholarship Region",
      domain: "scholarshipregion.com",
      verifiedAt: "2026-09-15",
      sourceType: "foundation",
      officialUrl: "https://www.scholarshipregion.com/university-of-notre-dame-undergraduate-scholars-program/",
    },
    category: "undergraduate",
    awardValue: "Full Tuition + $10,000 Enrichment Stipend (~$300,000 Total)",
    coverage: "Complete undergraduate tuition coverage, room and board, plus $10,000 summer research/internship fund",
    targetAudience: "Outstanding High School Seniors & Pre-University Applicants Seeking USA Bachelor's Degree",
    deadline: "2026-12-15",
    daysRemaining: 91,
    status: "open",
    summary:
      "Notre Dame's top merit-based scholarship for international undergraduate applicants who demonstrate exceptional academic achievement, intellectual curiosity, and exemplary leadership.",
    eligibility: [
      "Top percentile academic record in secondary school / high school certificate",
      "Active involvement in extracurricular activities or community leadership",
      "International applicants eligible with full financial coverage",
    ],
    perks: [
      "Four years of complete undergraduate tuition coverage",
      "$10,000 enrichment stipend for summer internships or research",
      "Special scholar seminars and dedicated faculty mentorship",
    ],
    applicationUrl: "https://www.scholarshipregion.com/university-of-notre-dame-undergraduate-scholars-program/",
    requirements: ["High School Transcript", "Standardized Test or Waiver", "Letters of Recommendation", "Personal Essay"],
    tags: ["Undergraduate", "USA", "Full Tuition", "$10k Enrichment"],
  },
  {
    id: "sp-unilife-campus-event-fund-2026",
    title: "UniLife Campus Department & Tech Week Sponsorship Fund",
    provider: "UniLife Campus Partnerships",
    verifiedSource: {
      name: "UniLife Partner Desk",
      domain: "unilife.com.ng/partners",
      verifiedAt: "2026-09-15",
      sourceType: "corporate",
      officialUrl: "https://unilife.com.ng/partners",
    },
    category: "event_sponsor",
    awardValue: "₦100,000 – ₦500,000 per Event",
    coverage: "Cash event sponsorship, stage branding, attendee swag, and digital ticketing infrastructure",
    targetAudience: "Department Executives, Faculty Presidents, SUG Committees, Campus Tech Clubs (GDSC, IEEE, NACOS)",
    deadline: "2026-12-31",
    daysRemaining: 107,
    featured: true,
    status: "verified_ongoing",
    summary:
      "Organizing an upcoming Faculty Dinner, Tech Summit, Hackathon, or Orientation Week? UniLife provides co-sponsorship, promotional reach across 50,000+ students, and direct financial grants.",
    eligibility: [
      "Registered campus body, student union chapter, or faculty association in Nigeria",
      "Event must have an expected turnout of 150+ student attendees",
      "Agree to integrate UniLife's free verified digital ticketing and banner presence",
    ],
    perks: [
      "Direct financial grant paid to association bank account",
      "UniLife branded banners, shirts, and wristbands provided free",
      "Broadcast blast to all campus students on WhatsApp and app notifications",
    ],
    applicationUrl: "https://wa.me/2348164670694?text=Hello%20UniLife!%20We%20want%20to%20apply%20for%20event%20sponsorship",
    requirements: ["Event Proposal Pitch Deck (PDF)", "Estimated Budget Sheet", "Letter endorsed by Staff Adviser / President"],
    tags: ["Event Grants", "Faculty Dinners", "Tech Summits", "Direct Payout"],
  },
];
