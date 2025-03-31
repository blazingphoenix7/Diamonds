'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  caratSize: number;
  metalType: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getDiscountedTotal: (discountPercentage: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => 
          item.id === newItem.id && 
          item.caratSize === newItem.caratSize && 
          item.metalType === newItem.metalType
        );
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === newItem.id && 
              item.caratSize === newItem.caratSize && 
              item.metalType === newItem.metalType
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...newItem, quantity: 1 }]
        };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === id
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce(
          (count, item) => count + item.quantity, 
          0
        );
      },
      
      getDiscountedTotal: (discountPercentage) => {
        const totalPrice = get().getTotalPrice();
        const discountAmount = totalPrice * (discountPercentage / 100);
        return totalPrice - discountAmount;
      },
    }),
    {
      name: 'diamond-cart-storage',
    }
  )
);
