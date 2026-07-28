import React, { createContext, useContext, useState, useEffect } from "react";
import { PublicAPI } from "../services/api";
import { Project, Skill, Experience, Education, Certificate, Blog, WebsiteSettings } from "../types";

interface PortfolioContextType {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  certificates: Certificate[];
  resumeUrl: string;
  settings: WebsiteSettings | null;
  blogs: Blog[];
  loading: boolean;
  refetchData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType>({} as PortfolioContextType);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [resumeUrl, setResumeUrl] = useState<string>("/resume.pdf");
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await PublicAPI.getPortfolioData();
      if (res.success && res.data) {
        setProjects(res.data.projects || []);
        setSkills(res.data.skills || []);
        setExperiences(res.data.experiences || []);
        setEducation(res.data.education || []);
        setCertificates(res.data.certificates || []);
        setResumeUrl(res.data.resume || "/resume.pdf");
        setSettings(res.data.settings || null);
        setBlogs(res.data.blogs || []);
      }
    } catch (error) {
      console.error("Failed to load portfolio context:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        skills,
        experiences,
        education,
        certificates,
        resumeUrl,
        settings,
        blogs,
        loading,
        refetchData: fetchData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
