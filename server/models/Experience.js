import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: "" },
  period: { type: String, required: true },
  descriptionPoints: [{ type: String }],
  tags: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
