import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Settings, Globe, CheckCircle2 } from "lucide-react";

export const WebsiteSettingsManager: React.FC = () => {
  const { settings, refetchData } = usePortfolio();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    github: "",
    linkedin: "",
    leetcode: "",
    codeforces: "",
    codechef: "",
    geeksforgeeks: "",
    email: "",
    phone: "",
    location: "",
    seoTitle: "",
    seoDescription: ""
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        github: settings.socialLinks?.github || "",
        linkedin: settings.socialLinks?.linkedin || "",
        leetcode: settings.socialLinks?.leetcode || "",
        codeforces: settings.socialLinks?.codeforces || "",
        codechef: settings.socialLinks?.codechef || "",
        geeksforgeeks: settings.socialLinks?.geeksforgeeks || "",
        email: settings.socialLinks?.email || "",
        phone: settings.socialLinks?.phone || "",
        location: settings.socialLinks?.location || "",
        seoTitle: settings.seo?.title || "",
        seoDescription: settings.seo?.description || ""
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const payload = {
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        leetcode: formData.leetcode,
        codeforces: formData.codeforces,
        codechef: formData.codechef,
        geeksforgeeks: formData.geeksforgeeks,
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      },
      seo: {
        title: formData.seoTitle,
        description: formData.seoDescription
      }
    };

    try {
      const res = await AdminAPI.updateSettings(payload);
      if (res.success) {
        setSuccessMsg("Social links & SEO settings saved live!");
        refetchData();
      }
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Social Links & SEO Settings</h1>
        <p className="text-xs text-zinc-400">Configure coding platform handles, footer links, and meta search tags.</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-indigo-400 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Coding & Social Platforms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">GitHub URL</label>
              <input type="url" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">LinkedIn URL</label>
              <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">LeetCode URL</label>
              <input type="url" value={formData.leetcode} onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Codeforces URL</label>
              <input type="url" value={formData.codeforces} onChange={(e) => setFormData({ ...formData, codeforces: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">CodeChef URL</label>
              <input type="url" value={formData.codechef} onChange={(e) => setFormData({ ...formData, codechef: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">GeeksforGeeks URL</label>
              <input type="url" value={formData.geeksforgeeks} onChange={(e) => setFormData({ ...formData, geeksforgeeks: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Public Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Phone</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-purple-400 flex items-center gap-2">
            <Settings className="w-4 h-4" /> SEO Search Engine Optimization
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300">Page Meta Title</label>
              <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300">Meta Description</label>
              <textarea rows={2} value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg">
          {loading ? "Saving..." : "Save Website Settings"}
        </button>
      </form>
    </div>
  );
};
