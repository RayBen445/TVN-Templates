import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCardStore } from '../store/useCardStore';
import { cn } from '../lib/utils';
import { Undo2 } from 'lucide-react';

interface HangZoneProps {
  side: 'left' | 'right';
}

export function HangZone({ side }: HangZoneProps) {
  const { cards, restoreToStack } = useCardStore();
  const status = side === 'left' ? 'hung-left' : 'hung-right';
  const hungCards = cards.filter(c => c.status === status);

  const isDragging = cards.some(c => c.status === 'dragging');

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start h-full p-8 transition-colors duration-500",
        isDragging ? "bg-white/[0.02] border border-white/10 rounded-[3rem]" : "border border-transparent rounded-[3rem]",
        "hidden lg:flex" // Hide on small screens for simplicity, or we can make it a bottom tray
      )}
    >
      <div className="absolute top-8 text-[8px] font-mono uppercase tracking-[0.5em] text-white/20 mb-12">
        {side} Zone
      </div>

      <div className="flex flex-col gap-6 mt-16 w-full max-w-[280px]">
        <AnimatePresence>
          {hungCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                // Subtle swing animation
                rotate: [0, side === 'left' ? -2 : 2, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="relative aspect-[3/4] w-full bg-luxury-gray rounded-2xl overflow-hidden border border-white/10 group shadow-2xl cursor-pointer"
              onClick={() => restoreToStack(card.id)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-serif italic text-lg leading-tight truncate">{card.title}</h4>
                <p className="text-[8px] font-mono text-white/50 uppercase tracking-widest mt-1">Click to restore</p>
              </div>

              {/* Restore Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                  <Undo2 className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hungCards.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest text-center px-4">
            Drag cards here<br/>to hang
          </p>
        </div>
      )}
    </div>
  );
}
