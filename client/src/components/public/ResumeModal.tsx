import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronLeft, ChevronRight, FileText, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl = "/resume.pdf"
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 75));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (modalRef.current?.requestFullscreen) {
        modalRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formattedPdfUrl = `${resumeUrl}#page=${currentPage}&zoom=${zoomLevel}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full ${
            isFullscreen
              ? "h-screen max-w-none rounded-none"
              : "max-w-4xl h-[85vh] rounded-3xl"
          } bg-[#0b0f19] border border-white/15 shadow-2xl flex flex-col overflow-hidden z-10`}
        >
          {/* Header Controls Bar */}
          <div className="p-4 bg-[#0d1222] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            {/* Title */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Aditya Singh Resume</h3>
                <span className="text-[10px] text-zinc-400 font-mono">Curriculum Vitae Preview</span>
              </div>
            </div>

            {/* Toolbar Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Page Controls */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage <= 1}
                  className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-white/10"
                  aria-label="Previous Page"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-zinc-300 font-mono text-xs">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10"
                  aria-label="Next Page"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={handleZoomOut}
                  className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10"
                  aria-label="Zoom Out"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-1.5 text-zinc-300 font-mono text-xs w-11 text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10"
                  aria-label="Zoom In"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl border border-white/10 text-xs flex items-center gap-1 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Explicit Download Resume Button */}
              <a
                href={resumeUrl}
                download="Aditya_Singh_Resume.pdf"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl border border-white/10 transition-colors"
                aria-label="Close Resume Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-center p-2">
            {!hasError ? (
              <div
                className="w-full h-full transition-transform duration-200 origin-top flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <iframe
                  src={formattedPdfUrl}
                  title="Aditya Singh Resume PDF Preview"
                  className="w-full h-full rounded-xl border-none shadow-2xl bg-white"
                  onError={() => setHasError(true)}
                />
              </div>
            ) : (
              /* Fallback view if PDF cannot be previewed */
              <div className="text-center p-8 space-y-4 max-w-md bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <FileText className="w-12 h-12 text-indigo-400 mx-auto animate-pulse" />
                <h4 className="text-lg font-bold text-white">PDF Preview Unavailable</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your browser environment does not support embedded PDF previews directly. You can view or download the resume using the links below.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-white/10"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open PDF in New Tab</span>
                  </a>
                  <a
                    href={resumeUrl}
                    download="Aditya_Singh_Resume.pdf"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
