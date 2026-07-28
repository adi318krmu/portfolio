import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  company: { type: String, default: "" },
  budget: { type: String, default: "" },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  starred: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
