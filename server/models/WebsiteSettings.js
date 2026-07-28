import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema({
  hero: {
    name: { type: String, default: "Aditya Singh" },
    subtitle: { type: String, default: "Full Stack Engineer & AI Developer" },
    typingText: [{ type: String, default: ["MERN Stack Specialist", "AI System Architect", "FastAPI & Microservices Developer", "Competitive Programmer"] }],
    availability: { type: String, default: "Available for Full-time Roles & High-Impact Projects" },
    profileImage: { type: String, default: "/interview-photo.jpeg" },
    focusAreas: [{ type: String, default: ["Full Stack Dev", "AI Engineering", "Distributed Systems", "C++ Algorithms"] }],
    callouts: [
      { value: { type: String }, label: { type: String } }
    ]
  },
  about: {
    title: { type: String, default: "About Aditya" },
    bio: { type: String, default: "Computer Science Engineering student with an relentless drive for building ultra-scalable web platforms, AI microservices, and high-performance developer tools." },
    journey: { type: String, default: "From mastering data structures in C++ to deploying distributed full-stack systems and RAG architectures, I focus on clean software design, production performance, and user-first aesthetics." },
    strengths: [{ type: String }],
    achievements: [{ type: String }]
  },
  socialLinks: {
    github: { type: String, default: "https://github.com/adi318krmu" },
    linkedin: { type: String, default: "https://www.linkedin.com/in/aditya-singh-59578934b/" },
    leetcode: { type: String, default: "https://leetcode.com" },
    codeforces: { type: String, default: "https://codeforces.com" },
    codechef: { type: String, default: "https://codechef.com" },
    geeksforgeeks: { type: String, default: "https://geeksforgeeks.org" },
    email: { type: String, default: "adityaks0604@gmail.com" },
    phone: { type: String, default: "+91 9876543210" },
    location: { type: String, default: "Gurugram, Haryana, India" }
  },
  seo: {
    title: { type: String, default: "Aditya Singh | Production-Ready Developer Portfolio" },
    description: { type: String, default: "Aditya Singh - Full Stack Developer & AI Engineer portfolio showcasing DevBattles, RepoLens, Campus Learn, and custom high-performance applications." }
  }
}, { timestamps: true });

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
