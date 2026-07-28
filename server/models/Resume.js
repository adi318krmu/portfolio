import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  title: { type: String, default: "Aditya Singh Resume" },
  pdfUrl: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Resume", resumeSchema);
