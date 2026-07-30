export interface DetailedProject {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problemStatement: string;
  solution: string;
  features: string[];
  challenges: string;
  architecture: string;
  futureImprovements: string[];
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  gallery: {
    title: string;
    caption: string;
    type: "code" | "dashboard" | "analytics" | "rag";
  }[];
}

export const DETAILED_PROJECTS: DetailedProject[] = [
  {
    id: "devbattles",
    title: "DevBattles – AI Coding Assessment Platform",
    slug: "devbattles",
    summary: "Full-stack AI platform supporting teacher-managed coding contests, live code execution in isolated containers, and automated LLM-driven evaluation.",
    problemStatement: "Traditional coding platforms lack automated, context-aware feedback on code quality, runtime complexity, and edge-case failures during student contests.",
    solution: "Engineered an end-to-end platform using Node.js, Express, FastAPI, React, and Supabase PostgreSQL. Integrated Docker for isolated code execution and Google Gemini + LangGraph for real-time AI code review.",
    features: [
      "Teacher contest creation & live student portal",
      "Automated multi-language code evaluation in Docker",
      "Google Gemini & LangGraph AI code analysis",
      "PostgreSQL (Supabase) DB with JWT role authorization",
      "Live contest leaderboards & score tracking",
      "Deployed on AWS EC2 with NGINX & PM2"
    ],
    challenges: "Achieving sub-second code evaluation in isolated Docker containers while preventing infinite loops, memory leaks, and managing concurrent WebSocket updates.",
    architecture: "Microservices Architecture: React UI -> Node.js API Gateway -> Supabase PostgreSQL DB -> FastAPI Docker Worker Service -> Gemini AI & LangGraph pipeline.",
    futureImprovements: [
      "AST-based code plagiarism detection module",
      "AI automated test-case generator from problem descriptions",
      "Real-time 1v1 multiplayer coding battle rooms"
    ],
    stack: ["React", "Node.js", "Express.js", "FastAPI", "PostgreSQL", "Supabase", "Docker", "AWS EC2", "Gemini AI", "LangGraph"],
    githubUrl: "https://github.com/adi318krmu/DevBattles",
    liveUrl: "https://devbattles.vercel.app",
    featured: true,
    gallery: [
      {
        title: "Live Contest Workspace & Code Editor",
        caption: "Multi-language editor featuring syntax highlighting, custom testcase execution, and real-time AI code feedback.",
        type: "code"
      },
      {
        title: "Teacher Contest Management Dashboard",
        caption: "Contest creation panel, problem statement authoring, memory limit configurations, and student participation metrics.",
        type: "dashboard"
      },
      {
        title: "LangGraph AI Feedback & Evaluation Breakdown",
        caption: "Automated analysis of time complexity, memory footprint, edge-case coverage, and code refactoring suggestions.",
        type: "analytics"
      }
    ]
  },
  {
    id: "repolens",
    title: "RepoLens – AI Resume & GitHub Analyzer",
    slug: "repolens",
    summary: "AI-powered application analyzing PDF resumes and GitHub repositories against 10+ job roles using Hugging Face inference models.",
    problemStatement: "Job seekers struggle to evaluate how effectively their GitHub portfolio and resume align with specific engineering job requirements.",
    solution: "Developed a full-stack application that parses multi-page PDF resumes, inspects GitHub repositories via REST API, and computes role-readiness scores using Hugging Face AI models.",
    features: [
      "Analyzes PDF resumes & GitHub repos against 10+ job roles",
      "Scans commit frequency, repo stars, language breakdown, and README quality",
      "Hugging Face AI inference integration for candidate scoring",
      "Secure REST APIs with Node.js, Express, MongoDB, JWT & bcrypt",
      "Rate-limited endpoints supporting 100+ API requests/minute"
    ],
    challenges: "Parsing non-standard PDF resume structures reliably and aggregating weighted GitHub repository scores without triggering rate limits.",
    architecture: "REST API Architecture: React UI -> Express.js API -> GitHub REST API scanner -> Hugging Face AI Inference Engine -> MongoDB analytics datastore.",
    futureImprovements: [
      "Automated resume bullet-point generator optimized for ATS scanners",
      "Repository code quality & security vulnerability scanner",
      "Side-by-side candidate comparison matrix for recruiters"
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "Hugging Face API", "TailwindCSS"],
    githubUrl: "https://github.com/adi318krmu/RepoLens",
    liveUrl: "https://repo-lens.vercel.app",
    featured: true,
    gallery: [
      {
        title: "Candidate Role Matching Dashboard",
        caption: "Visual scoring system assessing candidate readiness across Frontend, Backend, DevOps, and Data roles.",
        type: "dashboard"
      },
      {
        title: "GitHub Repository Inspection & Commit Analytics",
        caption: "Detailed breakdown of language distribution, commit frequency, documentation quality, and code metrics.",
        type: "analytics"
      },
      {
        title: "PDF Resume Parser & AI Feedback Engine",
        caption: "Extracted skill matrices, missing keywords analysis, and actionable resume optimization suggestions.",
        type: "code"
      }
    ]
  },
  {
    id: "campus-learn",
    title: "Campus Learn – Hybrid RAG Academic Assistant",
    slug: "campus-learn",
    summary: "Hybrid RAG study assistant enabling university students to search and query syllabus-aligned answers over faculty lecture notes.",
    problemStatement: "Generic AI chatbots hallucinate or provide out-of-syllabus answers when students ask specific questions about university course materials.",
    solution: "Engineered a Hybrid RAG assistant indexing 100+ academic PDFs into vector embeddings, combining keyword search and semantic vector retrieval for 35% higher accuracy.",
    features: [
      "Hybrid RAG search over faculty-uploaded lecture notes & syllabus documents",
      "Vector embeddings indexing over 100+ course PDFs",
      "35% improvement in answer accuracy over baseline LLM responses",
      "Page citation rendering pointing directly to source lecture slides",
      "Student query history and bookmarking portal"
    ],
    challenges: "Efficiently chunking dense academic slides and mathematical formulas without losing document hierarchy or context.",
    architecture: "Hybrid RAG Pipeline: React Frontend -> Node.js API -> Python Vector Database Service -> Hybrid Keyword + Semantic Search -> Gemini Synthesis.",
    futureImprovements: [
      "Multi-modal PDF diagram and chart extraction",
      "AI-generated flashcards and self-assessment quizzes from lecture notes",
      "Collaborative study group spaces with shared document context"
    ],
    stack: ["React", "Node.js", "Python", "Vector DB", "Hybrid RAG", "MongoDB", "TailwindCSS"],
    githubUrl: "https://github.com/adi318krmu/Campus-Learn",
    liveUrl: "https://campus-learn-lms-zqft.vercel.app",
    featured: true,
    gallery: [
      {
        title: "Syllabus Query & Interactive Q&A Interface",
        caption: "Natural language query bar delivering grounded answers with direct citations to faculty slides.",
        type: "rag"
      },
      {
        title: "Document Indexing & Vector Search Inspector",
        caption: "Real-time index monitor showing chunked PDF documents, embedding vectors, and relevance scores.",
        type: "analytics"
      },
      {
        title: "Course Notes Portal & Slide Viewer",
        caption: "Course catalog organized by subject, unit, and semester with inline document preview.",
        type: "dashboard"
      }
    ]
  }
];
