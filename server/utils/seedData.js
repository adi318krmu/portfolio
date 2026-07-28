import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Education from "../models/Education.js";
import Certificate from "../models/Certificate.js";
import Blog from "../models/Blog.js";
import Resume from "../models/Resume.js";
import WebsiteSettings from "../models/WebsiteSettings.js";

export const seedDatabase = async () => {
  try {
    // 1. Admin User
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || "adityaks0604@gmail.com";
      const rawPassword = process.env.ADMIN_PASSWORD || "admin123456";
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      
      await Admin.create({
        email,
        password: hashedPassword,
        role: "ADMIN"
      });
      console.log(`[Seed] Admin user created: ${email}`);
    }

    // 2. Website Settings - Aditya's Real Resume Profile
    await WebsiteSettings.deleteMany({});
    await WebsiteSettings.create({
      hero: {
        name: "Aditya Singh",
        subtitle: "Full Stack Developer & AI Solutions Engineer",
        typingText: [
          "MERN & FastAPI Specialist",
          "Hybrid RAG & Vector Search Engineer",
          "220+ LeetCode Solved (Max 1653)",
          "Microservices & Docker Architect"
        ],
        availability: "Open to Full-Time Roles, Internships & High-Impact Freelance Work",
        profileImage: "/interview-photo.jpeg",
        focusAreas: ["Full Stack Web", "AI Systems", "REST APIs", "DSA & Algorithms"],
        callouts: [
          { value: "220+", label: "LeetCode Solved (Max 1653)" },
          { value: "90+", label: "Codeforces Solved (Max 1066)" },
          { value: "15+", label: "Coding Contests" },
          { value: "35%", label: "RAG Accuracy Boost" }
        ]
      },
      about: {
        title: "About Aditya Singh",
        bio: "Full-Stack Developer experienced in building scalable web applications, REST APIs, and AI-powered solutions using React, Node.js, Express, MongoDB, and C++. Strong foundation in Data Structures & Algorithms and software engineering principles.",
        journey: "I have engineered DevBattles (AI coding assessment platform on AWS EC2 & Docker), RepoLens (AI Resume & GitHub analyzer using Hugging Face), and Campus Learn (Hybrid RAG study assistant). Completed Web Development Internship at InAmigos Foundation.",
        strengths: [
          "DSA & Algorithm Optimization",
          "Microservices Architecture (FastAPI & Node.js)",
          "Hybrid RAG & Vector Database Embeddings",
          "JWT & Role-Based Authorization",
          "Clean React UI & Responsive Design",
          "Docker & Cloud Deployment Workflows"
        ],
        achievements: [
          "Solved 220+ problems on LeetCode with max rating 1653 and 100 Days Badge.",
          "Solved 90+ problems on Codeforces with max rating 1066.",
          "Oracle AI Foundations Associate Certified.",
          "Web Development Intern at InAmigos Foundation (2026)."
        ]
      },
      socialLinks: {
        github: "https://github.com/adi318krmu",
        linkedin: "https://www.linkedin.com/in/aditya-singh-59578934b/",
        leetcode: "https://leetcode.com",
        codeforces: "https://codeforces.com",
        codechef: "https://codechef.com",
        geeksforgeeks: "https://geeksforgeeks.org",
        email: "adityaks0604@gmail.com",
        phone: "+91-9355659492",
        location: "Gurugram, Haryana, India"
      },
      seo: {
        title: "Aditya Singh | Full Stack Developer & AI Engineer",
        description: "Official portfolio of Aditya Singh featuring DevBattles, RepoLens, Campus Learn, and real-world full-stack web applications."
      }
    });

    // 3. Real Projects from Resume
    await Project.deleteMany({});
    await Project.insertMany([
      {
        title: "DevBattles",
        slug: "devbattles",
        summary: "AI-Powered Coding Assessment Platform with teacher-managed contests, student submissions, and LLM-driven evaluation.",
        description: "Built an AI-powered coding assessment platform supporting teacher-managed coding contests, student submissions, and automated evaluation through LLM-based workflows. Deployed on AWS EC2 using NGINX, PM2, Docker, and GitHub Actions CI/CD with Google Gemini & LangGraph integration.",
        architecture: "Designed a microservices architecture using Node.js, Express.js, FastAPI, React, PostgreSQL (Supabase), and JWT, integrating secure authentication, role-based authorization, and scalable REST APIs.",
        challenges: "Achieving sub-second code evaluation in isolated Docker containers, preventing infinite loops, and structuring LangGraph feedback loops for real-time AI code analysis.",
        features: [
          "Teacher-managed coding contests & student submission portal",
          "Automated evaluation through LLM-based workflows",
          "Microservices with Node.js, Express.js, FastAPI & React",
          "PostgreSQL (Supabase) database with JWT authorization",
          "Deployed on AWS EC2 with NGINX, PM2, Docker & GitHub Actions",
          "Google Gemini AI & LangGraph code feedback integration"
        ],
        stack: ["React", "Node.js", "Express.js", "FastAPI", "PostgreSQL", "Supabase", "Docker", "AWS EC2", "Gemini AI", "LangGraph", "NGINX"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
        ],
        githubUrl: "https://github.com/adi318krmu/DevBattles",
        liveUrl: "https://devbattles.vercel.app",
        featured: true,
        visible: true,
        order: 1
      },
      {
        title: "RepoLens – AI Resume & GitHub Analyzer",
        slug: "repolens",
        summary: "Full-Stack AI Application analyzing PDF resumes & GitHub repos against 10+ job roles using Hugging Face API.",
        description: "Developed a full-stack AI-powered application using Hugging Face Inference API to analyze resumes (PDF) and GitHub repositories against 10+ job roles, generating candidate readiness scores and personalized feedback.",
        architecture: "Node.js, Express.js, MongoDB, JWT, and bcrypt REST API layer backed by Hugging Face inference pipeline and GitHub REST API parser.",
        challenges: "Parsing complex PDF resume structures, computing weighted repository scores across commit history, and rate-limiting endpoints to handle 100+ requests/minute reliably.",
        features: [
          "Analyzes PDF resumes & GitHub repos against 10+ job roles",
          "Weighted evaluation engine assessing 50+ resumes & 100+ repos",
          "Hugging Face AI inference integration for candidate scoring",
          "Secure REST APIs with Node.js, Express.js, MongoDB, JWT & bcrypt",
          "Rate-limited endpoints supporting 100+ API requests/minute"
        ],
        stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "Hugging Face API", "TailwindCSS"],
        thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&auto=format&fit=crop&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&auto=format&fit=crop&q=80"
        ],
        githubUrl: "https://github.com/adi318krmu/RepoLens",
        liveUrl: "https://repo-lens.vercel.app",
        featured: true,
        visible: true,
        order: 2
      },
      {
        title: "Campus Learn",
        slug: "campus-learn",
        summary: "Hybrid RAG-Based Academic Assistant enabling syllabus-based Q&A over faculty lecture notes.",
        description: "Developed a Hybrid RAG-based academic assistant that enables students to get syllabus-based answers from faculty-uploaded notes. Processed and indexed over 100 academic documents using vector embeddings, improving answer relevance by 35% compared to direct LLMs.",
        architecture: "Hybrid Retrieval Augmented Generation combining keyword matching and vector embeddings for semantic document search.",
        challenges: "Reducing LLM hallucinations by restricting context to faculty study materials and chunking dense academic PDFs efficiently.",
        features: [
          "Hybrid RAG search over faculty-uploaded notes & syllabus documents",
          "Vector embeddings indexing over 100+ academic PDFs",
          "35% answer relevance improvement over baseline LLM responses",
          "Tested with 30+ active student users"
        ],
        stack: ["React", "Node.js", "Python", "Vector DB", "Hybrid RAG", "MongoDB"],
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
        ],
        githubUrl: "https://github.com/adi318krmu/Campus-Learn",
        liveUrl: "https://campus-learn-lms-zqft.vercel.app",
        featured: true,
        visible: true,
        order: 3
      }
    ]);

    // 4. Exact Real Technical Skills from Resume
    await Skill.deleteMany({});
    await Skill.insertMany([
      // Languages
      { name: "C++", category: "Programming", level: 92, icon: "Code", order: 1 },
      { name: "Python", category: "Programming", level: 86, icon: "Terminal", order: 2 },
      { name: "JavaScript (ES6+)", category: "Programming", level: 94, icon: "FileCode", order: 3 },
      { name: "TypeScript (Basic)", category: "Programming", level: 82, icon: "FileCode", order: 4 },

      // Backend
      { name: "Node.js", category: "Backend", level: 92, icon: "Server", order: 5 },
      { name: "Express.js", category: "Backend", level: 94, icon: "Cpu", order: 6 },
      { name: "FastAPI", category: "Backend", level: 85, icon: "Zap", order: 7 },
      { name: "REST APIs", category: "Backend", level: 95, icon: "Network", order: 8 },
      { name: "JWT Authentication", category: "Backend", level: 92, icon: "Lock", order: 9 },

      // Database
      { name: "MongoDB", category: "Database", level: 90, icon: "Database", order: 10 },
      { name: "MySQL & SQL", category: "Database", level: 85, icon: "Database", order: 11 },
      { name: "Supabase & PostgreSQL", category: "Database", level: 84, icon: "Database", order: 12 },

      // Frontend
      { name: "React.js", category: "Frontend", level: 94, icon: "Layout", order: 13 },
      { name: "HTML5 & CSS3", category: "Frontend", level: 95, icon: "Globe", order: 14 },
      { name: "Tailwind CSS", category: "Frontend", level: 92, icon: "Palette", order: 15 },

      // Tools & Platforms
      { name: "Git & GitHub", category: "Tools", level: 92, icon: "GitBranch", order: 16 },
      { name: "Firebase", category: "Tools", level: 82, icon: "Cloud", order: 17 },
      { name: "Postman", category: "Tools", level: 90, icon: "Send", order: 18 },
      { name: "Vercel & Render", category: "Tools", level: 90, icon: "CloudUpload", order: 19 },

      // Cloud & DevOps
      { name: "Deployment Workflows & CI/CD", category: "DevOps", level: 84, icon: "Boxes", order: 20 },
      { name: "Docker (Learning)", category: "DevOps", level: 80, icon: "Box", order: 21 },
      { name: "AWS EC2 & NGINX", category: "Cloud", level: 82, icon: "Cloud", order: 22 },

      // Core CS
      { name: "Data Structures & Algorithms (DSA)", category: "Core Subjects", level: 92, icon: "Binary", order: 23 },
      { name: "Object-Oriented Programming (OOP)", category: "Core Subjects", level: 90, icon: "Box", order: 24 },
      { name: "Database Management Systems (DBMS)", category: "Core Subjects", level: 88, icon: "Database", order: 25 },
      { name: "Computer Networks", category: "Core Subjects", level: 84, icon: "Wifi", order: 26 }
    ]);

    // 5. Exact Education from Resume
    await Education.deleteMany({});
    await Education.insertMany([
      {
        degree: "Bachelor of Technology in Computer Science & Engineering",
        institution: "K.R. Mangalam University, Gurugram, India",
        period: "2023 - Present",
        score: "Pursuing B.Tech CSE",
        descriptionPoints: [
          "Specialized in Software Engineering, Web Systems, and Data Structures & Algorithms."
        ],
        order: 1
      },
      {
        degree: "Class XIIth (CBSE, PCM)",
        institution: "C.D. International School, Gurugram, India",
        period: "2022 - 2023",
        score: "85%",
        descriptionPoints: ["Physics, Chemistry, Mathematics background."],
        order: 2
      },
      {
        degree: "Class Xth (CBSE)",
        institution: "C.D. International School, Gurugram, India",
        period: "2020 - 2021",
        score: "95%",
        descriptionPoints: ["Achieved 95% aggregate."],
        order: 3
      }
    ]);

    // 6. Real Experience from Resume
    await Experience.deleteMany({});
    await Experience.create({
      title: "Web Development Intern",
      company: "InAmigos Foundation",
      location: "Gurugram, India",
      period: "2026",
      descriptionPoints: [
        "Developed and maintained responsive web pages using HTML, CSS, JavaScript, and React.",
        "Collaborated with team members to improve website UI/UX and optimize user engagement.",
        "Assisted in integrating backend APIs and managing dynamic content for organization activities.",
        "Participated in debugging, testing, and deployment of web modules.",
        "Worked with Git and GitHub for version control and collaborative development."
      ],
      tags: ["React", "JavaScript", "HTML/CSS", "Git", "REST APIs"],
      order: 1
    });

    // 7. Certifications from Resume
    await Certificate.deleteMany({});
    await Certificate.create({
      title: "Oracle AI Foundations Associate",
      issuer: "Oracle",
      issueDate: "2024",
      credentialUrl: "https://github.com/adi318krmu",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      tags: ["Artificial Intelligence", "Machine Learning", "Oracle Cloud AI", "Generative AI"],
      order: 1
    });

    // 8. Resume PDF
    await Resume.deleteMany({});
    await Resume.create({
      title: "Aditya Singh Resume",
      pdfUrl: "/resume.pdf"
    });

    console.log("[Seed] Real resume database seeding complete!");
  } catch (error) {
    console.error("[Seed Error]", error);
  }
};
