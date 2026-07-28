import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { PublicAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";

export const ContactSection: React.FC = () => {
  const { settings } = usePortfolio();

  const socialLinks = settings?.socialLinks || {
    email: "adityaks0604@gmail.com",
    phone: "+91 9876543210",
    location: "Gurugram, India"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "$1,000 - $3,000",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await PublicAPI.submitContact(formData);
      if (res.success) {
        setSuccessMsg(res.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          budget: "$1,000 - $3,000",
          message: ""
        });
        
        // Trigger celebratory confetti effect
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(res.message || "Failed to submit inquiry.");
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Let's Build <span className="text-gradient">Something Remarkable</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Whether you have an engineering role, freelance project, or collaboration in mind, reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col justify-between space-y-6"
        >
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Information</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Feel free to send a message using the form or connect directly through email and professional networks.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/40 text-zinc-200 hover:text-white transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Email</div>
                  <div className="text-xs sm:text-sm font-semibold">{socialLinks.email}</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-zinc-200">
                <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Phone</div>
                  <div className="text-xs sm:text-sm font-semibold">{socialLinks.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-zinc-200">
                <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Location</div>
                  <div className="text-xs sm:text-sm font-semibold">{socialLinks.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-zinc-300 font-medium">
              Average response time: <span className="text-white font-bold">Under 6 Hours</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Glassmorphism Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Send Direct Inquiry</h3>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder:text-zinc-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder:text-zinc-500"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder:text-zinc-500"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Company / Organization</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Budget Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Project Budget / Scope</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm bg-[#0a0d16] text-white"
              >
                <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                <option value="Internship / Co-op Opportunity">Internship / Co-op Opportunity</option>
                <option value="$500 - $1,000">$500 - $1,000 (Small Project / API)</option>
                <option value="$1,000 - $3,000">$1,000 - $3,000 (MERN App / Custom CMS)</option>
                <option value="$3,000+">$3,000+ (Full Web Product & AI RAG Integration)</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your project, role, or inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder:text-zinc-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};
