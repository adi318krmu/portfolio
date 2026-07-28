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
    // 1. Seed Admin User if none exists
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
      console.log(`[Seed] Created default Admin account: ${email}`);
    }

    // 2. Seed Website Settings if none exists
    const settingsCount = await WebsiteSettings.countDocuments();
    if (settingsCount === 0) {
      await WebsiteSettings.create({
        hero: {
          name: "Aditya Singh",
          subtitle: "Full Stack Engineer & AI Microservices Architect",
          typingText: [
            "MERN & FastAPI Specialist",
            "Hybrid RAG & Vector DB Engineer",
            "Microservices & Docker Architect",
            "C++ Competitive Programmer"
          ],
          availability: "Available for High-Impact Software Engineering Roles & Freelance Projects",
          profileImage: "/interview-photo.jpeg",
          focusAreas: ["Full Stack Dev", "AI Engineering", "Microservices", "System Architecture"],
          callouts: [
            { value: "4+", label: "Production-grade Systems" },
            { value: "100%", label: "Custom Mini CMS Controlled" },
            { value: "40%", label: "Eval Consistency Boost" },
            { value: "24/7", label: "Ready to Ship & Scale" }
          ]
        },
        about: {
          title: "About Aditya Singh",
          bio: "I am a Computer Science & Engineering student with a relentless drive to engineer production-ready web platforms, AI backend microservices, and high-performance software tools.",
          journey: "My trajectory spans building AI evaluation engines (DevBattles), automated repo scoring engines (RepoLens), hybrid retrieval systems (Campus Learn), and real-time vendor supply chain backends (VendorSetu). I focus on clean microservices architecture, clean modular code, and high visual standards.",
          strengths: [
            "Distributed Systems Design",
            "FastAPI & Node.js Microservices",
            "Vector Database Search (RAG)",
            "JWT & Security Architecture",
            "Clean Modern UI / UX Design",
            "High Ownership & Fast Execution"
          ],
          achievements: [
            "Engineered AI Coding Assessment platform supporting multi-language microservices execution.",
            "Designed weighted GitHub evaluation engine processing 100+ repos with custom metrics.",
            "Achieved CGPA 8 in Computer Science Engineering at K.R. Mangalam University."
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
          phone: "+91 9876543210",
          location: "India"
        },
        seo: {
          title: "Aditya Singh | Full Stack & AI Software Engineer",
          description: "Production-ready developer portfolio of Aditya Singh featuring DevBattles, RepoLens, Campus Learn, and custom high-performance applications."
        }
      });
      console.log("[Seed] Created default Website Settings");
    }

    // 3. Seed Projects if none exists
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "DevBattles",
          slug: "devbattles",
          summary: "AI Coding Assessment Platform built with microservices architecture, real-time code evaluation, and automated performance profiling.",
          description: "DevBattles is a full-fledged competitive coding assessment platform that leverages FastAPI, LangGraph, and Gemini AI to evaluate developers in real-time. It runs code execution in isolated Docker environments and delivers detailed microservices analytics.",
          architecture: "Designed with an API gateway pattern separating the React front-end, Node.js state router, and isolated FastAPI code execution workers running Docker containers with PostgreSQL persistent storage.",
          challenges: "Achieving sub-second code evaluation while maintaining secure container sandboxing, preventing infinite loops, and handling concurrent LLM feedback loops without hitting rate limits.",
          features: [
            "Real-time code execution in sandboxed Docker containers",
            "Gemini AI & LangGraph integration for automated code review & hint generation",
            "Microservices architecture with Node.js and FastAPI",
            "Interactive code runner with syntax highlighting & test case validation",
            "Comprehensive analytics dashboard for developer scoring"
          ],
          stack: ["React", "Node.js", "FastAPI", "PostgreSQL", "Docker", "AWS EC2", "Gemini AI", "LangGraph"],
          thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80"
          ],
          githubUrl: "https://github.com/adi318krmu/DevBattles",
          liveUrl: "https://devbattles.vercel.app",
          featured: true,
          visible: true,
          order: 1
        },
        {
          title: "RepoLens",
          slug: "repolens",
          summary: "AI Resume Analyzer & GitHub Repository Analyzer evaluating code structure, readiness, and repository quality.",
          description: "RepoLens is an intelligent portfolio and GitHub repo evaluation engine. It fetches structure, commit histories, README files, and code complexity metrics using Hugging Face AI and custom scoring algorithms to generate an instant interview readiness report.",
          architecture: "MERN Stack core backed by Hugging Face API inference workers. Uses JWT authentication, rate-limiting middleware, and MongoDB schema indexing for instant repo lookups.",
          challenges: "Parsing large GitHub repositories efficiently, managing API rate limits gracefully, and synthesizing unstructured commit & code data into standardized, actionable scores.",
          features: [
            "Deep GitHub repository structure & README analysis",
            "Hugging Face AI scoring engine providing interview readiness score",
            "Secure JWT authentication with bcrypt password hashing",
            "Track multi-user repository evaluation history in MongoDB",
            "Rate-limited REST endpoints handling 100+ requests/min reliably"
          ],
          stack: ["React", "Node.js", "Express", "MongoDB", "Hugging Face API", "JWT", "TailwindCSS"],
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
          summary: "Hybrid RAG-based Academic Assistant powering vector database semantic search over faculty study materials.",
          description: "Campus Learn enables students to query university study notes, lecture PDFs, and curriculum documents with precision. Utilizing Hybrid Retrieval Augmented Generation (RAG) and dense vector embeddings, it delivers context-aware answers grounded strictly in course materials.",
          architecture: "Vector Database embeddings paired with Node.js & PyTorch embedding pipeline. Employs BM25 + Dense Semantic Hybrid Search for 35% higher answer accuracy.",
          challenges: "Reducing hallucination in LLM responses and chunking dense academic PDFs into semantically meaningful vector spaces.",
          features: [
            "Hybrid RAG combining keyword matching and dense vector search",
            "PDF document chunking and vector embedding pipeline",
            "Context-restricted answer generation for zero-hallucination study prep",
            "Tested with 30+ active university student users across 100+ documents"
          ],
          stack: ["React", "Python", "Node.js", "Vector DB", "Hybrid RAG", "FastAPI", "MongoDB"],
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
          ],
          githubUrl: "https://github.com/adi318krmu/Campus-Learn",
          liveUrl: "https://campus-learn-lms-zqft.vercel.app",
          featured: true,
          visible: true,
          order: 3
        },
        {
          title: "VendorSetu",
          slug: "vendorsetu",
          summary: "E-Commerce & Supply Chain Platform connecting street vendors directly with wholesale food suppliers.",
          description: "VendorSetu streamlines bulk product ordering for local vendors with transparent pricing, inventory management, and fast REST endpoints.",
          architecture: "MERN Stack architecture with structured schema models for multi-vendor inventory and JWT role-based access.",
          challenges: "Optimizing database aggregation pipelines for low-latency product listings and search.",
          features: [
            "50+ verified supplier food product listings",
            "JWT authenticated vendor accounts",
            "25% faster API response time through indexed queries",
            "Deployed with 20+ test users"
          ],
          stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
          thumbnail: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&auto=format&fit=crop&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&auto=format&fit=crop&q=80"
          ],
          githubUrl: "https://github.com/adi318krmu/VendorSetu",
          liveUrl: "https://vendor-setu.vercel.app",
          featured: false,
          visible: true,
          order: 4
        }
      ]);
      console.log("[Seed] Seeded initial Projects");
    }

    // 4. Seed Skills if none exists
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        // Programming
        { name: "C++", category: "Programming", level: 90, icon: "Code", order: 1 },
        { name: "JavaScript (ES6+)", category: "Programming", level: 95, icon: "FileCode", order: 2 },
        { name: "TypeScript", category: "Programming", level: 88, icon: "FileCode", order: 3 },
        { name: "Python", category: "Programming", level: 85, icon: "Terminal", order: 4 },

        // Frontend
        { name: "React.js", category: "Frontend", level: 95, icon: "Layout", order: 5 },
        { name: "HTML5 & CSS3", category: "Frontend", level: 95, icon: "Globe", order: 6 },
        { name: "Tailwind CSS", category: "Frontend", level: 92, icon: "Palette", order: 7 },
        { name: "Framer Motion", category: "Frontend", level: 85, icon: "Sparkles", order: 8 },
        { name: "Shadcn UI", category: "Frontend", level: 90, icon: "Component", order: 9 },

        // Backend
        { name: "Node.js", category: "Backend", level: 92, icon: "Server", order: 10 },
        { name: "Express.js", category: "Backend", level: 94, icon: "Cpu", order: 11 },
        { name: "FastAPI", category: "Backend", level: 86, icon: "Zap", order: 12 },
        { name: "RESTful APIs", category: "Backend", level: 95, icon: "Network", order: 13 },
        { name: "Microservices", category: "Backend", level: 82, icon: "Boxes", order: 14 },

        // Database
        { name: "MongoDB & Mongoose", category: "Database", level: 90, icon: "Database", order: 15 },
        { name: "PostgreSQL", category: "Database", level: 84, icon: "Database", order: 16 },
        { name: "Vector DBs (Chroma/Pinecone)", category: "Database", level: 80, icon: "Layers", order: 17 },

        // AI
        { name: "Gemini AI & LangGraph", category: "AI", level: 86, icon: "Bot", order: 18 },
        { name: "Hybrid RAG Systems", category: "AI", level: 85, icon: "Brain", order: 19 },
        { name: "Hugging Face APIs", category: "AI", level: 82, icon: "Cpu", order: 20 },

        // DevOps & Cloud
        { name: "Docker & Containerization", category: "DevOps", level: 82, icon: "Box", order: 21 },
        { name: "AWS EC2", category: "Cloud", level: 80, icon: "Cloud", order: 22 },
        { name: "Vercel & Render", category: "Cloud", level: 90, icon: "CloudUpload", order: 23 },

        // Tools
        { name: "Git & GitHub", category: "Tools", level: 92, icon: "GitBranch", order: 24 },
        { name: "Postman", category: "Tools", level: 90, icon: "Send", order: 25 },
        { name: "VS Code", category: "Tools", level: 95, icon: "Terminal", order: 26 },

        // Core Subjects
        { name: "Data Structures & Algorithms", category: "Core Subjects", level: 90, icon: "Binary", order: 27 },
        { name: "Object-Oriented Programming (OOP)", category: "Core Subjects", level: 92, icon: "Box", order: 28 },
        { name: "Operating Systems", category: "Core Subjects", level: 85, icon: "Monitor", order: 29 },
        { name: "Computer Networks", category: "Core Subjects", level: 84, icon: "Wifi", order: 30 }
      ]);
      console.log("[Seed] Seeded initial Skills");
    }

    // 5. Seed Education & Experience if none exists
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.create({
        degree: "Bachelor of Technology in Computer Science & Engineering",
        institution: "K.R. Mangalam University",
        period: "2023 - 2027",
        score: "CGPA 8.0 / 10",
        descriptionPoints: [
          "Specialized focus on Data Structures, Algorithms, Software Engineering, and AI Web Systems.",
          "Consistently built and deployed practical applications applying computer science core principles."
        ],
        order: 1
      });
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.create({
        title: "Full Stack Developer & AI System Developer",
        company: "Independent Projects & Open Source",
        location: "Remote / Gurugram",
        period: "2023 - Present",
        descriptionPoints: [
          "Architected DevBattles (AI Coding Assessment) with FastAPI microservices and sandboxed Docker code execution.",
          "Built RepoLens (AI GitHub & Resume Analyzer) using MERN stack, Hugging Face AI, and indexed MongoDB database.",
          "Engineered Campus Learn RAG vector search engine for academic material semantic retrieval."
        ],
        tags: ["React", "Node.js", "FastAPI", "Docker", "RAG", "MongoDB"],
        order: 1
      });
    }

    // 6. Seed Certificates
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.insertMany([
        {
          title: "Full Stack Web Development",
          issuer: "Udemy / Modern Web Mastery",
          issueDate: "2024",
          credentialUrl: "https://github.com/adi318krmu",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
          tags: ["React", "Node.js", "MongoDB"],
          order: 1
        },
        {
          title: "Data Structures & Algorithms in C++",
          issuer: "Coding Assessment Platform",
          issueDate: "2024",
          credentialUrl: "https://github.com/adi318krmu",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
          tags: ["C++", "Algorithms", "Problem Solving"],
          order: 2
        }
      ]);
    }

    // 7. Seed Resume
    const resumeCount = await Resume.countDocuments();
    if (resumeCount === 0) {
      await Resume.create({
        title: "Aditya Singh Resume",
        pdfUrl: "/resume.pdf"
      });
    }

    // 8. Seed Blog
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        {
          title: "Building Microservices Code Runners with Docker & FastAPI",
          slug: "building-microservices-code-runners",
          summary: "How I engineered sub-second sandboxed code execution in DevBattles using Docker containers, FastAPI, and Node.js.",
          content: `### Introduction\nExecuting untrusted user code safely is one of the most challenging problems in building coding assessment platforms. In this post, I break down how **DevBattles** uses Docker, FastAPI, and Node.js microservices.\n\n### System Architecture\n1. **API Router (Node.js)**: Validates user requests and queues evaluation jobs.\n2. **Execution Worker (FastAPI)**: Spawns ephemeral Docker containers with CPU/memory caps.\n3. **AI Evaluator (Gemini AI & LangGraph)**: Analyzes time complexity, memory profiling, and code readability.\n\n\`\`\`python\n# Isolated code runner snippet\ndef run_in_sandbox(code: str, language: str):\n    # Spawn container with strict timeout\n    return container.exec_run(cmd, timeout=5)\n\`\`\`\n\n### Key Lessons Learned\n- Always enforce memory boundaries to prevent fork bombs.\n- Use streaming stdout/stderr to give users instant feedback.`,
          coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
          tags: ["Microservices", "Docker", "FastAPI", "Python"],
          readTime: "4 min read",
          published: true
        },
        {
          title: "Designing a Hybrid RAG Assistant with Vector Search",
          slug: "designing-hybrid-rag-assistant",
          summary: "Combining BM25 keyword matching with dense vector embeddings to achieve 35% higher response accuracy on academic notes.",
          content: `### Why Pure Vector Search Fails for Textbooks\nStandard vector search often misses exact keyword references such as specific course codes or formula names. In **Campus Learn**, we combined BM25 keyword ranking with vector embeddings.\n\n### The Hybrid Pipeline\n- **Step 1**: Text extraction and chunking.\n- **Step 2**: Embedding into Vector DB.\n- **Step 3**: Reciprocal Rank Fusion (RRF) combining dense & sparse scores.\n\n\`\`\`javascript\nconst score = alpha * denseScore + (1 - alpha) * bm25Score;\n\`\`\`\n\nThis hybrid approach dramatically reduced hallucinations!`,
          coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
          tags: ["AI", "RAG", "Vector DB", "Python"],
          readTime: "5 min read",
          published: true
        }
      ]);
    }

    console.log("[Seed] Database seeding completed successfully!");
  } catch (error) {
    console.error("[Seed Error]", error);
  }
};
