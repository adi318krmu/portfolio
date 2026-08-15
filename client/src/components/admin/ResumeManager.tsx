import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { FileText, Upload, CheckCircle2, ExternalLink } from "lucide-react";

export const ResumeManager: React.FC = () => {
  const { resumeUrl, refetchData } = usePortfolio();
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [currentUrl, setCurrentUrl] = useState(resumeUrl);

  useEffect(() => {
    setCurrentUrl(resumeUrl);
  }, [resumeUrl]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true);
    setSuccessMsg("");

    try {
      const res = await AdminAPI.uploadResume(formData);
      if (res.success && res.resume) {
        let pdf = res.resume.pdfUrl;
        if (pdf.startsWith("/uploads/")) {
          const apiBase = import.meta.env.VITE_API_URL || "";
          pdf = `${apiBase.replace(/\/$/, "")}${pdf}`;
        }
        setCurrentUrl(pdf);
        setSuccessMsg("Latest PDF Resume uploaded successfully! Old version replaced.");
        await refetchData();
      }
    } catch (err) {
      alert("Resume upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Resume Manager</h1>
        <p className="text-xs text-zinc-400">
          Upload and replace your PDF resume. Visitors will instantly download this latest version.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Current Active Resume</h3>
            <p className="text-xs text-zinc-400 font-mono truncate max-w-md">{currentUrl}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-xl flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Preview Active Resume PDF</span>
          </a>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <label className="text-xs font-bold text-white block">Upload New Resume File (PDF)</label>
          <div className="border-2 border-dashed border-white/15 hover:border-indigo-500/50 rounded-2xl p-8 text-center space-y-3 transition-colors cursor-pointer relative bg-white/5">
            <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
            <div className="text-xs text-zinc-300">
              <span className="font-bold text-indigo-400">Click to select PDF file</span> or drag & drop here
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">Maximum file size: 10MB</div>
            <input
              type="file"
              accept="application/pdf"
              disabled={uploading}
              onChange={handleResumeUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {uploading && <div className="text-xs text-indigo-400 font-mono">Uploading PDF resume to server...</div>}
        </div>
      </div>
    </div>
  );
};
