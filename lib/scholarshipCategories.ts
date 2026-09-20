export interface ScholarshipCategory {
  id: string;
  name: string;
  level: string;
  icon: string;
  description: string;
  url: string;
  badge: string;
}

export const SCHOLARSHIP_PORTAL_CATEGORIES: ScholarshipCategory[] = [
  {
    id: "undergraduate",
    name: "Undergraduate Scholarships",
    level: "Bachelor's Degree",
    icon: "🎓",
    description: "Full tuition, maintenance stipends, and grants for university undergraduates in Nigeria and abroad.",
    url: "https://www.scholarshipregion.com/category/scholarships/undergraduate-scholarships/",
    badge: "Most Popular",
  },
  {
    id: "masters",
    name: "Masters & Postgraduate",
    level: "Master's & PhD",
    icon: "🏛️",
    description: "Fully funded international scholarships, tuition waivers, and monthly living stipends for graduates.",
    url: "https://www.scholarshipregion.com/category/scholarships/masters-scholarships/",
    badge: "High Value",
  },
  {
    id: "fellowships",
    name: "Fellowships & Leadership",
    level: "Early Career & Scholars",
    icon: "✨",
    description: "Global research, tech, and leadership fellowships with stipends and travel grants.",
    url: "https://www.scholarshipregion.com/category/scholarships/fellowships/",
    badge: "Prestigious",
  },
  {
    id: "competitions",
    name: "Competitions & Cash Prizes",
    level: "All Students",
    icon: "🏆",
    description: "Academic challenges, hackathons, and essay competitions with direct cash awards.",
    url: "https://www.scholarshipregion.com/category/competitions/",
    badge: "Direct Prizes",
  },
  {
    id: "internships",
    name: "Internships & Placements",
    level: "Undergrad & Postgrad",
    icon: "💼",
    description: "Local & international corporate internships, industrial training (IT), and graduate trainee opportunities.",
    url: "https://www.scholarshipregion.com/category/internships/",
    badge: "Career Growth",
  },
  {
    id: "trainings",
    name: "Trainings & Bootcamps",
    level: "Skill Building",
    icon: "💻",
    description: "Free certified technical trainings, coding bootcamps, and professional skill development courses.",
    url: "https://www.scholarshipregion.com/category/training/",
    badge: "Free Certs",
  },
  {
    id: "high_school",
    name: "High School Scholarships",
    level: "Secondary School",
    icon: "🎒",
    description: "Secondary school education support, WAEC/JAMB sponsorships, and pre-university bursaries.",
    url: "https://www.scholarshipregion.com/category/scholarships/high-school-scholarships/",
    badge: "Pre-Varsity",
  },
];
