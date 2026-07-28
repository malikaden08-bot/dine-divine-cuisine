'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Flame, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export const Hero: React.FC = () => {
  const { siteSettings } = useSite();
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#1E1E1E] text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=2000&q=90"
          alt="Dine Divine Cuisine Gourmet Feast"
          className="w-full h-full object-cover object-center opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/75 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#EA580C]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-8 lg:left-24 w-16 lg:w-24 h-16 lg:h-24 pointer-events-none z-10 opacity-75"
      >
        <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80" alt="Fresh Tomato" className="w-full h-full object-contain rounded-full shadow-2xl blur-[0.5px]" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-32 right-10 lg:right-28 w-20 lg:w-28 h-20 lg:h-28 pointer-events-none z-10 opacity-70"
      >
        <img src="https://images.unsplash.com/photo-1583663848850-46af132dc08e?auto=format&fit=crop&w=200&q=80" alt="Fresh Basil Leaf" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/3 right-8 lg:right-16 w-12 lg:w-16 h-12 lg:h-16 pointer-events-none z-10 opacity-65 hidden md:block"
      >
        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80" alt="Melting Cheese Slice" className="w-full h-full object-contain rounded-full shadow-lg" />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-dark text-xs sm:text-sm font-subheading font-medium text-[#FACC15] mb-6 border border-[#EA580C]/40 shadow-lg"
        >
          <Flame className="w-4 h-4 text-[#EA580C] animate-pulse" />
          <span>{siteSettings.heroTagline}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFF8F1] max-w-5xl leading-[0.95] drop-shadow-lg uppercase"
        >
          {siteSettings.heroHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-xl text-[#EFE6DA]/90 max-w-2xl font-subheading font-normal leading-relaxed"
        >
          {siteSettings.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs font-subheading text-[#EFE6DA]/80"
        >
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>100% Certified Halal</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
            <Clock className="w-4 h-4 text-[#FACC15]" />
            <span>25-Min Express Delivery</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-[#EA580C]" />
            <span>4.9★ Rated Local Favorite</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#menu"
            className="w-full sm:w-auto btn-gradient text-white px-8 py-4 rounded-full font-subheading text-base font-bold uppercase tracking-wider shadow-xl shadow-[#B91C1C]/40 flex items-center justify-center gap-3"
          >
            <span>Order Now</span>
            <Flame className="w-5 h-5" />
          </a>
          <a
            href="#deals"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-subheading text-base font-bold text-white border border-white/30 hover:border-[#EA580C] hover:bg-[#EA580C]/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Deals</span>
          </a>
        </motion.div>

        <motion.a
          href="#categories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 sm:mt-24 flex flex-col items-center gap-2 text-xs font-subheading text-[#EFE6DA]/60 hover:text-[#FACC15] transition-colors group"
        >
          <span>SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FACC15]"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};
