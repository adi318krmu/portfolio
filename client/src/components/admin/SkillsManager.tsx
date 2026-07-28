import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Skill } from "../../types";
import { Plus, Trash2, Edit3, Eye, EyeOff, Code2 } from "lucide-react";

const CATEGORIES = [
  "Programming",
  "Frontend",
  "Backend",
  "Database",
  "AI",
  "DevOps",
  "Cloud",
  "Tools",
  "Core Subjects"
];

export const SkillsManager: React.FC = () => {
  const { refetchData } = usePortfolio();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Programming",
    level: 85,
    icon: "Code",
    hidden: false,
    order: 0
  });

  const fetchSkills = async () => {
    try {
      const res = await AdminAPI.getSkills();
      if (res.success) setSkills(res.skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "Programming",
      level: 85,
      icon: "Code",
      hidden: false,
      order: skills.length + 1
    });
    setShowModal(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level || 85,
      icon: skill.icon || "Code",
      hidden: skill.hidden || false,
      order: skill.order || 0
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill && editingSkill._id) {
        await AdminAPI.updateSkill(editingSkill._id, formData);
      } else {
        await AdminAPI.createSkill(formData);
      }
      setShowModal(false);
      fetchSkills();
      refetchData();
    } catch (err) {
      alert("Error saving skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await AdminAPI.deleteSkill(id);
      fetchSkills();
      refetchData();
    } catch (err) {
      alert("Error deleting skill");
    }
  };

  const toggleHide = async (skill: Skill) => {
    if (!skill._id) return;
    try {
      await AdminAPI.updateSkill(skill._id, { hidden: !skill.hidden });
      fetchSkills();
      refetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Skills</h1>
          <p className="text-xs text-zinc-400">Database skills matrix with instant portfolio synchronization.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="glass-card p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{skill.name}</span>
                {skill.hidden && <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded">Hidden</span>}
              </div>
              <div className="text-[10px] text-indigo-400 font-mono">{skill.category} • {skill.level}%</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleHide(skill)} className="p-1.5 text-zinc-400 hover:text-white">
                {skill.hidden ? <EyeOff className="w-4 h-4 text-rose-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
              </button>
              <button onClick={() => handleOpenEdit(skill)} className="p-1.5 text-zinc-400 hover:text-white">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(skill._id!)} className="p-1.5 text-rose-400 hover:text-rose-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0c101c] border border-white/15 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">{editingSkill ? "Edit Skill" : "Add Skill"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl glass-input text-xs bg-[#0a0d16]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-300">
                  <span>Proficiency Level</span>
                  <span className="text-indigo-400">{formData.level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/5 text-xs text-zinc-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-xs font-bold text-white rounded-xl">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
