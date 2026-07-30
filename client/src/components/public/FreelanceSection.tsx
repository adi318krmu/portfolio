import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Code, Server, Bot, Layout, Terminal, Database, Cpu, ArrowRight } from "lucide-react";

const CAPABILITIES = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application engineering from responsive React components to Node.js / Express backend services and database schemas.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    icon: <Code className="w-5 h-5 text-indigo-400" />
  },
  {
    title: "Backend & Microservice APIs",
    description: "Designing RESTful API endpoints with secure JWT authentication, role-based authorization, request validation, and error handling.",
    tech: ["Node.js", "Express.js", "FastAPI", "PostgreSQL", "MongoDB", "REST APIs"],
    icon: <Server className="w-5 h-5 text-emerald-400" />
  },
  {
    title: "AI Product Integration",
    description: "Integrating Gemini AI models, LangGraph evaluation loops, and Hugging Face inference APIs into full-stack web applications.",
    tech: ["Gemini AI", "LangGraph", "Hugging Face API", "Python", "FastAPI"],
    icon: <Bot className="w-5 h-5 text-purple-400" />
  },
  {
    title: "Database Architecture",
    description: "Relational and NoSQL database modeling, Mongoose aggregation pipelines, indexing, and Supabase / PostgreSQL integration.",
    tech: ["MongoDB", "PostgreSQL", "Supabase", "MySQL", "Mongoose"],
    icon: <Database className="w-5 h-5 text-blue-400" />
  },
  {
    title: "Developer Tools & Automation",
    description: "Building automated analysis engines, repository scanners, code evaluation workflows, and CI/CD deployment pipelines.",
    tech: ["Docker", "AWS EC2", "NGINX", "GitHub Actions", "Python"],
    icon: <Terminal className="w-5 h-5 text-amber-400" />
  },
  {
    title: "Clean UI & User Experience",
    description: "Crafting modern, accessible, and responsive user interfaces with glassmorphism aesthetics and smooth Framer Motion animations.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    icon: <Layout className="w-5 h-5 text-pink-400" />
  }
];

export const FreelanceSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="freelance" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Engineering Focus</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Services & Technical <span className="text-gradient">Capabilities</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          What I bring to software engineering teams, internships, and full-stack product development.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPABILITIES.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="glass-card p-6 rounded-3xl border border-white/10 glass-card-hover flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-white">{service.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{service.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1">
                {service.tech.map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-white/5 border border-white/5 text-[10px] text-zinc-300 font-mono rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main CTA Banner */}
      <div className="mt-12 glass-card p-8 rounded-3xl border border-indigo-500/30 text-center space-y-4 bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-indigo-950/40">
        <h3 className="text-2xl font-bold text-white">Looking for a motivated Software Engineer?</h3>
        <p className="text-sm text-zinc-300 max-w-xl mx-auto">
          I am actively open to full-time software engineering roles and internship opportunities where I can add value and continue growing.
        </p>
        <button
          onClick={scrollToContact}
          className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
