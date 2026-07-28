import express from "express";
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

// GET /api/public/portfolio - Single payload for fast initial page load
router.get("/portfolio", async (req, res) => {
  try {
    const [projects, skills, experiences, education, certificates, resume, settings, blogs] = await Promise.all([
      Project.find({ visible: true }).sort({ order: 1, createdAt: -1 }),
      Skill.find({ hidden: false }).sort({ order: 1, name: 1 }),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      Education.find().sort({ order: 1, createdAt: -1 }),
      Certificate.find().sort({ order: 1, createdAt: -1 }),
      Resume.findOne().sort({ updatedAt: -1 }),
      WebsiteSettings.findOne(),
      Blog.find({ published: true }).select("-content").sort({ createdAt: -1 })
    ]);

    return res.json({
      success: true,
      data: {
        projects,
        skills,
        experiences,
        education,
        certificates,
        resume: resume ? resume.pdfUrl : "/resume.pdf",
        settings: settings || {},
        blogs
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching portfolio data", error: error.message });
  }
});

// GET /api/public/blogs/:slug - Get single blog with full markdown content
router.get("/blogs/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    return res.json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching blog", error: error.message });
  }
});

// POST /api/public/contact - Submit inquiry message
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, company, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone: phone || "",
      company: company || "",
      budget: budget || "",
      message
    });

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your inquiry has been sent directly to Aditya.",
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
});

export default router;
