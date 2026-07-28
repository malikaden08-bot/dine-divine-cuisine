'use client';

import React from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { Footer } from '@/components/layout/Footer';

import { QuickViewModal } from '@/components/ui/QuickViewModal';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Preloader */}
      <LoadingScreen />

      {/* Header & Sticky Navbar */}
      <Navbar />

      {/* Main Sections */}
      <Hero />
      <Categories />

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modal */}
      <QuickViewModal />
    </main>
  );
}
