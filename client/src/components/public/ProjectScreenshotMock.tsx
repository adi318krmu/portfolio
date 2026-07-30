import React from "react";
import { Terminal, Cpu, Search, CheckCircle2, ShieldCheck, FileText, Code2, Database, Bot, Sparkles, BarChart2, Layers } from "lucide-react";

interface ProjectScreenshotMockProps {
  projectId: string;
  type: "code" | "dashboard" | "analytics" | "rag";
  title: string;
}

export const ProjectScreenshotMock: React.FC<ProjectScreenshotMockProps> = ({
  projectId,
  type,
  title
}) => {
  return (
    <div className="w-full h-full min-h-[220px] bg-[#07090f] text-zinc-200 font-sans relative overflow-hidden flex flex-col justify-between border border-white/10 select-none">
      
      {/* Top Browser Bar */}
      <div className="px-3 py-2 bg-[#0c101c] border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-md px-3 py-0.5 text-[10px] font-mono text-zinc-400 max-w-xs truncate flex items-center gap-1">
          <span className="text-emerald-400">https://</span>
          <span>{projectId === "devbattles" ? "devbattles.vercel.app" : projectId === "repolens" ? "repo-lens.vercel.app" : "campus-learn.vercel.app"}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-mono rounded border border-indigo-500/30 uppercase">
            {type}
          </span>
        </div>
      </div>

      {/* Dynamic Screen Mock Content based on type */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 overflow-hidden bg-gradient-to-br from-[#0a0e19] to-[#060810]">
        
        {/* Type 1: Code Editor & Contest Workspace (DevBattles) */}
        {type === "code" && (
          <div className="space-y-2 flex-1 flex flex-col justify-between font-mono text-[11px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-zinc-400">
              <span className="text-indigo-400 font-bold flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" /> solution.cpp (C++20)
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Testcases Passed (12/12)
              </span>
            </div>

            <div className="space-y-1 text-zinc-300 bg-[#05070c] p-3 rounded-lg border border-white/5 font-mono text-[10px] leading-relaxed">
              <p><span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;iostream&gt;</span></p>
              <p><span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;vector&gt;</span></p>
              <p className="text-zinc-500">// DevBattles LLM Evaluation Engine</p>
              <p><span className="text-blue-400">int</span> <span className="text-amber-300">solveSubarraySum</span>(<span className="text-purple-400">std::vector</span>&lt;<span className="text-blue-400">int</span>&gt;&amp; nums) &#123;</p>
              <p className="pl-4"><span className="text-blue-400">int</span> maxCount = 0, current = 0;</p>
              <p className="pl-4"><span className="text-purple-400">for</span> (<span className="text-blue-400">int</span> x : nums) &#123; current = max(x, current + x); &#125;</p>
              <p className="pl-4"><span className="text-purple-400">return</span> maxCount;</p>
              <p>&#125;</p>
            </div>

            {/* AI Review Output Box */}
            <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2 text-[10px]">
              <Bot className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-300">Gemini AI Feedback: </span>
                <span className="text-zinc-300">Optimal O(N) time complexity. Memory usage is 4.2 MB in Docker sandbox.</span>
              </div>
            </div>
          </div>
        )}

        {/* Type 2: Dashboard & Role Matrix (RepoLens) */}
        {type === "dashboard" && (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Role Matching Scorecard</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Overall Match: 88%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 space-y-1">
                <span className="text-zinc-400 block font-mono">Frontend Stack</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[92%]" />
                </div>
                <span className="text-indigo-300 font-bold text-[9px]">React, TypeScript, Tailwind</span>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 space-y-1">
                <span className="text-zinc-400 block font-mono">Backend Architecture</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[85%]" />
                </div>
                <span className="text-purple-300 font-bold text-[9px]">Node.js, Express, MongoDB</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[10px] text-zinc-300 flex items-center justify-between">
              <span className="font-mono">Hugging Face Model Assessment:</span>
              <span className="text-purple-300 font-bold">Strong Full-Stack Profile</span>
            </div>
          </div>
        )}

        {/* Type 3: Analytics & Commit Inspection */}
        {type === "analytics" && (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" /> Repository Metrics & Commit Activity
              </span>
              <span className="text-[10px] font-mono text-zinc-400">100+ Repos Analyzed</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="text-zinc-400 block font-mono text-[9px]">Commits</span>
                <span className="text-sm font-extrabold text-indigo-400">420+</span>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="text-zinc-400 block font-mono text-[9px]">Repo Stars</span>
                <span className="text-sm font-extrabold text-purple-400">45+</span>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="text-zinc-400 block font-mono text-[9px]">Clean Code</span>
                <span className="text-sm font-extrabold text-emerald-400">A+</span>
              </div>
            </div>

            <div className="p-2 bg-[#05070c] rounded-lg border border-white/5 flex items-center justify-between text-[10px]">
              <span className="text-zinc-400 font-mono">Weighted Algorithm Score:</span>
              <span className="text-emerald-400 font-extrabold font-mono">94.8 / 100</span>
            </div>
          </div>
        )}

        {/* Type 4: Hybrid RAG Search (Campus Learn) */}
        {type === "rag" && (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-400" />
              <div className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-zinc-200 font-mono">
                "Explain Virtual Memory Paging in OS Unit 3 notes"
              </div>
            </div>

            <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-lg space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between text-[9px] text-indigo-300 font-bold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" /> Hybrid RAG Grounded Answer
                </span>
                <span className="bg-indigo-500/20 px-1.5 py-0.5 rounded text-[8px] border border-indigo-500/30">
                  +35% Precision Boost
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[10px]">
                Virtual Memory paging divides physical memory into fixed-size blocks (frames) and logical memory into pages...
              </p>
              <div className="text-[9px] text-zinc-400 font-mono pt-1 flex items-center gap-1">
                <FileText className="w-3 h-3 text-emerald-400" />
                <span>Source Citation: Lecture_Notes_OS_Ch4.pdf (Slide 18)</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Caption Overlay */}
      <div className="px-3 py-1.5 bg-[#0a0d17] border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
        <span className="font-semibold text-white truncate">{title}</span>
        <span className="font-mono text-[9px] text-indigo-400 shrink-0">Live Application Preview</span>
      </div>
    </div>
  );
};
