'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { SiteProvider } from '@/context/SiteContext';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ModalProvider } from '@/context/ModalContext';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <SiteProvider>
        <CartProvider>
          <FavoritesProvider>
            <ModalProvider>
              <SmoothScrollProvider>{children}</SmoothScrollProvider>
            </ModalProvider>
          </FavoritesProvider>
        </CartProvider>
      </SiteProvider>
    </AuthProvider>
  );
};
