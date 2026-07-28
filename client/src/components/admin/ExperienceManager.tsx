import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Experience } from "../../types";
import { Plus, Trash2, Edit3, Briefcase } from "lucide-react";

export const ExperienceManager: React.FC = () => {
  const { refetchData } = usePortfolio();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    period: "",
    pointsInput: "",
    tagsInput: ""
  });

  const fetchExperiences = async () => {
    try {
      const res = await AdminAPI.getExperiences();
      if (res.success) setExperiences(res.experiences || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({ title: "", company: "", location: "", period: "", pointsInput: "", tagsInput: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location || "",
      period: exp.period,
      pointsInput: exp.descriptionPoints ? exp.descriptionPoints.join("\n") : "",
      tagsInput: exp.tags ? exp.tags.join(", ") : ""
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const points = formData.pointsInput.split("\n").map((p) => p.trim()).filter(Boolean);
    const tags = formData.tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      period: formData.period,
      descriptionPoints: points,
      tags
    };

    try {
      if (editingExp && editingExp._id) {
        await AdminAPI.updateExperience(editingExp._id, payload);
      } else {
        await AdminAPI.createExperience(payload);
      }
      setShowModal(false);
      fetchExperiences();
      refetchData();
    } catch (err) {
      alert("Failed to save experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete experience entry?")) return;
    try {
      await AdminAPI.deleteExperience(id);
      fetchExperiences();
      refetchData();
    } catch (err) {
      alert("Error deleting experience");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Experience</h1>
          <p className="text-xs text-zinc-400">Professional roles and development history.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{exp.title}</h3>
              <p className="text-xs text-indigo-400 font-medium">{exp.company} • {exp.period}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenEdit(exp)} className="p-2 text-zinc-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(exp._id!)} className="p-2 text-rose-400 hover:text-rose-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0c101c] border border-white/15 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">{editingExp ? "Edit Experience" : "Add Experience"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required placeholder="Role Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="text" required placeholder="Company Name *" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="text" placeholder="Period (e.g. 2023 - Present) *" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <textarea placeholder="Description Points (1 per line)" rows={3} value={formData.pointsInput} onChange={(e) => setFormData({ ...formData, pointsInput: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs font-mono" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/5 text-xs text-zinc-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-xs font-bold text-white rounded-xl">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
