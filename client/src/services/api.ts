import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api`
  : "/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach Authorization token if available in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const PublicAPI = {
  getPortfolioData: async () => {
    const res = await api.get("/public/portfolio");
    return res.data;
  },
  getBlogBySlug: async (slug: string) => {
    const res = await api.get(`/public/blogs/${slug}`);
    return res.data;
  },
  submitContact: async (data: any) => {
    const res = await api.post("/public/contact", data);
    return res.data;
  }
};

export const AuthAPI = {
  login: async (credentials: any) => {
    const res = await api.post("/auth/login", credentials);
    if (res.data.token) {
      localStorage.setItem("admin_token", res.data.token);
    }
    return res.data;
  },
  getMe: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
  logout: async () => {
    const res = await api.post("/auth/logout");
    localStorage.removeItem("admin_token");
    return res.data;
  }
};

export const AdminAPI = {
  getAnalytics: () => api.get("/admin/analytics").then((r) => r.data),
  uploadFile: (formData: FormData) => api.post("/admin/upload", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),
  
  // Projects
  getProjects: () => api.get("/admin/projects").then((r) => r.data),
  createProject: (data: any) => api.post("/admin/projects", data).then((r) => r.data),
  updateProject: (id: string, data: any) => api.put(`/admin/projects/${id}`, data).then((r) => r.data),
  deleteProject: (id: string) => api.delete(`/admin/projects/${id}`).then((r) => r.data),

  // Skills
  getSkills: () => api.get("/admin/skills").then((r) => r.data),
  createSkill: (data: any) => api.post("/admin/skills", data).then((r) => r.data),
  updateSkill: (id: string, data: any) => api.put(`/admin/skills/${id}`, data).then((r) => r.data),
  deleteSkill: (id: string) => api.delete(`/admin/skills/${id}`).then((r) => r.data),

  // Experiences
  getExperiences: () => api.get("/admin/experiences").then((r) => r.data),
  createExperience: (data: any) => api.post("/admin/experiences", data).then((r) => r.data),
  updateExperience: (id: string, data: any) => api.put(`/admin/experiences/${id}`, data).then((r) => r.data),
  deleteExperience: (id: string) => api.delete(`/admin/experiences/${id}`).then((r) => r.data),

  // Education
  getEducation: () => api.get("/admin/education").then((r) => r.data),
  createEducation: (data: any) => api.post("/admin/education", data).then((r) => r.data),
  updateEducation: (id: string, data: any) => api.put(`/admin/education/${id}`, data).then((r) => r.data),
  deleteEducation: (id: string) => api.delete(`/admin/education/${id}`).then((r) => r.data),

  // Certificates
  getCertificates: () => api.get("/admin/certificates").then((r) => r.data),
  createCertificate: (data: any) => api.post("/admin/certificates", data).then((r) => r.data),
  updateCertificate: (id: string, data: any) => api.put(`/admin/certificates/${id}`, data).then((r) => r.data),
  deleteCertificate: (id: string) => api.delete(`/admin/certificates/${id}`).then((r) => r.data),

  // Resume
  getResume: () => api.get("/admin/resume").then((r) => r.data),
  uploadResume: (formData: FormData) => api.post("/admin/resume", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  // Settings
  getSettings: () => api.get("/admin/settings").then((r) => r.data),
  updateSettings: (data: any) => api.put("/admin/settings", data).then((r) => r.data),

  // Messages
  getMessages: () => api.get("/admin/messages").then((r) => r.data),
  markMessageRead: (id: string) => api.put(`/admin/messages/${id}/read`).then((r) => r.data),
  starMessage: (id: string) => api.put(`/admin/messages/${id}/star`).then((r) => r.data),
  deleteMessage: (id: string) => api.delete(`/admin/messages/${id}`).then((r) => r.data),

  // Blogs
  getBlogs: () => api.get("/admin/blogs").then((r) => r.data),
  createBlog: (data: any) => api.post("/admin/blogs", data).then((r) => r.data),
  updateBlog: (id: string, data: any) => api.put(`/admin/blogs/${id}`, data).then((r) => r.data),
  deleteBlog: (id: string) => api.delete(`/admin/blogs/${id}`).then((r) => r.data)
};
