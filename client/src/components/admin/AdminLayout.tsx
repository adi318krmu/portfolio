import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  User,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  Sparkles
} from "lucide-react";

import { DashboardOverview } from "./DashboardOverview";
import { ProjectsManager } from "./ProjectsManager";
import { SkillsManager } from "./SkillsManager";
import { ResumeManager } from "./ResumeManager";
import { HeroAboutManager } from "./HeroAboutManager";
import { ExperienceManager } from "./ExperienceManager";
import { EducationManager } from "./EducationManager";
import { CertificatesManager } from "./CertificatesManager";
import { MessagesManager } from "./MessagesManager";
import { BlogsManager } from "./BlogsManager";
import { WebsiteSettingsManager } from "./WebsiteSettingsManager";

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarNavItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "resume", label: "Resume Manager", icon: <FileText className="w-4 h-4" /> },
    { id: "hero-about", label: "Hero & About", icon: <User className="w-4 h-4" /> },
    { id: "messages", label: "Messages / Inquiries", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "blogs", label: "Blogs", icon: <BookOpen className="w-4 h-4" /> },
    { id: "settings", label: "Website Settings", icon: <Settings className="w-4 h-4" /> }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
      case "projects": return <ProjectsManager />;
      case "skills": return <SkillsManager />;
      case "experience": return <ExperienceManager />;
      case "education": return <EducationManager />;
      case "certificates": return <CertificatesManager />;
      case "resume": return <ResumeManager />;
      case "hero-about": return <HeroAboutManager />;
      case "messages": return <MessagesManager />;
      case "blogs": return <BlogsManager />;
      case "settings": return <WebsiteSettingsManager />;
      default: return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0d16] border-r border-white/10 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-base text-white">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs shadow-md shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="leading-tight">Admin Mini-CMS</div>
                <div className="text-[10px] text-indigo-400 font-mono">Aditya Singh</div>
              </div>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              title="View Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="text-[11px] text-zinc-400 font-mono truncate px-1">
            Logged in as: <span className="text-zinc-200">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        {renderTabContent()}
      </main>
    </div>
  );
};
