import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Project } from "../../types";
import { Plus, Trash2, Edit3, Eye, EyeOff, Star, Upload, Check, X, FolderGit2 } from "lucide-react";

export const ProjectsManager: React.FC = () => {
  const { refetchData } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    architecture: "",
    challenges: "",
    stackInput: "",
    featuresInput: "",
    thumbnail: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    visible: true,
    order: 0
  });

  const fetchProjects = async () => {
    try {
      const res = await AdminAPI.getProjects();
      if (res.success) setProjects(res.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      summary: "",
      description: "",
      architecture: "",
      challenges: "",
      stackInput: "",
      featuresInput: "",
      thumbnail: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      visible: true,
      order: projects.length + 1
    });
    setShowModal(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      summary: project.summary,
      description: project.description || "",
      architecture: project.architecture || "",
      challenges: project.challenges || "",
      stackInput: project.stack ? project.stack.join(", ") : "",
      featuresInput: project.features ? project.features.join("\n") : "",
      thumbnail: project.thumbnail || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
      visible: project.visible,
      order: project.order || 0
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await AdminAPI.uploadFile(data);
      if (res.success) {
        setFormData((prev) => ({ ...prev, thumbnail: res.url }));
      }
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stack = formData.stackInput.split(",").map((s) => s.trim()).filter(Boolean);
    const features = formData.featuresInput.split("\n").map((f) => f.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      summary: formData.summary,
      description: formData.description,
      architecture: formData.architecture,
      challenges: formData.challenges,
      stack,
      features,
      thumbnail: formData.thumbnail,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      featured: formData.featured,
      visible: formData.visible,
      order: formData.order
    };

    try {
      if (editingProject && editingProject._id) {
        await AdminAPI.updateProject(editingProject._id, payload);
      } else {
        await AdminAPI.createProject(payload);
      }
      setShowModal(false);
      fetchProjects();
      refetchData();
    } catch (err) {
      alert("Error saving project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await AdminAPI.deleteProject(id);
      fetchProjects();
      refetchData();
    } catch (err) {
      alert("Error deleting project");
    }
  };

  const toggleVisibility = async (project: Project) => {
    if (!project._id) return;
    try {
      await AdminAPI.updateProject(project._id, { visible: !project.visible });
      fetchProjects();
      refetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (project: Project) => {
    if (!project._id) return;
    try {
      await AdminAPI.updateProject(project._id, { featured: !project.featured });
      fetchProjects();
      refetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Projects</h1>
          <p className="text-xs text-zinc-400">Add, edit, reorder, or toggle project visibility live.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={project.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"}
                alt={project.title}
                className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded">
                      Featured
                    </span>
                  )}
                  {!project.visible && (
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1">{project.summary}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.stack?.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white/5 text-[10px] text-zinc-300 font-mono rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
              <button
                onClick={() => toggleFeatured(project)}
                className={`p-2 rounded-xl border text-xs ${
                  project.featured ? "bg-amber-500/20 border-amber-500/40 text-amber-400" : "bg-white/5 border-white/10 text-zinc-400"
                }`}
                title="Toggle Featured Status"
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleVisibility(project)}
                className={`p-2 rounded-xl border text-xs ${
                  project.visible ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-rose-500/20 border-rose-500/40 text-rose-400"
                }`}
                title="Toggle Visitor Visibility"
              >
                {project.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleOpenEdit(project)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(project._id!)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0c101c] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Summary (Short Intro) *</label>
                <input
                  type="text"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, FastAPI, PostgreSQL, Docker"
                  value={formData.stackInput}
                  onChange={(e) => setFormData({ ...formData, stackInput: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">GitHub Link</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Live Demo Link</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Thumbnail Image URL or File Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 p-3 rounded-xl glass-input text-xs"
                  />
                  <label className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Upload File</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">System Architecture Breakdown</label>
                <textarea
                  rows={2}
                  value={formData.architecture}
                  onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Engineering Challenges & Solutions</label>
                <textarea
                  rows={2}
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Features List (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.featuresInput}
                  onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-indigo-600 bg-zinc-900 border-zinc-700"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    className="rounded text-indigo-600 bg-zinc-900 border-zinc-700"
                  />
                  <span>Visible to Visitors</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
