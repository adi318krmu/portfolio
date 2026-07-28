import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Programming", "Frontend", "Backend", "Database", "AI", "DevOps", "Cloud", "Tools", "Core Subjects"],
    required: true 
  },
  level: { type: Number, min: 0, max: 100, default: 85 },
  icon: { type: String, default: "Code" },
  hidden: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
