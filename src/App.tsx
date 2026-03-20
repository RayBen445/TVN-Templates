/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ExternalLink, Github, ArrowRight, Code2, Cpu, Sparkles, RefreshCcw, Info, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import ThreeBackground from "./components/ThreeBackground";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import { CardStack } from "./components/CardStack";
import { HangZone } from "./components/HangZone";
import { useCardStore } from "./store/useCardStore";

function App() {
  const { reset } = useCardStore();

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden text-white font-sans antialiased selection:bg-cyan-500/30 flex flex-col">
      <ThreeBackground />

      {/* 2030 Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-purple-600/5 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-30 pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-50 w-full max-w-[2000px] mx-auto px-6 sm:px-12 py-6 sm:py-8 flex justify-between items-center shrink-0 border-b border-white/5 bg-[#0B0F19]/50 backdrop-blur-md">
        <div className="flex items-center gap-4 sm:gap-6 group cursor-pointer" onClick={reset}>
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <div className="absolute inset-0 border border-cyan-500/30 rounded-full group-hover:rotate-180 transition-transform duration-1000 shadow-[0_0_15px_rgba(0,209,255,0.2)]" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl sm:text-2xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">CSSLab</span>
            <span className="text-[7px] sm:text-[8px] font-mono tracking-[0.3em] sm:tracking-[0.4em] text-cyan-500 uppercase mt-1">Template Archive</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[9px] font-mono uppercase tracking-[0.4em] text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition-colors hover:tracking-[0.5em] flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500/0 group-hover:bg-cyan-500 rounded-full transition-colors" /> Components</a>
          <a href="https://github.com/RayBen445/TVN-Templates" className="hover:text-cyan-400 transition-colors hover:tracking-[0.5em] flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500/0 group-hover:bg-cyan-500 rounded-full transition-colors" /> Network</a>
          <a href="#" className="hover:text-cyan-400 transition-colors hover:tracking-[0.5em] flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500/0 group-hover:bg-cyan-500 rounded-full transition-colors" /> Documentation</a>
        </div>

        <button
          onClick={reset}
          className="group relative px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3 h-3 text-cyan-400/50 group-hover:text-cyan-300 transition-colors" />
          <span className="relative z-10 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-cyan-100 group-hover:text-white transition-colors">Reset</span>
        </button>
      </nav>

      <main className="relative z-10 flex-1 w-full max-w-[2000px] mx-auto px-6 sm:px-12 grid lg:grid-cols-[300px_1fr_300px] gap-8 items-stretch pb-12 pt-8 sm:pt-12">

        {/* Left Hang Zone */}
        <HangZone side="left" />

        {/* Center Swipe Stack Section */}
        <div className="relative flex flex-col items-center justify-center">

          <div className="mb-6 sm:mb-8 text-center max-w-lg mx-auto w-full px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 bg-[#111827] px-4 py-2 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(0,209,255,0.05)]">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-mono text-cyan-100 uppercase tracking-[0.3em] sm:tracking-[0.4em]">2030 Curated Series</span>
              </div>

              <h1 className="text-[8vw] sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 text-white">
                Next-Gen <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Digital Assets</span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6">
                 <div className="flex items-center gap-2 bg-[#111827]/80 px-4 py-2 rounded-xl border border-white/5">
                   <span className="w-2 h-2 rounded-full bg-purple-500" />
                   <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">Drag to explore</span>
                 </div>
                 <div className="hidden sm:flex items-center gap-2 bg-[#111827]/80 px-4 py-2 rounded-xl border border-white/5">
                   <span className="w-2 h-2 rounded-full bg-cyan-500" />
                   <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">Drop to hang</span>
                 </div>
              </div>
            </motion.div>
          </div>

          <CardStack />

          {/* Micro Controls */}
          <div className="mt-8 sm:mt-12 flex items-center gap-8 sm:gap-16 pointer-events-none opacity-50">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111827]">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em] sm:tracking-[0.5em]">Navigate</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#111827]">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Right Hang Zone */}
        <HangZone side="right" />

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-[2000px] mx-auto px-6 sm:px-12 py-6 sm:py-8 border-t border-white/5 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-[#0B0F19]/80 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 sm:opacity-50 group">
          <div className="w-1 h-1 bg-cyan-500 rounded-full group-hover:animate-ping" />
          <span className="text-[8px] font-mono tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gray-400">Tech Visionaries Network</span>
        </div>

        <div className="flex gap-6 sm:gap-8 lg:gap-12 text-[8px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-500">
          <Privacy onBack={() => {}} />
          <Terms onBack={() => {}} />
          <span className="text-gray-600 hidden sm:inline">© 2030 CSSLab</span>
        </div>

        <div className="flex gap-4 sm:gap-8 items-center w-full sm:w-auto justify-between sm:justify-end">
          <a href="https://github.com/RayBen445/TVN-Templates" target="_blank" className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors">
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Repository</span>
          </a>
          <button className="flex items-center gap-3 bg-[#111827] border border-cyan-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(0,209,255,0.2)] transition-all">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono text-cyan-100 uppercase tracking-[0.2em]">System Active</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
