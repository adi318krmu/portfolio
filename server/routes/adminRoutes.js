import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protectAdmin } from "../middleware/auth.js";

import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Education from "../models/Education.js";
import Certificate from "../models/Certificate.js";
import Blog from "../models/Blog.js";
import Message from "../models/Message.js";
import Resume from "../models/Resume.js";
import WebsiteSettings from "../models/WebsiteSettings.js";

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Protect all admin routes
router.use(protectAdmin);

// ==================== FILE UPLOADS ====================
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  return res.json({ success: true, url: fileUrl, filename: req.file.filename });
});

// ==================== DASHBOARD ANALYTICS ====================
router.get("/analytics", async (req, res) => {
  try {
    const [projectsCount, skillsCount, messagesCount, unreadMessagesCount, blogsCount, certificatesCount] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Blog.countDocuments(),
      Certificate.countDocuments()
    ]);

    const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5);

    return res.json({
      success: true,
      stats: {
        projectsCount,
        skillsCount,
        messagesCount,
        unreadMessagesCount,
        blogsCount,
        certificatesCount
      },
      recentMessages
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Analytics fetch failed", error: error.message });
  }
});

// ==================== PROJECTS CRUD ====================
router.get("/projects", async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, projects });
});

router.post("/projects", async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Project deleted" });
});

// ==================== SKILLS CRUD ====================
router.get("/skills", async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, name: 1 });
  res.json({ success: true, skills });
});

router.post("/skills", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put("/skills/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/skills/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Skill deleted" });
});

// ==================== RESUME MANAGER ====================
router.get("/resume", async (req, res) => {
  const resume = await Resume.findOne().sort({ updatedAt: -1 });
  res.json({ success: true, resume });
});

router.post("/resume", upload.single("resume"), async (req, res) => {
  try {
    let pdfUrl = req.body.pdfUrl;
    if (req.file) {
      pdfUrl = `/uploads/${req.file.filename}`;
    }
    if (!pdfUrl) {
      return res.status(400).json({ success: false, message: "PDF URL or file required" });
    }

    let resume = await Resume.findOne();
    if (resume) {
      resume.pdfUrl = pdfUrl;
      resume.updatedAt = new Date();
      await resume.save();
    } else {
      resume = await Resume.create({ pdfUrl });
    }

    res.json({ success: true, resume });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================== WEBSITE SETTINGS (Hero/About/Socials) ====================
router.get("/settings", async (req, res) => {
  let settings = await WebsiteSettings.findOne();
  if (!settings) {
    settings = await WebsiteSettings.create({});
  }
  res.json({ success: true, settings });
});

router.put("/settings", async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ success: true, settings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================== EXPERIENCE CRUD ====================
router.get("/experiences", async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, experiences });
});

router.post("/experiences", async (req, res) => {
  const exp = await Experience.create(req.body);
  res.status(201).json({ success: true, experience: exp });
});

router.put("/experiences/:id", async (req, res) => {
  const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, experience: exp });
});

router.delete("/experiences/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Experience deleted" });
});

// ==================== EDUCATION CRUD ====================
router.get("/education", async (req, res) => {
  const edu = await Education.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, education: edu });
});

router.post("/education", async (req, res) => {
  const edu = await Education.create(req.body);
  res.status(201).json({ success: true, education: edu });
});

router.put("/education/:id", async (req, res) => {
  const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, education: edu });
});

router.delete("/education/:id", async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Education deleted" });
});

// ==================== CERTIFICATES CRUD ====================
router.get("/certificates", async (req, res) => {
  const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, certificates });
});

router.post("/certificates", async (req, res) => {
  const cert = await Certificate.create(req.body);
  res.status(201).json({ success: true, certificate: cert });
});

router.put("/certificates/:id", async (req, res) => {
  const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, certificate: cert });
});

router.delete("/certificates/:id", async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Certificate deleted" });
});

// ==================== MESSAGES / INQUIRIES ====================
router.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ success: true, messages });
});

router.put("/messages/:id/read", async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json({ success: true, message: msg });
});

router.put("/messages/:id/star", async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (msg) {
    msg.starred = !msg.starred;
    await msg.save();
  }
  res.json({ success: true, message: msg });
});

router.delete("/messages/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Message deleted" });
});

// ==================== BLOGS CRUD ====================
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, blogs });
});

router.post("/blogs", async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const blog = await Blog.create({ ...req.body, slug });
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Blog deleted" });
});

export default router;
