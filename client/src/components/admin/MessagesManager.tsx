import React, { useState, useEffect } from "react";
import { AdminAPI } from "../../services/api";
import { Message } from "../../types";
import { Mail, Star, Trash2, CheckCircle2, Phone, Building, DollarSign } from "lucide-react";

export const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await AdminAPI.getMessages();
      if (res.success) setMessages(res.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await AdminAPI.markMessageRead(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStar = async (id: string) => {
    try {
      await AdminAPI.starMessage(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await AdminAPI.deleteMessage(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Client & Recruiter Messages</h1>
        <p className="text-xs text-zinc-400">All submitted contact form inquiries stored in database.</p>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => !msg.read && handleMarkRead(msg._id!)}
              className={`glass-card p-6 rounded-3xl border transition-all ${
                msg.read ? "border-white/10 opacity-80" : "border-indigo-500/40 bg-indigo-950/20"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{msg.name}</h3>
                    <span className="text-xs text-indigo-400 font-mono">({msg.email})</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                    {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.phone}</span>}
                    {msg.company && <span className="flex items-center gap-1"><Building className="w-3 h-3" /> {msg.company}</span>}
                    {msg.budget && <span className="flex items-center gap-1 text-emerald-400"><DollarSign className="w-3 h-3" /> {msg.budget}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStar(msg._id!); }}
                    className={`p-2 rounded-xl border ${msg.starred ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-white/5 text-zinc-400 border-white/10"}`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(msg._id!); }}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-4 text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                {msg.message}
              </div>

              <div className="mt-4 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                <span>Received: {new Date(msg.createdAt!).toLocaleString()}</span>
                {msg.read ? <span className="text-zinc-400">Read</span> : <span className="text-indigo-400 font-bold">New Message</span>}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-500 text-sm">No messages in inbox.</div>
        )}
      </div>
    </div>
  );
};
