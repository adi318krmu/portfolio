import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: "" },
  tags: [{ type: String }],
  readTime: { type: String, default: "5 min read" },
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
