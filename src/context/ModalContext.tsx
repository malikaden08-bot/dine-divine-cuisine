'use client';

import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from '@/types';

interface ModalContextType {
  quickViewItem: MenuItem | null;
  openQuickView: (item: MenuItem) => void;
  closeQuickView: () => void;

  isReservationOpen: boolean;
  openReservationModal: () => void;
  closeReservationModal: () => void;

  isCustomerAuthOpen: boolean;
  openCustomerAuthModal: () => void;
  closeCustomerAuthModal: () => void;

  isOrderTrackerOpen: boolean;
  trackingOrderId: string;
  openOrderTrackerModal: (orderId?: string) => void;
  closeOrderTrackerModal: () => void;

  lightboxImage: { url: string; title: string } | null;
  openLightbox: (url: string, title: string) => void;
  closeLightbox: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const openQuickView = (item: MenuItem) => setQuickViewItem(item);
  const closeQuickView = () => setQuickViewItem(null);

  const openReservationModal = () => setIsReservationOpen(true);
  const closeReservationModal = () => setIsReservationOpen(false);

  const openCustomerAuthModal = () => setIsCustomerAuthOpen(true);
  const closeCustomerAuthModal = () => setIsCustomerAuthOpen(false);

  const openOrderTrackerModal = (orderId?: string) => {
    if (orderId) setTrackingOrderId(orderId);
    setIsOrderTrackerOpen(true);
  };
  const closeOrderTrackerModal = () => setIsOrderTrackerOpen(false);

  const openLightbox = (url: string, title: string) => setLightboxImage({ url, title });
  const closeLightbox = () => setLightboxImage(null);

  return (
    <ModalContext.Provider
      value={{
        quickViewItem,
        openQuickView,
        closeQuickView,

        isReservationOpen,
        openReservationModal,
        closeReservationModal,

        isCustomerAuthOpen,
        openCustomerAuthModal,
        closeCustomerAuthModal,

        isOrderTrackerOpen,
        trackingOrderId,
        openOrderTrackerModal,
        closeOrderTrackerModal,

        lightboxImage,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
