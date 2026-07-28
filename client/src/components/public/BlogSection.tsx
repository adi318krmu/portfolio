import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Blog } from "../../types";
import { BlogModal } from "./BlogModal";

export const BlogSection: React.FC = () => {
  const { blogs } = usePortfolio();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Writings</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Engineering & <span className="text-gradient">Architecture Insights</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Articles on microservices, AI system design, vector search, and software optimization.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog, idx) => (
          <motion.div
            key={blog._id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            onClick={() => setSelectedBlog(blog)}
            className="glass-card p-6 rounded-3xl border border-white/10 glass-card-hover cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {blog.readTime}
                </span>
                <span>Blog Post</span>
              </div>

              <h3 className="text-xl font-bold text-white hover:text-indigo-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                {blog.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {blog.tags?.slice(0, 3).map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-white/5 text-[10px] text-zinc-300 rounded font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </section>
  );
};
