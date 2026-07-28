import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";

import { BackgroundAurora } from "./components/public/BackgroundAurora";
import { CustomCursor } from "./components/public/CustomCursor";
import { Navbar } from "./components/public/Navbar";
import { HeroSection } from "./components/public/HeroSection";
import { AboutSection } from "./components/public/AboutSection";
import { SkillsSection } from "./components/public/SkillsSection";
import { ProjectsSection } from "./components/public/ProjectsSection";
import { CertificatesSection } from "./components/public/CertificatesSection";
import { FreelanceSection } from "./components/public/FreelanceSection";
import { BlogSection } from "./components/public/BlogSection";
import { ContactSection } from "./components/public/ContactSection";
import { CommandPalette } from "./components/public/CommandPalette";
import { Footer } from "./components/public/Footer";

import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminLayout } from "./components/admin/AdminLayout";

const PublicPortfolio: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen relative selection:bg-indigo-500 selection:text-white">
      <BackgroundAurora />
      <CustomCursor />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      
      <main className="relative z-10 space-y-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <FreelanceSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  );
};

const ProtectedAdminRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-zinc-400 font-mono text-xs">
        Authenticating session token...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminLayout />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Routes>
            {/* Public Visitor Route */}
            <Route path="/" element={<PublicPortfolio />} />
            
            {/* Hidden Admin Routes */}
            <Route path="/admin" element={<ProtectedAdminRoute />} />
            <Route path="/admin/login" element={<ProtectedAdminRoute />} />

            {/* Catch-all redirect to public portfolio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;
