'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    item: MenuItem, 
    quantity?: number, 
    addons?: { id: string; name: string; price: number }[],
    spiceLevel?: string,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('dine_divine_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dine_divine_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedAddons: { id: string; name: string; price: number }[] = [],
    spiceLevel?: string,
    specialInstructions?: string
  ) => {
    const addonsKey = selectedAddons.map(a => a.id).sort().join('-');
    const cartItemId = `${item.id}-${spiceLevel || 'default'}-${addonsKey}`;

    const addonsCost = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
    const unitPrice = item.price + addonsCost;

    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: newQty * unitPrice,
        };
        return updated;
      }

      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity,
          selectedAddons,
          spiceLevel,
          specialInstructions,
          itemTotal: quantity * unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            const addonsCost = ci.selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
            const unitPrice = ci.item.price + addonsCost;
            return {
              ...ci,
              quantity: newQty,
              itemTotal: newQty * unitPrice,
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const subtotal = cart.reduce((acc, ci) => acc + ci.itemTotal, 0);
  const tax = subtotal * 0.05;
  const deliveryFee = subtotal > 0 ? (subtotal > 35 ? 0 : 2.99) : 0;
  const grandTotal = subtotal + tax + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        tax,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
