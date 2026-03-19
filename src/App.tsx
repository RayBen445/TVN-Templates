/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ExternalLink, Github, ArrowRight, Code2, Cpu, Sparkles, RefreshCcw, Info, ChevronLeft, ChevronRight } from "lucide-react";
import ThreeBackground from "./components/ThreeBackground";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

const INITIAL_TEMPLATES = [
  {
    id: 1,
    title: "Creator Dashboard",
    description: "A modern, responsive dashboard template for content creators, authors, and digital product storefronts.",
    tech: ["React", "TypeScript", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core/tree/main/templates/creator-dashboard-template"
  },
  {
    id: 2,
    title: "E-Commerce Starter",
    description: "High-conversion premium retail experience. Seamless transactions wrapped in a sophisticated dark aesthetic.",
    tech: ["Next.js", "Stripe", "Tailwind"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2370",
    liveUrl: "https://tvnetwork.zone.id",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: 3,
    title: "AI SaaS Boilerplate",
    description: "Advanced glass-morphism dashboard system. Real-time neural processing with refined typography.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2370",
    liveUrl: "https://tvnetwork.zone.id",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: 4,
    title: "Zenith Portfolio",
    description: "The ultimate showcase for creative visionaries. Fluid transitions and immersive project galleries.",
    tech: ["React", "Motion", "Three.js"],
    image: "https://images.unsplash.com/photo-1507238692062-56890a501512?auto=format&fit=crop&q=80&w=2370",
    liveUrl: "https://tvnetwork.zone.id",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  }
];

export default function App() {
  const [cards, setCards] = useState(INITIAL_TEMPLATES);
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  
  const handleSwipe = useCallback((id: number, direction: 'left' | 'right') => {
    setCards((prev) => {
      const swipedCard = prev.find(c => c.id === id);
      if (!swipedCard) return prev;
      const remaining = prev.filter(c => c.id !== id);
      // Move to the back of the stack
      return [...remaining, swipedCard];
    });
    setIsExpanded(null);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cards.length === 0 || isExpanded !== null || currentPage !== 'home') return;
      if (e.key === "ArrowLeft") {
        handleSwipe(cards[0].id, 'left');
      } else if (e.key === "ArrowRight") {
        handleSwipe(cards[0].id, 'right');
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, isExpanded, currentPage, handleSwipe]);

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden text-white font-sans antialiased selection:bg-cyan-500/30 flex flex-col">
      <ThreeBackground />

      {/* Header */}
      <header className="relative z-10 p-6 md:p-12 w-full max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="inline-block px-4 py-1.5 mb-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium tracking-wider uppercase w-max hover:bg-cyan-500/20 transition-colors">
            Africa’s Tech Builders Network
          </div>
          <h1 className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40">
            TVN Templates — {new Date().getFullYear()}
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-purple-200 mt-2">
            Showcase Collection
          </h2>
        </div>

        <div className="flex gap-4 sm:gap-8 items-center w-full sm:w-auto justify-between sm:justify-end">
          <a href="https://github.com/tvnetwork/tvn-core" target="_blank" className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors">
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Repository</span>
          </a>
          <button className="flex items-center gap-3 glass-panel px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,209,255,0.2)] transition-all">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">System Active</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {currentPage === 'home' ? (
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-[500px] h-[600px] sm:h-[700px] flex flex-col items-center">

              {/* Deck Container */}
              <div className="relative w-full h-full perspective-1000">
                <AnimatePresence>
                  {cards.map((template, index) => (
                    <SwipeCard
                      key={template.id}
                      template={template}
                      index={index}
                      total={cards.length}
                      onSwipe={(dir) => handleSwipe(template.id, dir)}
                      isExpanded={isExpanded === template.id}
                      onToggleExpand={() => setIsExpanded(isExpanded === template.id ? null : template.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Micro Controls */}
              <div className="mt-12 flex items-center gap-16">
                <button
                  onClick={() => handleSwipe(cards[0].id, 'left')}
                  className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[8px] font-mono text-cyan-400/50 uppercase tracking-[0.5em]">Navigate</span>
                <button
                  onClick={() => handleSwipe(cards[0].id, 'right')}
                  className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : currentPage === 'privacy' ? (
          <Privacy onBack={() => setCurrentPage('home')} />
        ) : (
          <Terms onBack={() => setCurrentPage('home')} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 py-10 md:py-16 border-t border-cyan-500/10 mt-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 opacity-50 cursor-pointer hover:opacity-100 transition-opacity" onClick={() => setCurrentPage('home')}>
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-cyan-100">Tech Visionaries Network</span>
        </div>
        <div className="flex gap-8 sm:gap-12 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">
          <button onClick={() => setCurrentPage('privacy')} className="hover:text-cyan-400 transition-colors">Privacy</button>
          <button onClick={() => setCurrentPage('terms')} className="hover:text-cyan-400 transition-colors">Terms</button>
          <span className="text-white/20">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

interface SwipeCardProps {
  key?: React.Key;
  template: typeof INITIAL_TEMPLATES[0];
  index: number;
  total: number;
  onSwipe: (direction: 'left' | 'right') => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function SwipeCard({ template, index, total, onSwipe, isExpanded, onToggleExpand }: SwipeCardProps) {
  const x = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const rotate = useTransform(xSpring, [-200, 200], [-15, 15]);
  const opacity = useTransform(xSpring, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const isTop = index === 0;
  
  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  return (
    <motion.div
      style={{ 
        x: xSpring, 
        rotate, 
        opacity: isTop ? opacity : 1,
        zIndex: total - index 
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.8, y: 40, opacity: 0 }}
      animate={{ 
        scale: 1 - index * 0.04, 
        y: index * 10, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          delay: index * 0.1
        }
      }}
      exit={{ 
        y: 1000,
        rotate: x.get() < 0 ? -45 : 45,
        opacity: 0,
        scale: 0.8,
        transition: { 
          duration: 1.2, 
          ease: [0.32, 0, 0.67, 0]
        }
      }}
      className={`absolute w-full h-full bg-[#111827] border border-cyan-500/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,209,255,0.1)] cursor-grab active:cursor-grabbing group/card
        ${isTop ? 'ring-1 ring-cyan-500/30 shadow-[0_0_30px_rgba(0,209,255,0.1)]' : ''}
      `}
    >
      <div className="h-full flex flex-col relative">
        {/* Image Section */}
        <div className="h-[45%] sm:h-[50%] relative overflow-hidden bg-[#0B0F19]">
          <motion.img 
            src={template.image} 
            alt={template.title}
            className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-all duration-1000 mix-blend-luminosity group-hover/card:mix-blend-normal"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none" />
          
          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-cyan-500/30 shadow-[0_0_10px_rgba(0,209,255,0.5)] z-10 pointer-events-none"
          />

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="absolute top-6 right-6 w-10 h-10 bg-[#0B0F19]/80 border border-cyan-500/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-500 z-20"
          >
            <Info className="w-4 h-4 text-cyan-400" />
          </button>
          
          <div className="absolute bottom-6 left-6 sm:left-8 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-[0.4em]">Status</span>
              <span className="text-[10px] font-mono text-cyan-100 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Ready
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 flex-1 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-[8px] sm:text-[9px] font-mono text-cyan-400/60 uppercase tracking-[0.5em] bg-cyan-500/10 px-2 sm:px-3 py-1 rounded-full border border-cyan-500/20">
              PKG {String(template.id).padStart(2, '0')}
            </span>
            <span className="w-1 h-1 bg-cyan-500/50 rounded-full" />
            <span className="text-[8px] sm:text-[9px] font-mono text-purple-400/80 uppercase tracking-[0.5em] truncate">{template.tech[0]}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-4 text-white group-hover/card:text-cyan-300 transition-colors line-clamp-1">{template.title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-1 font-light tracking-wide line-clamp-3">
            {template.description}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-auto">
            <a 
              href={template.liveUrl} 
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="group flex items-center justify-center gap-2 py-3 sm:py-4 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl hover:bg-cyan-500 hover:text-[#0B0F19] hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all"
            >
              Preview <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={template.codeUrl} 
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#0B0F19] border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl hover:bg-white/10 hover:text-white transition-all"
            >
              <Code2 className="w-3 h-3" /> Code
            </a>
          </div>
        </div>

        {/* Details Overlay */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-xl z-30 flex flex-col p-6 sm:p-10 border border-cyan-500/30 rounded-[2.5rem]"
            >
              <div className="flex justify-between items-center mb-8 sm:mb-10">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300 uppercase tracking-[0.4em] sm:tracking-[0.6em]">System Manifest</span>
                </div>
                <button onClick={onToggleExpand} className="w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-300 transition-all">
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 sm:space-y-8 flex-1 overflow-y-auto custom-scrollbar pr-2 sm:pr-4">
                <section className="bg-[#111827] p-4 sm:p-6 rounded-2xl border border-white/5">
                  <label className="text-[8px] sm:text-[9px] font-mono text-cyan-500 uppercase tracking-[0.5em] mb-3 sm:mb-4 block flex items-center gap-2">
                    <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" /> Description
                  </label>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {template.description}
                  </p>
                </section>

                <section>
                  <label className="text-[8px] sm:text-[9px] font-mono text-cyan-500 uppercase tracking-[0.5em] mb-3 sm:mb-4 block flex items-center gap-2">
                    <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" /> Tech Stack
                  </label>
                  <div className="space-y-2 sm:space-y-3">
                    {template.tech.map((f, i) => (
                      <div key={f} className="flex items-center justify-between py-2 sm:py-3 border-b border-white/5 group hover:border-cyan-500/30 transition-colors">
                        <span className="text-[10px] sm:text-[12px] font-mono text-gray-400 uppercase tracking-widest group-hover:text-cyan-300 transition-colors">
                          <span className="text-cyan-500/50 mr-2">{String(i + 1).padStart(2, '0')}</span> {f}
                        </span>
                        <Sparkles className="w-3 h-3 text-cyan-500/30 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <a 
                href={template.liveUrl}
                target="_blank"
                className="mt-6 w-full py-4 sm:py-5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.5em] rounded-xl text-center hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all font-bold flex items-center justify-center gap-2 group"
              >
                Initialize <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
