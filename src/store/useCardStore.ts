import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CardStatus = 'stack' | 'dragging' | 'hung-left' | 'hung-right';

export interface Card {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  codeUrl: string;
  status: CardStatus;
  order: number;
  x?: number;
  y?: number;
}

const INITIAL_TEMPLATES: Partial<Card>[] = [
  {
    id: "1",
    title: "Aura Dashboard",
    description: "A study in fluid data visualization. High-precision analytics for the next generation of digital architects.",
    tech: ["React", "D3.js", "TypeScript"],
    image: "https://picsum.photos/seed/aura/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: "2",
    title: "Ethereal Landing",
    description: "Minimalist editorial architecture. Designed for high-end luxury brands and cultural institutions.",
    tech: ["Next.js", "Framer", "Tailwind"],
    image: "https://picsum.photos/seed/ethereal/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: "3",
    title: "Prism Interface",
    description: "Advanced glass-morphism chat system. Real-time neural processing with refined typography.",
    tech: ["React", "Lucide", "Node.js"],
    image: "https://picsum.photos/seed/prism/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: "4",
    title: "Zenith Portfolio",
    description: "The ultimate showcase for creative visionaries. Fluid transitions and immersive project galleries.",
    tech: ["React", "Motion", "Three.js"],
    image: "https://picsum.photos/seed/zenith/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  },
  {
    id: "5",
    title: "Onyx Commerce",
    description: "Premium retail experience. Seamless transactions wrapped in a sophisticated dark aesthetic.",
    tech: ["Next.js", "Stripe", "Prisma"],
    image: "https://picsum.photos/seed/onyx/1200/800",
    liveUrl: "https://tvn-core.vercel.app/",
    codeUrl: "https://github.com/tvnetwork/tvn-core"
  }
];

const initializeCards = (): Card[] => {
  return INITIAL_TEMPLATES.map((t, index) => ({
    ...t,
    status: 'stack',
    order: index,
  })) as Card[];
};

interface CardStoreState {
  cards: Card[];
  setCardStatus: (id: string, status: CardStatus) => void;
  updateCardPosition: (id: string, x: number, y: number) => void;
  reshuffleStack: (topCardId: string) => void;
  restoreToStack: (id: string) => void;
  reset: () => void;
}

export const useCardStore = create<CardStoreState>()(
  persist(
    (set) => ({
      cards: initializeCards(),

      setCardStatus: (id, status) => set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id ? { ...card, status } : card
        )
      })),

      updateCardPosition: (id, x, y) => set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id ? { ...card, x, y } : card
        )
      })),

      reshuffleStack: (topCardId) => set((state) => {
        // Move top card to the back (highest order)
        const updatedCards = [...state.cards];
        const topCardIndex = updatedCards.findIndex(c => c.id === topCardId);

        if (topCardIndex === -1) return { cards: state.cards };

        const topCard = updatedCards.splice(topCardIndex, 1)[0];

        // Decrement order of all other cards in stack
        updatedCards.forEach(c => {
          if (c.status === 'stack' || c.status === 'dragging') {
             // Order logic: we want it to be conceptually at the bottom
          }
        });

        // This logic reorders them by changing the index.
        // If it's a simple reorder, we can just push it to the end and recalculate order.
        updatedCards.push(topCard);

        const finalCards = updatedCards.map((c, i) => {
            if (c.status === 'stack') {
                return { ...c, order: i };
            }
            return c;
        });

        return { cards: finalCards };
      }),

      restoreToStack: (id) => set((state) => {
         const updatedCards = state.cards.map(card => {
            if (card.id === id) {
               return { ...card, status: 'stack' as CardStatus, x: undefined, y: undefined };
            }
            return card;
         });

         // Recalculate orders for stack items
         const stackItems = updatedCards.filter(c => c.status === 'stack');
         const finalCards = updatedCards.map(c => {
             if (c.status === 'stack') {
                 return { ...c, order: stackItems.findIndex(sc => sc.id === c.id) };
             }
             return c;
         });

         return { cards: finalCards };
      }),

      reset: () => set({ cards: initializeCards() })
    }),
    {
      name: 'card-store',
      // Only persist positions and statuses, or optionally full state
    }
  )
);
