'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DiscountState {
  discount: number;
  competitorsPassed: number;
  maxDiscount: number;
  incrementPerCompetitor: number;
  setDiscount: (discount: number) => void;
  incrementDiscount: () => void;
  resetDiscount: () => void;
  setCompetitorsPassed: (count: number) => void;
  incrementCompetitorsPassed: () => void;
}

export const useDiscountStore = create<DiscountState>()(
  persist(
    (set) => ({
      discount: 0,
      competitorsPassed: 0,
      maxDiscount: 50,
      incrementPerCompetitor: 10,
      
      setDiscount: (discount) => set({ discount }),
      
      incrementDiscount: () => 
        set((state) => ({ 
          discount: Math.min(
            state.discount + state.incrementPerCompetitor, 
            state.maxDiscount
          ) 
        })),
      
      resetDiscount: () => set({ discount: 0, competitorsPassed: 0 }),
      
      setCompetitorsPassed: (count) => set({ competitorsPassed: count }),
      
      incrementCompetitorsPassed: () => 
        set((state) => ({ 
          competitorsPassed: state.competitorsPassed + 1,
          discount: Math.min(
            (state.competitorsPassed + 1) * state.incrementPerCompetitor, 
            state.maxDiscount
          )
        })),
    }),
    {
      name: 'diamond-discount-storage',
    }
  )
);
