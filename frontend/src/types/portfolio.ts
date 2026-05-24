export type ProjectCategory = "AI" | "Web" | "ML" | "IoT" | "Data" | "DevOps";

export interface SocialLink {
  label: string;
  url: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: ProjectCategory;
  image: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  URL?: string;
  details: string;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  content: string[];
  projects?: string[];
  badge: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    taglineOptions: string[];
    summary: string;
    resumeUrl: string;
    email: string;
    location: string;
    photoUrl?: string;
    photoAlt?: string;
    socials: SocialLink[];
  };
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  journey: JourneyMilestone[];
  stats: Stat[];
}
