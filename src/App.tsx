/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { CardStack } from "./components/CardStack";
import { HangZone } from "./components/HangZone";
import { useCardStore } from "./store/useCardStore";

function App() {
  const { reset } = useCardStore();

  return (
    <div className="min-h-screen bg-luxury-black relative overflow-hidden text-white font-sans antialiased selection:bg-white/10 flex flex-col">
      {/* 2030 Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-white/[0.01] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-white/[0.01] blur-[160px] rounded-full" />
      </div>
      <div className="absolute inset-0 bg-grid-luxury opacity-20 pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-50 w-full max-w-[2000px] mx-auto px-12 py-8 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-6 group cursor-pointer" onClick={reset}>
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/20 rounded-full group-hover:rotate-180 transition-transform duration-1000" />
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-2xl tracking-tight leading-none">Studio Core</span>
            <span className="text-[8px] font-mono tracking-[0.4em] text-white/30 uppercase mt-1">Advanced Systems</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-24 text-[9px] font-mono uppercase tracking-[0.5em] text-white/20">
          <a href="#" className="hover:text-white transition-all hover:tracking-[0.6em]">Collection</a>
          <a href="https://tvnetwork.zone.id" className="hover:text-white transition-all hover:tracking-[0.6em]">Network</a>
          <a href="#" className="hover:text-white transition-all hover:tracking-[0.6em]">Archive</a>
        </div>

        <button
          onClick={reset}
          className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/10 flex items-center gap-2 hover:bg-white/5 transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
          <span className="relative z-10 text-[9px] font-mono uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors">Reset Store</span>
        </button>
      </nav>

      <main className="relative z-10 flex-1 w-full max-w-[2000px] mx-auto px-12 grid lg:grid-cols-[300px_1fr_300px] gap-8 items-stretch pb-12">

        {/* Left Hang Zone */}
        <HangZone side="left" />

        {/* Center Swipe Stack Section */}
        <div className="relative flex flex-col items-center justify-center">

          <div className="mb-8 text-center max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl font-serif font-light leading-none tracking-tight mb-4">
                The <span className="italic text-luxury-gradient">New Standard</span>
              </h1>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">
                Drag to explore • Drop sides to hang
              </p>
            </motion.div>
          </div>

          <CardStack />

          {/* Micro Controls */}
          <div className="mt-12 flex items-center gap-16 pointer-events-none opacity-50">
            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Navigate</span>
            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Right Hang Zone */}
        <HangZone side="right" />

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-[2000px] mx-auto px-12 py-8 border-t border-white/5 shrink-0 flex justify-between items-center">
        <div className="flex items-center gap-4 opacity-20">
          <div className="w-1 h-1 bg-white rounded-full" />
          <span className="text-[8px] font-mono tracking-[0.5em] uppercase">Tech Visionaries Network</span>
        </div>
        <div className="flex gap-12 text-[8px] font-mono uppercase tracking-[0.4em] text-white/20">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <span className="text-white/5">© 2030</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
