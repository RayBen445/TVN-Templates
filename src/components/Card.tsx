import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Info, RefreshCcw, Sparkles } from 'lucide-react';
import { Card as CardType, useCardStore } from '../store/useCardStore';
import { cn } from '../lib/utils';

interface CardProps {
  key?: React.Key;
  card: CardType;
  index: number;
  total: number;
  isTop: boolean;
}

export function Card({ card, index, total, isTop }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { setCardStatus, updateCardPosition, reshuffleStack } = useCardStore();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth return
  const xSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const ySpring = useSpring(y, { stiffness: 400, damping: 40 });

  // Rotate slightly based on x movement
  const rotate = useTransform(xSpring, [-200, 200], [-10, 10]);

  // Drop Zones thresholds
  const HANG_THRESHOLD_X = 150;

  const handleDragStart = () => {
    setCardStatus(card.id, 'dragging');
  };

  const handleDragEnd = (event: any, info: any) => {
    const offsetX = info.offset.x;

    // Check if dropped in left or right hang zone
    if (offsetX < -HANG_THRESHOLD_X) {
      setCardStatus(card.id, 'hung-left');
      updateCardPosition(card.id, info.point.x, info.point.y);
      reshuffleStack(card.id);
    } else if (offsetX > HANG_THRESHOLD_X) {
      setCardStatus(card.id, 'hung-right');
      updateCardPosition(card.id, info.point.x, info.point.y);
      reshuffleStack(card.id);
    } else {
      // Return to stack
      setCardStatus(card.id, 'stack');
      x.set(0);
      y.set(0);
    }
  };

  const isStacked = card.status === 'stack';
  const isDragging = card.status === 'dragging';

  // Base styling for stack cards vs hung cards
  const stackScale = 1 - index * 0.04;
  const stackY = index * 10;

  // Generate random rotation for lift effect (-3 to 3 deg)
  const [randomRotate] = useState(() => (Math.random() - 0.5) * 6);

  return (
    <motion.div
      layout
      style={{
        x: isStacked ? xSpring : card.x,
        y: isStacked ? ySpring : card.y,
        rotate: isStacked ? rotate : randomRotate,
        zIndex: isDragging ? 999 : (total - index),
      }}
      drag={isTop || card.status !== 'stack'}
      dragElastic={0.2}
      dragMomentum={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{
        scale: 1.05,
        rotate: randomRotate,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
        cursor: 'grabbing'
      }}
      initial={isStacked ? { scale: 0.8, y: 40, opacity: 0 } : false}
      animate={isStacked ? {
        scale: stackScale,
        y: stackY,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }
      } : {
        scale: 0.7,
        rotate: randomRotate,
        opacity: 0.8,
        transition: { type: "spring", stiffness: 200, damping: 20 }
      }}
      className={cn(
        "absolute w-full h-[640px] max-w-[480px] bg-luxury-gray border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] cursor-grab group/card transition-colors duration-300",
        isTop && isStacked ? 'ring-1 ring-white/10' : '',
        card.status !== 'stack' ? 'hover:ring-1 hover:ring-white/20' : ''
      )}
    >
      <div className="h-full flex flex-col relative pointer-events-none">
        {/* Make inner content pointer-events-auto where needed so drag still works on the card body */}

        {/* Image Section */}
        <div className="h-[55%] relative overflow-hidden pointer-events-auto">
          <motion.img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover grayscale opacity-40 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-1000"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            referrerPolicy="no-referrer"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-gray via-transparent to-transparent pointer-events-none" />

          <motion.div
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-white/10 z-10 pointer-events-none"
          />

          <button
            onPointerDown={(e) => { e.stopPropagation(); }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="absolute top-8 right-8 w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 z-20 pointer-events-auto"
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
        <div className="p-10 flex-1 flex flex-col pointer-events-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.5em]">Project {String(card.id).padStart(2, '0')}</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.5em]">{card.tech[0]}</span>
          </div>

          <h3 className="text-3xl font-serif italic mb-4 tracking-tight leading-none">{card.title}</h3>
          <p className="text-white/30 text-xs leading-relaxed mb-8 flex-1 font-light tracking-wide line-clamp-3">
            {card.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <a
              href={card.liveUrl}
              target="_blank"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center py-4 bg-white text-black text-[8px] font-mono uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all z-20 pointer-events-auto"
            >
              Launch
            </a>
            <a
              href={card.codeUrl}
              target="_blank"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center py-4 border border-white/5 text-[8px] font-mono uppercase tracking-[0.4em] rounded-full hover:bg-white/5 transition-all z-20 pointer-events-auto"
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
              className="absolute inset-0 bg-luxury-black/95 z-30 flex flex-col p-12 pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.6em]">Technical Spec</span>
                <button onClick={() => setIsExpanded(false)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
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
                    {card.tech.map(f => (
                      <div key={f} className="flex items-center justify-between py-3 border-b border-white/5">
                        <span className="text-[10px] font-light text-white/40 uppercase tracking-widest">{f}</span>
                        <Sparkles className="w-3 h-3 text-white/10" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <a
                href={card.liveUrl}
                target="_blank"
                className="mt-8 w-full py-5 bg-white text-black font-mono text-[8px] uppercase tracking-[0.5em] rounded-full text-center hover:scale-105 transition-transform"
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
