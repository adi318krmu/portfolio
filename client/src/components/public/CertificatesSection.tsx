import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, Eye, X } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Certificate } from "../../types";

export const CertificatesSection: React.FC = () => {
  const { certificates } = usePortfolio();
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Verified Qualifications</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Certificates & <span className="text-gradient">Credentials</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Industry achievements and technical certifications stored securely in database.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert._id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-white/10 glass-card-hover flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Verified Issuer: {cert.issuer}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{cert.title}</h3>
              <p className="text-xs text-zinc-400">Issued: {cert.issueDate}</p>

              {cert.tags && cert.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 bg-white/5 border border-white/5 text-[10px] text-zinc-300 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {cert.image && (
                <button
                  onClick={() => setPreviewCert(cert)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold rounded-xl border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Preview</span>
                </button>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-[#0c101c] p-4 rounded-3xl border border-white/15 overflow-hidden">
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewCert.image}
              alt={previewCert.title}
              className="w-full h-auto rounded-2xl max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
