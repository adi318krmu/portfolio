import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  description: { type: String, default: "" },
  architecture: { type: String, default: "" },
  challenges: { type: String, default: "" },
  features: [{ type: String }],
  stack: [{ type: String }],
  thumbnail: { type: String, default: "" },
  gallery: [{ type: String }],
  videoUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  liveUrl: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
