import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { User, Sparkles, Upload, CheckCircle2 } from "lucide-react";

export const HeroAboutManager: React.FC = () => {
  const { settings, refetchData } = usePortfolio();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    heroName: "",
    heroSubtitle: "",
    typingText: "",
    availability: "",
    profileImage: "",
    aboutBio: "",
    aboutJourney: "",
    strengths: "",
    achievements: ""
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        heroName: settings.hero?.name || "Aditya Singh",
        heroSubtitle: settings.hero?.subtitle || "",
        typingText: settings.hero?.typingText ? settings.hero.typingText.join("\n") : "",
        availability: settings.hero?.availability || "",
        profileImage: settings.hero?.profileImage || "",
        aboutBio: settings.about?.bio || "",
        aboutJourney: settings.about?.journey || "",
        strengths: settings.about?.strengths ? settings.about.strengths.join("\n") : "",
        achievements: settings.about?.achievements ? settings.about.achievements.join("\n") : ""
      });
    }
  }, [settings]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const data = new FormData();
    data.append("file", e.target.files[0]);
    try {
      const res = await AdminAPI.uploadFile(data);
      if (res.success) {
        setFormData((prev) => ({ ...prev, profileImage: res.url }));
      }
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const typingArr = formData.typingText.split("\n").map((t) => t.trim()).filter(Boolean);
    const strengthsArr = formData.strengths.split("\n").map((s) => s.trim()).filter(Boolean);
    const achievementsArr = formData.achievements.split("\n").map((a) => a.trim()).filter(Boolean);

    const payload = {
      hero: {
        name: formData.heroName,
        subtitle: formData.heroSubtitle,
        typingText: typingArr,
        availability: formData.availability,
        profileImage: formData.profileImage
      },
      about: {
        bio: formData.aboutBio,
        journey: formData.aboutJourney,
        strengths: strengthsArr,
        achievements: achievementsArr
      }
    };

    try {
      const res = await AdminAPI.updateSettings(payload);
      if (res.success) {
        setSuccessMsg("Hero & About section details updated live!");
        refetchData();
      }
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Hero & About Section Content</h1>
        <p className="text-xs text-zinc-400">Edit hero badges, typing text animations, bio, and achievements.</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HERO SECTION SETTINGS */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-indigo-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Hero Section Fields
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Name</label>
              <input
                type="text"
                value={formData.heroName}
                onChange={(e) => setFormData({ ...formData, heroName: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Subtitle</label>
              <input
                type="text"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Availability Status Badge</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full p-3 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Typing Text Animation Phrases (1 per line)</label>
            <textarea
              rows={3}
              value={formData.typingText}
              onChange={(e) => setFormData({ ...formData, typingText: e.target.value })}
              className="w-full p-3 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Profile Image URL or Upload</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                className="flex-1 p-3 rounded-xl glass-input text-xs"
              />
              <label className="px-4 py-3 bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION SETTINGS */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-purple-400 flex items-center gap-2">
            <User className="w-4 h-4" /> About Section Fields
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Bio Overview</label>
            <textarea
              rows={3}
              value={formData.aboutBio}
              onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
              className="w-full p-3 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Journey Narrative</label>
            <textarea
              rows={3}
              value={formData.aboutJourney}
              onChange={(e) => setFormData({ ...formData, aboutJourney: e.target.value })}
              className="w-full p-3 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Engineering Strengths (1 per line)</label>
              <textarea
                rows={4}
                value={formData.strengths}
                onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Key Achievements (1 per line)</label>
              <textarea
                rows={4}
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                className="w-full p-3 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30"
        >
          {loading ? "Saving Settings..." : "Save All Live Changes"}
        </button>
      </form>
    </div>
  );
};
