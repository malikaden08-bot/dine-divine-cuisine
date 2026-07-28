'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu as MenuIcon, X, Calendar, User, Bike, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { openReservationModal, openCustomerAuthModal, openOrderTrackerModal } = useModal();
  const { user, isCustomer, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'Deals', href: '#deals' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8F1]/90 backdrop-blur-md shadow-md py-3 border-b border-[#EFE6DA]'
            : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B91C1C] to-[#EA580C] flex items-center justify-center shadow-lg shadow-[#B91C1C]/30 border border-[#FACC15]/40 transition-transform group-hover:scale-105">
              <span className="font-heading text-2xl font-bold text-[#FFF8F1]">D</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-heading text-2xl font-bold tracking-wider leading-none transition-colors ${
                isScrolled ? 'text-[#1E1E1E]' : 'text-white'
              }`}>
                DINE DIVINE
              </span>
              <span className="text-[9px] tracking-widest text-[#EA580C] uppercase font-bold">
                CUISINE • RAWALPINDI
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-subheading text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:text-[#EA580C] py-1 ${
                  isScrolled ? 'text-[#222222]' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => openOrderTrackerModal()}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-subheading text-xs font-semibold border transition-all ${
                isScrolled
                  ? 'border-[#EA580C]/40 text-[#EA580C] hover:bg-[#EA580C]/10'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={openCustomerAuthModal}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-subheading font-bold"
                >
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="truncate max-w-[90px]">{user.name.split(' ')[0]}</span>
                </button>
                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-400" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openCustomerAuthModal}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-subheading text-xs font-semibold border transition-all ${
                  isScrolled
                    ? 'border-[#1E1E1E]/30 text-[#1E1E1E] hover:bg-[#1E1E1E]/5'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'bg-[#EFE6DA]/60 text-[#1E1E1E] hover:bg-[#EFE6DA]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B91C1C] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="#menu"
              className="btn-gradient text-white px-5 py-2 rounded-full font-subheading text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <span>Order Now</span>
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => openOrderTrackerModal()}
              className={`p-2 rounded-full ${isScrolled ? 'text-[#EA580C]' : 'text-white'}`}
            >
              <Bike className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full ${isScrolled ? 'text-[#1E1E1E]' : 'text-white'}`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B91C1C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-[#1E1E1E]' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-7 h-7 text-[#B91C1C]" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[64px] left-0 right-0 bg-[#FFF8F1] z-30 border-b border-[#EFE6DA] shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-subheading text-lg font-semibold text-[#1E1E1E] hover:text-[#B91C1C] transition-colors py-1 border-b border-[#EFE6DA]/50"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-3">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openCustomerAuthModal();
                  }}
                  className="w-full bg-[#1E1E1E] text-white py-3 rounded-xl font-subheading text-sm font-bold flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#FACC15]" />
                  <span>{user ? `Account (${user.name})` : 'Customer Login'}</span>
                </button>
                <a
                  href="#menu"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full btn-gradient text-white text-center py-3 rounded-xl font-subheading text-sm font-bold uppercase tracking-wider shadow-md"
                >
                  Order Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
