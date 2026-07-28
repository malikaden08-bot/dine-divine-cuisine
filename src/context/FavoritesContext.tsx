'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dine_divine_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse favorites', e);
    }
  }, []);

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(itemId);
      const next = isFav ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      try {
        localStorage.setItem('dine_divine_favorites', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to store favorites', e);
      }
      return next;
    });
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
