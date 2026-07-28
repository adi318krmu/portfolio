import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Education } from "../../types";
import { Plus, Trash2, Edit3, GraduationCap } from "lucide-react";

export const EducationManager: React.FC = () => {
  const { refetchData } = usePortfolio();
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    score: "",
    pointsInput: ""
  });

  const fetchEducation = async () => {
    try {
      const res = await AdminAPI.getEducation();
      if (res.success) setEducationList(res.education || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({ degree: "", institution: "", period: "", score: "", pointsInput: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      score: edu.score || "",
      pointsInput: edu.descriptionPoints ? edu.descriptionPoints.join("\n") : ""
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const points = formData.pointsInput.split("\n").map((p) => p.trim()).filter(Boolean);

    const payload = {
      degree: formData.degree,
      institution: formData.institution,
      period: formData.period,
      score: formData.score,
      descriptionPoints: points
    };

    try {
      if (editingEdu && editingEdu._id) {
        await AdminAPI.updateEducation(editingEdu._id, payload);
      } else {
        await AdminAPI.createEducation(payload);
      }
      setShowModal(false);
      fetchEducation();
      refetchData();
    } catch (err) {
      alert("Failed to save education");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete education entry?")) return;
    try {
      await AdminAPI.deleteEducation(id);
      fetchEducation();
      refetchData();
    } catch (err) {
      alert("Error deleting education");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Education</h1>
          <p className="text-xs text-zinc-400">Academic degrees, GPA, and university highlights.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {educationList.map((edu) => (
          <div key={edu._id} className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{edu.degree}</h3>
              <p className="text-xs text-purple-400 font-medium">{edu.institution} ({edu.period}) • {edu.score}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenEdit(edu)} className="p-2 text-zinc-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(edu._id!)} className="p-2 text-rose-400 hover:text-rose-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0c101c] border border-white/15 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">{editingEdu ? "Edit Education" : "Add Education"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required placeholder="Degree Name *" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="text" required placeholder="Institution *" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" required placeholder="Period (2023 - 2027) *" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
                <input type="text" placeholder="Score / CGPA" value={formData.score} onChange={(e) => setFormData({ ...formData, score: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              </div>
              <textarea placeholder="Highlights (1 per line)" rows={3} value={formData.pointsInput} onChange={(e) => setFormData({ ...formData, pointsInput: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs font-mono" />
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
