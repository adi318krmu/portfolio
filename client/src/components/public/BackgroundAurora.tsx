import React from "react";

export const BackgroundAurora: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora glow blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
      {/* Mesh Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-30" />
    </div>
  );
};
