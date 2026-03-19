/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ExternalLink, Github, ArrowRight, Code2, Cpu, Sparkles, RefreshCcw, Info, ChevronLeft, ChevronRight } from "lucide-react";

const INITIAL_TEMPLATES = [
  {
    id: 1,
    title: "Aura Dashboard",
    description: "A study in fluid data visualization. High-precision analytics for the next generation of digital architects.",
    tech: ["React", "D3.js", "TypeScript"],
    image: "https://picsum.photos/seed/aura/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: 2,
    title: "Ethereal Landing",
    description: "Minimalist editorial architecture. Designed for high-end luxury brands and cultural institutions.",
    tech: ["Next.js", "Framer", "Tailwind"],
    image: "https://picsum.photos/seed/ethereal/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: 3,
    title: "Prism Interface",
    description: "Advanced glass-morphism chat system. Real-time neural processing with refined typography.",
    tech: ["React", "Lucide", "Node.js"],
    image: "https://picsum.photos/seed/prism/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: 4,
    title: "Zenith Portfolio",
    description: "The ultimate showcase for creative visionaries. Fluid transitions and immersive project galleries.",
    tech: ["React", "Motion", "Three.js"],
    image: "https://picsum.photos/seed/zenith/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: 5,
    title: "Onyx Commerce",
    description: "Premium retail experience. Seamless transactions wrapped in a sophisticated dark aesthetic.",
    tech: ["React", "Stripe", "Tailwind"],
    image: "https://picsum.photos/seed/onyx/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  }
];

export default function App() {
  const [cards, setCards] = useState(INITIAL_TEMPLATES);
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  
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
      if (cards.length === 0 || isExpanded !== null) return;
      if (e.key === "ArrowLeft") {
        handleSwipe(cards[0].id, 'left');
      } else if (e.key === "ArrowRight") {
        handleSwipe(cards[0].id, 'right');
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, isExpanded, handleSwipe]);

  return (
    <div className="min-h-screen bg-luxury-black relative overflow-hidden text-white font-sans antialiased selection:bg-white/10">
      {/* 2030 Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-white/[0.01] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-white/[0.01] blur-[160px] rounded-full" />
      </div>
      <div className="absolute inset-0 bg-grid-luxury opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 max-w-[1800px] mx-auto px-12 py-16 flex justify-between items-center">
        <div className="flex items-center gap-6 group cursor-pointer">
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

        <a 
          href="https://tvnetwork.zone.id" 
          target="_blank" 
          className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/10"
        >
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 text-[9px] font-mono uppercase tracking-[0.4em] group-hover:text-black transition-colors">Connect</span>
        </a>
      </nav>

      <main className="relative z-10 max-w-[1800px] mx-auto px-12 grid lg:grid-cols-[1fr_480px] gap-24 items-center min-h-[calc(100vh-200px)]">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-12">
              <span className="w-12 h-[1px] bg-white/20" />
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.6em]">2030 Curated Series</span>
            </div>
            
            <h1 className="text-[12vw] lg:text-[10vw] font-serif font-light leading-[0.85] tracking-[-0.05em] mb-16">
              The <br />
              <span className="italic text-luxury-gradient">New Standard</span>
            </h1>

            <div className="grid grid-cols-2 gap-12 max-w-xl">
              <div className="space-y-4">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Philosophy</span>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  Redefining digital luxury through technical precision and minimalist architecture.
                </p>
              </div>
              <div className="space-y-4">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Interaction</span>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  A fluid exploration of motion and depth. Swipe to navigate the future.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Swipe Stack Section */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-full h-[640px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
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
              className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Navigate</span>
            <button 
              onClick={() => handleSwipe(cards[0].id, 'right')}
              className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-[1800px] mx-auto px-12 py-16 border-t border-white/5 mt-24 flex justify-between items-center">
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
      className={`absolute w-full h-full bg-luxury-gray border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing group/card
        ${isTop ? 'ring-1 ring-white/10' : ''}
      `}
    >
      <div className="h-full flex flex-col relative">
        {/* Image Section */}
        <div className="h-[55%] relative overflow-hidden">
          <motion.img 
            src={template.image} 
            alt={template.title}
            className="w-full h-full object-cover grayscale opacity-40 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-1000"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-gray via-transparent to-transparent" />
          
          {/* 2030 Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-white/10 z-10 pointer-events-none"
          />

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="absolute top-8 right-8 w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
          >
            <Info className="w-4 h-4 opacity-40" />
          </button>
          
          <div className="absolute bottom-6 left-8 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[6px] font-mono text-white/20 uppercase tracking-[0.4em]">Resolution</span>
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">4K — HDR</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[6px] font-mono text-white/20 uppercase tracking-[0.4em]">Bitrate</span>
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">120 MBPS</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 flex-1 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.5em]">Project {String(template.id).padStart(2, '0')}</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.5em]">{template.tech[0]}</span>
          </div>

          <h3 className="text-3xl font-serif italic mb-4 tracking-tight leading-none">{template.title}</h3>
          <p className="text-white/30 text-xs leading-relaxed mb-8 flex-1 font-light tracking-wide">
            {template.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href={template.liveUrl} 
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center py-4 bg-white text-black text-[8px] font-mono uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all"
            >
              Launch
            </a>
            <a 
              href={template.codeUrl} 
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center py-4 border border-white/5 text-[8px] font-mono uppercase tracking-[0.4em] rounded-full hover:bg-white/5 transition-all"
            >
              Source
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
              className="absolute inset-0 bg-luxury-black/95 z-20 flex flex-col p-12"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.6em]">Technical Spec</span>
                <button onClick={onToggleExpand} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                  <RefreshCcw className="w-3 h-3 opacity-40" />
                </button>
              </div>

              <div className="space-y-10 flex-1 overflow-y-auto custom-scrollbar pr-4">
                <section>
                  <label className="text-[7px] font-mono text-white/20 uppercase tracking-[0.5em] mb-4 block">Manifesto</label>
                  <p className="text-lg font-serif italic text-white/60 leading-tight">
                    "Technical excellence meeting aesthetic purity. A blueprint for the 2030 digital landscape."
                  </p>
                </section>

                <section>
                  <label className="text-[7px] font-mono text-white/20 uppercase tracking-[0.5em] mb-4 block">Architecture</label>
                  <div className="space-y-3">
                    {['Neural Processing', 'Fluid Dynamics', 'Type Precision'].map(f => (
                      <div key={f} className="flex items-center justify-between py-3 border-b border-white/5">
                        <span className="text-[10px] font-light text-white/40 uppercase tracking-widest">{f}</span>
                        <Sparkles className="w-3 h-3 text-white/10" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <a 
                href={template.liveUrl}
                target="_blank"
                className="mt-8 w-full py-5 bg-white text-black font-mono text-[8px] uppercase tracking-[0.5em] rounded-full text-center"
              >
                Enter Experience
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
