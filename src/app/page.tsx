'use client';

import React from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { PopularMenu } from '@/components/sections/PopularMenu';
import { ChefRecommendation } from '@/components/sections/ChefRecommendation';
import { DailyDeals } from '@/components/sections/DailyDeals';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { DeliveryCalculator } from '@/components/sections/DeliveryCalculator';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { InstagramGrid } from '@/components/sections/InstagramGrid';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { ReservationModal } from '@/components/ui/ReservationModal';
import { CustomerAuthModal } from '@/components/ui/CustomerAuthModal';
import { OrderTrackerModal } from '@/components/ui/OrderTrackerModal';
import { LightboxModal } from '@/components/ui/LightboxModal';
import { FloatingActions } from '@/components/ui/FloatingActions';

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
      <PopularMenu />
      <ChefRecommendation />
      <DailyDeals />
      <WhyChooseUs />
      <DeliveryCalculator />
      <Gallery />
      <Testimonials />
      <StatsCounter />
      <InstagramGrid />
      <FAQSection />
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals & Actions */}
      <QuickViewModal />
      <CartDrawer />
      <ReservationModal />
      <CustomerAuthModal />
      <OrderTrackerModal />
      <LightboxModal />
      <FloatingActions />
    </main>
  );
}
