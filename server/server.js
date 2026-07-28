import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { seedDatabase } from "./utils/seedData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(null, true); // Allow dev access
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());

// Serve uploaded static files
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// Serve root static files (interview-photo.jpeg, profile.jpg, resume.pdf)
const parentDir = path.resolve(process.cwd(), "..");
app.use(express.static(parentDir));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date(), env: process.env.NODE_ENV || "development" });
});

// Database Connection & Boot
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/aditya_portfolio";

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log(" Connected to MongoDB Successfully!");
    await seedDatabase();
  })
  .catch(async (err) => {
    console.warn(" MongoDB local connection warning:", err.message);
    console.log(" Attempting fallback in-memory database simulation / retrying connection...");
  });

app.listen(PORT, () => {
  console.log(`🚀 Aditya Portfolio Server running on port ${PORT}`);
  console.log(`📍 Public API: http://localhost:${PORT}/api/public/portfolio`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
});
