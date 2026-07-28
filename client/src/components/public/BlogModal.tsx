import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, Tag, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Blog } from "../../types";

interface BlogModalProps {
  blog: Blog | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c101c] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto z-10 p-6 sm:p-10 space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3 pr-10">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {blog.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                {blog.views || 1} Reads
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{blog.title}</h1>
            <p className="text-zinc-300 text-sm sm:text-base italic border-l-2 border-indigo-500 pl-3">
              {blog.summary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags?.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono rounded-lg flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {t}
                </span>
              ))}
            </div>
          </div>

          {blog.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-80 bg-zinc-900">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Markdown Render Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-white/10">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
