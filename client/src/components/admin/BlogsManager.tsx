import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Blog } from "../../types";
import { Plus, Trash2, Edit3, BookOpen, Upload } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const BlogsManager: React.FC = () => {
  const { refetchData } = usePortfolio();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    coverImage: "",
    tagsInput: "",
    readTime: "5 min read",
    published: true
  });

  const fetchBlogs = async () => {
    try {
      const res = await AdminAPI.getBlogs();
      if (res.success) setBlogs(res.blogs || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      summary: "",
      content: "### Heading\n\nWrite article in **Markdown**...",
      coverImage: "",
      tagsInput: "Architecture, AI, React",
      readTime: "5 min read",
      published: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      coverImage: blog.coverImage || "",
      tagsInput: blog.tags ? blog.tags.join(", ") : "",
      readTime: blog.readTime || "5 min read",
      published: blog.published
    });
    setShowModal(true);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const data = new FormData();
    data.append("file", e.target.files[0]);
    try {
      const res = await AdminAPI.uploadFile(data);
      if (res.success) setFormData((prev) => ({ ...prev, coverImage: res.url }));
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      coverImage: formData.coverImage,
      tags,
      readTime: formData.readTime,
      published: formData.published
    };

    try {
      if (editingBlog && editingBlog._id) {
        await AdminAPI.updateBlog(editingBlog._id, payload);
      } else {
        await AdminAPI.createBlog(payload);
      }
      setShowModal(false);
      fetchBlogs();
      refetchData();
    } catch (err) {
      alert("Failed to save blog post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete blog post?")) return;
    try {
      await AdminAPI.deleteBlog(id);
      fetchBlogs();
      refetchData();
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Blogs</h1>
          <p className="text-xs text-zinc-400">Markdown technical articles editor.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">{blog.title}</h3>
              <p className="text-xs text-zinc-400 font-mono">{blog.readTime} • {blog.views || 0} views</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenEdit(blog)} className="p-2 text-zinc-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(blog._id!)} className="p-2 text-rose-400 hover:text-rose-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#0c101c] border border-white/15 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white">{editingBlog ? "Edit Blog Post" : "Add Blog Post"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" required placeholder="Article Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              <input type="text" required placeholder="Short Summary *" value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Tags (comma separated)" value={formData.tagsInput} onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs font-mono" />
                <input type="text" placeholder="Read Time (e.g. 5 min read)" value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} className="w-full p-2.5 rounded-xl glass-input text-xs" />
              </div>

              {/* Markdown Content Editor */}
              <div className="space-y-1">
                <label className="text-xs text-zinc-300 font-semibold">Markdown Article Content</label>
                <textarea rows={8} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full p-3 rounded-xl glass-input text-xs font-mono" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-white/5 text-xs text-zinc-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-xs font-bold text-white rounded-xl">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
