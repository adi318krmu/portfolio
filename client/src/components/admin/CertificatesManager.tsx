import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Certificate } from "../../types";
import { Plus, Trash2, Edit3, Award, Upload } from "lucide-react";

export const CertificatesManager: React.FC = () => {
  const { refetchData } = usePortfolio();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialUrl: "",
    image: "",
    tagsInput: ""
  });

  const fetchCertificates = async () => {
    try {
      const res = await AdminAPI.getCertificates();
      if (res.success) setCertificates(res.certificates || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData({ title: "", issuer: "", issueDate: "", credentialUrl: "", image: "", tagsInput: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      credentialUrl: cert.credentialUrl || "",
      image: cert.image || "",
      tagsInput: cert.tags ? cert.tags.join(", ") : ""
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const data = new FormData();
    data.append("file", e.target.files[0]);
    try {
      const res = await AdminAPI.uploadFile(data);
      if (res.success) {
        setFormData((prev) => ({ ...prev, image: res.url }));
      }
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      issuer: formData.issuer,
      issueDate: formData.issueDate,
      credentialUrl: formData.credentialUrl,
      image: formData.image,
      tags
    };

    try {
      if (editingCert && editingCert._id) {
        await AdminAPI.updateCertificate(editingCert._id, payload);
      } else {
        await AdminAPI.createCertificate(payload);
      }
      setShowModal(false);
      fetchCertificates();
      refetchData();
    } catch (err) {
      alert("Failed to save certificate");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete certificate entry?")) return;
    try {
      await AdminAPI.deleteCertificate(id);
      fetchCertificates();
      refetchData();
    } catch (err) {
      alert("Error deleting certificate");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Certificates</h1>
          <p className="text-xs text-zinc-400">Verified credentials and completion badges.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div key={cert._id} className="glass-card p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">{cert.title}</h3>
              <p className="text-xs text-zinc-400">{cert.issuer} • {cert.issueDate}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenEdit(cert)} className="p-2 text-zinc-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(cert._id!)} className="p-2 text-rose-400 hover:text-rose-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0c101c] border border-white/15 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">{editingCert ? "Edit Certificate" : "Add Certificate"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required placeholder="Certificate Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="text" required placeholder="Issuer *" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="text" required placeholder="Issue Date (e.g. 2024) *" value={formData.issueDate} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="url" placeholder="Verification Link URL" value={formData.credentialUrl} onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              
              <div className="space-y-1">
                <label className="text-xs text-zinc-400">Preview Image URL or File</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="flex-1 p-2.5 rounded-xl glass-input text-xs" />
                  <label className="px-3 py-2 bg-white/5 border border-white/10 text-xs rounded-xl cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-indigo-400" />
                    <span>File</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/5 text-xs text-zinc-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-xs font-bold text-white rounded-xl">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
