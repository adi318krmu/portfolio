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

    // 2. Website Settings - Authentic Profile Data
    const settingsCount = await WebsiteSettings.countDocuments();
    if (settingsCount === 0) {
      await WebsiteSettings.create({
        hero: {
          name: "Aditya Singh",
          subtitle: "Full Stack Developer & Computer Science Student",
          typingText: [
            "Full Stack Developer",
            "Backend Developer",
            "MERN Stack Developer",
            "AI Enthusiast"
          ],
          availability: "Open to Full-Time Roles & Internship Opportunities",
          profileImage: "/interview-photo.jpeg",
          focusAreas: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST APIs",
            "JWT Authentication"
          ],
          callouts: [
            { value: "220+", label: "LeetCode Solved" },
            { value: "90+", label: "Codeforces Solved" },
            { value: "15+", label: "Coding Contests" },
            { value: "3", label: "Production Projects" },
            { value: "Oracle AI", label: "Foundations Certified" }
          ]
        },
        about: {
          title: "About Aditya Singh",
          bio: "Computer Science student passionate about building scalable web applications, backend systems, and AI-powered products using React, Node.js, Express, MongoDB, and modern development tools.",
          journey: "Experienced in engineering full-stack platforms like DevBattles, RepoLens, and Campus Learn while solving 220+ LeetCode problems and competing in coding contests.",
          strengths: [
            "Computer Science Student",
            "Backend Development & REST APIs",
            "MERN Stack (MongoDB, Express, React, Node)",
            "AI-Powered Application Integration",
            "Data Structures & Problem Solving",
            "Git, Docker & Deployment Workflows"
          ],
          achievements: [
            "Solved 220+ problems on LeetCode (Max Rating: 1653) & 90+ on Codeforces.",
            "Engineered AI-assisted coding platform DevBattles and RepoLens GitHub analyzer.",
            "Completed Web Development Internship at InAmigos Foundation.",
            "Oracle AI Foundations Associate Certified."
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
          title: "Aditya Singh | Full Stack Developer & Computer Science Student",
          description: "Official portfolio of Aditya Singh featuring DevBattles, RepoLens, Campus Learn, and real-world full-stack web applications."
        }
      });
    }

    // 3. Real Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "DevBattles – AI Coding Assessment Platform",
          slug: "devbattles",
          summary: "AI-Powered Coding Assessment Platform with teacher-managed contests, student submissions, and LLM-driven evaluation.",
          description: "Built an AI-powered coding assessment platform supporting teacher-managed coding contests, student submissions, and automated evaluation through LLM-based workflows. Deployed on AWS EC2 using NGINX, PM2, Docker, and GitHub Actions CI/CD with Google Gemini & LangGraph integration.",
          architecture: "Microservices Architecture: React UI -> Node.js API Gateway -> Supabase PostgreSQL DB -> FastAPI Docker Worker Service -> Gemini AI & LangGraph pipeline.",
          challenges: "Achieving sub-second code evaluation in isolated Docker containers while preventing memory leaks and managing concurrent updates.",
          features: [
            "Teacher contest creation & live student portal",
            "Automated multi-language code evaluation in Docker",
            "Google Gemini & LangGraph AI code analysis",
            "PostgreSQL (Supabase) DB with JWT role authorization",
            "Live contest leaderboards & score tracking",
            "Deployed on AWS EC2 with NGINX & PM2"
          ],
          stack: ["React", "Node.js", "Express.js", "FastAPI", "PostgreSQL", "Supabase", "Docker", "AWS EC2", "Gemini AI", "LangGraph"],
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
          architecture: "REST API Architecture: React UI -> Express.js API -> GitHub REST API scanner -> Hugging Face AI Inference Engine -> MongoDB analytics datastore.",
          challenges: "Parsing non-standard PDF resume structures reliably and aggregating weighted GitHub repository scores without triggering rate limits.",
          features: [
            "Analyzes PDF resumes & GitHub repos against 10+ job roles",
            "Scans commit frequency, repo stars, language breakdown, and README quality",
            "Hugging Face AI inference integration for candidate scoring",
            "Secure REST APIs with Node.js, Express, MongoDB, JWT & bcrypt",
            "Rate-limited endpoints supporting 100+ API requests/minute"
          ],
          stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "Hugging Face API", "TailwindCSS"],
          githubUrl: "https://github.com/adi318krmu/RepoLens",
          liveUrl: "https://repo-lens.vercel.app",
          featured: true,
          visible: true,
          order: 2
        },
        {
          title: "Campus Learn – Hybrid RAG Academic Assistant",
          slug: "campus-learn",
          summary: "Hybrid RAG-Based Academic Assistant enabling syllabus-based Q&A over faculty lecture notes.",
          description: "Developed a Hybrid RAG-based academic assistant that enables students to get syllabus-based answers from faculty-uploaded notes. Processed and indexed over 100 academic documents using vector embeddings, improving answer relevance by 35% compared to direct LLMs.",
          architecture: "Hybrid RAG Pipeline: React Frontend -> Node.js API -> Python Vector Database Service -> Hybrid Keyword + Semantic Search -> Gemini Synthesis.",
          challenges: "Efficiently chunking dense academic slides and mathematical formulas without losing document hierarchy or context.",
          features: [
            "Hybrid RAG search over faculty-uploaded notes & syllabus documents",
            "Vector embeddings indexing over 100+ academic PDFs",
            "35% answer relevance improvement over baseline LLM responses",
            "Source citation display pointing directly to source lecture slides"
          ],
          stack: ["React", "Node.js", "Python", "Vector DB", "Hybrid RAG", "MongoDB", "TailwindCSS"],
          githubUrl: "https://github.com/adi318krmu/Campus-Learn",
          liveUrl: "https://campus-learn-lms-zqft.vercel.app",
          featured: true,
          visible: true,
          order: 3
        }
      ]);
    }

    // 4. Skills Categorized
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        // Advanced
        { name: "React.js", category: "Frontend", level: 95, icon: "Code", order: 1 },
        { name: "Node.js", category: "Backend", level: 92, icon: "Server", order: 2 },
        { name: "Express.js", category: "Backend", level: 94, icon: "Cpu", order: 3 },
        { name: "MongoDB", category: "Database", level: 90, icon: "Database", order: 4 },
        { name: "JavaScript", category: "Programming", level: 95, icon: "FileCode", order: 5 },
        { name: "C++", category: "Programming", level: 92, icon: "Binary", order: 6 },

        // Intermediate
        { name: "Supabase", category: "Database", level: 85, icon: "Database", order: 7 },
        { name: "MySQL", category: "Database", level: 85, icon: "Database", order: 8 },
        { name: "Tailwind CSS", category: "Frontend", level: 90, icon: "Palette", order: 9 },
        { name: "JWT", category: "Backend", level: 90, icon: "Lock", order: 10 },
        { name: "Python", category: "Programming", level: 84, icon: "Terminal", order: 11 },

        // Basic Working Knowledge
        { name: "Docker", category: "DevOps", level: 75, icon: "Box", order: 12 },
        { name: "AWS EC2", category: "Cloud", level: 75, icon: "Cloud", order: 13 },
        { name: "NGINX", category: "DevOps", level: 75, icon: "Boxes", order: 14 },
        { name: "GitHub Actions", category: "DevOps", level: 75, icon: "GitBranch", order: 15 },
        { name: "LangGraph", category: "AI", level: 75, icon: "Bot", order: 16 }
      ]);
    }

    // 5. Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany([
        {
          degree: "Bachelor of Technology in Computer Science & Engineering",
          institution: "K.R. Mangalam University, Gurugram, India",
          period: "2023 - 2027",
          score: "CGPA 8.0 / 10",
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
        }
      ]);
    }

    // 6. Real Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.create({
        title: "Web Development Intern",
        company: "InAmigos Foundation",
        location: "Gurugram, India",
        period: "2026",
        descriptionPoints: [
          "Developed and maintained responsive web pages using React and JavaScript.",
          "Collaborated with team members to improve UI/UX and optimize user engagement.",
          "Integrated backend REST APIs and managed dynamic content modules.",
          "Used Git and GitHub for version control and team code reviews."
        ],
        tags: ["React", "JavaScript", "HTML/CSS", "Git", "REST APIs"],
        order: 1
      });
    }

    // 7. Certifications
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.insertMany([
        {
          title: "Oracle AI Foundations Associate",
          issuer: "Oracle",
          issueDate: "2024",
          credentialUrl: "https://github.com/adi318krmu",
          tags: ["Artificial Intelligence", "Machine Learning", "Oracle Cloud AI"],
          order: 1
        },
        {
          title: "GirlScript Summer of Code (GSSOC) Contributor",
          issuer: "GirlScript Foundation",
          issueDate: "2024",
          credentialUrl: "https://github.com/adi318krmu",
          tags: ["Open Source", "Git & GitHub", "React", "Node.js"],
          order: 2
        }
      ]);
    }

    // 8. Resume PDF
    const resumeCount = await Resume.countDocuments();
    if (resumeCount === 0) {
      await Resume.create({
        title: "Aditya Singh Resume",
        pdfUrl: "/resume.pdf"
      });
    }

    console.log("[Seed] Seeding check complete!");
  } catch (error) {
    console.error("[Seed Error]", error);
  }
};
