import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { FolderGit2, Code2, MessageSquare, BookOpen, Award, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const [stats, setStats] = useState<any>(null);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await AdminAPI.getAnalytics();
        if (data.success) {
          setStats(data.stats);
          setRecentMessages(data.recentMessages || []);
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="text-zinc-400 text-sm">Loading admin analytics...</div>;
  }

  const statCards = [
    { label: "Total Projects", value: stats?.projectsCount || 0, tab: "projects", icon: <FolderGit2 className="w-5 h-5 text-indigo-400" /> },
    { label: "Skills Matrix", value: stats?.skillsCount || 0, tab: "skills", icon: <Code2 className="w-5 h-5 text-purple-400" /> },
    { label: "Total Inquiries", value: stats?.messagesCount || 0, tab: "messages", icon: <MessageSquare className="w-5 h-5 text-emerald-400" /> },
    { label: "Unread Messages", value: stats?.unreadMessagesCount || 0, tab: "messages", icon: <MessageSquare className="w-5 h-5 text-rose-400" /> },
    { label: "Blog Posts", value: stats?.blogsCount || 0, tab: "blogs", icon: <BookOpen className="w-5 h-5 text-amber-400" /> },
    { label: "Certificates", value: stats?.certificatesCount || 0, tab: "certificates", icon: <Award className="w-5 h-5 text-cyan-400" /> }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Command Dashboard</h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage and update Aditya Singh's portfolio content live without modifying source code.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab(card.tab)}
            className="glass-card p-5 rounded-2xl border border-white/10 glass-card-hover cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="text-xs text-zinc-400 font-medium">{card.label}</div>
              <div className="text-3xl font-extrabold text-white">{card.value}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Section */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Recent Client & Recruiter Inquiries</h2>
          <button
            onClick={() => onNavigateTab("messages")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All Inbox <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentMessages.length > 0 ? (
          <div className="space-y-3">
            {recentMessages.map((msg, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                    <span className="text-xs text-zinc-400">({msg.email})</span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2">{msg.message}</p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-zinc-500">No inquiries received yet.</div>
        )}
      </div>
    </div>
  );
};
