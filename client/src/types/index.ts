export interface Project {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  architecture?: string;
  challenges?: string;
  features: string[];
  stack: string[];
  thumbnail?: string;
  gallery?: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface Skill {
  _id?: string;
  name: string;
  category: "Programming" | "Frontend" | "Backend" | "Database" | "AI" | "DevOps" | "Cloud" | "Tools" | "Core Subjects";
  level: number;
  icon: string;
  hidden: boolean;
  order: number;
}

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  descriptionPoints: string[];
  tags: string[];
  order: number;
}

export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
  descriptionPoints: string[];
  order: number;
}

export interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image?: string;
  tags?: string[];
  order: number;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags: string[];
  readTime: string;
  published: boolean;
  views?: number;
  createdAt?: string;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
  read: boolean;
  starred: boolean;
  createdAt?: string;
}

export interface WebsiteSettings {
  hero: {
    name: string;
    subtitle: string;
    typingText: string[];
    availability: string;
    profileImage: string;
    focusAreas: string[];
    callouts: { value: string; label: string }[];
  };
  about: {
    title: string;
    bio: string;
    journey: string;
    strengths: string[];
    achievements: string[];
  };
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
    codeforces: string;
    codechef: string;
    geeksforgeeks: string;
    email: string;
    phone: string;
    location: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}
