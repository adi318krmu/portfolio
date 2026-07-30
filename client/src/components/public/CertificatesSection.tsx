import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, Eye, X, CheckCircle2 } from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  tags: string[];
  description: string;
}

const REAL_CERTIFICATES: CertificateItem[] = [
  {
    id: "oracle-ai",
    title: "Oracle AI Foundations Associate",
    issuer: "Oracle University",
    issueDate: "2024",
    credentialUrl: "https://github.com/adi318krmu",
    tags: ["Artificial Intelligence", "Machine Learning", "Generative AI", "Oracle Cloud AI"],
    description: "Certified in core AI concepts, machine learning algorithms, deep learning fundamentals, and Oracle Cloud AI infrastructure service capabilities."
  },
  {
    id: "gssoc",
    title: "GirlScript Summer of Code (GSSOC) Contributor",
    issuer: "GirlScript Foundation",
    issueDate: "2024",
    credentialUrl: "https://github.com/adi318krmu",
    tags: ["Open Source", "Git & GitHub", "React", "Node.js", "Collaboration"],
    description: "Active open-source contributor participating in global development sprints, submitting pull requests, resolving issues, and reviewing peer code."
  }
];

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Verified Certifications</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Certificates & <span className="text-gradient">Credentials</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Authentic technical achievements and open-source contributions.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REAL_CERTIFICATES.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-white/10 glass-card-hover flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> Verified Issuer: {cert.issuer}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{cert.issueDate}</span>
              </div>

              <h3 className="text-xl font-bold text-white">{cert.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{cert.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.tags.map((t, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 bg-white/5 border border-white/5 text-[11px] text-zinc-300 rounded-md font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedCert(cert)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>View Details</span>
              </button>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verify Credential</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-lg w-full bg-[#0c101c] p-6 rounded-3xl border border-white/15 space-y-4">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
              aria-label="Close Certificate Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Certificate</span>
            </div>

            <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
            <div className="text-xs text-zinc-400">Issuer: {selectedCert.issuer} • Issued {selectedCert.issueDate}</div>
            
            <p className="text-xs text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
              {selectedCert.description}
            </p>

            <div className="pt-2 flex justify-end">
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify Online</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
