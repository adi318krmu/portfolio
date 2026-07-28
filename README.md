# Aditya Singh - Developer Portfolio & Hidden Mini-CMS

Production-ready, custom developer portfolio built with React 18, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, and MongoDB.

## Project Structure

```
portfolio/
├── server/               # Node.js + Express + MongoDB Backend
│   ├── models/           # Mongoose schemas (Projects, Skills, Admin, Messages, etc.)
│   ├── routes/           # REST API routes (Auth, Public, Admin)
│   ├── middleware/       # JWT Auth protection
│   ├── utils/            # Auto-database seeder
│   ├── .env              # Backend environment variables
│   ├── package.json      # Server dependencies
│   └── server.js         # Entry point
│
└── client/               # Vite + React + TypeScript Frontend
    ├── src/
    │   ├── components/   # Public Visitor & Hidden Admin components
    │   ├── context/      # AuthContext & PortfolioContext
    │   ├── services/     # Axios API service
    │   ├── types/        # TypeScript data interfaces
    │   └── index.css     # Glassmorphism & dark design system
    ├── .env              # Frontend environment variables
    ├── package.json      # Client dependencies
    └── vite.config.ts    # Vite bundler config
```

---

## 🚀 Deployment Guide

### 1. Backend Deployment (e.g., Render, Railway, or Heroku)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`: `mongodb+srv://adityaks0604_db_user:j6s3AFdQGy8La2G9@cluster0.vmnqody.mongodb.net/aditya_portfolio?retryWrites=true&w=majority&appName=Cluster0`
  - `JWT_SECRET`: `aditya_portfolio_jwt_secret_key_2026_super_secure_key_aditya`
  - `ADMIN_EMAIL`: `adityaks0604@gmail.com`
  - `ADMIN_PASSWORD`: `admin123456`
  - `CLIENT_URL`: `https://your-frontend-app.vercel.app`
  - `NODE_ENV`: `production`

---

### 2. Frontend Deployment (e.g., Vercel, Netlify)
- **Root Directory**: `client`
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://your-backend-api.onrender.com`

---

## 💻 Local Development

### Run Backend Server
```bash
cd server
npm install
npm run dev
```

### Run Frontend Client
```bash
cd client
npm install
npm run dev
```

- Public Portfolio: `http://localhost:5173`
- Hidden Admin Panel: `http://localhost:5173/admin`
- Admin Credentials: `adityaks0604@gmail.com` / `admin123456`
