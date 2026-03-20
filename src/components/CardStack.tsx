import React from 'react';
import { AnimatePresence } from 'motion/react';
import { Card } from './Card';
import { useCardStore } from '../store/useCardStore';

export function CardStack() {
  const { cards } = useCardStore();

  // Only display cards that are in the stack or dragging (since dragging starts from stack visually)
  const stackCards = cards
    .filter(c => c.status === 'stack' || c.status === 'dragging')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative w-full h-[640px] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {stackCards.map((card, index) => {
          // If a card is dragging, it technically leaves the neat stack ordering visually,
          // but logically we keep it here to render it.
          const visualIndex = card.status === 'dragging' ? -1 : stackCards.filter(c => c.status === 'stack').findIndex(c => c.id === card.id);

          return (
            <Card
              key={card.id}
              card={card}
              index={visualIndex === -1 ? 0 : visualIndex}
              total={stackCards.length}
              isTop={visualIndex === 0 || card.status === 'dragging'}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
