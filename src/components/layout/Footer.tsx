'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Heart, ShieldCheck } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#141414] text-white relative pt-20 pb-24 lg:pb-12 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#FFF8F1]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B91C1C] to-[#EA580C] flex items-center justify-center shadow-lg border border-[#FACC15]/40">
                <span className="font-heading text-2xl font-bold text-[#FFF8F1]">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold tracking-wider leading-none text-[#FFF8F1]">
                  DINE DIVINE CUISINE
                </span>
                <span className="text-[9px] tracking-widest text-[#FACC15] uppercase font-bold">
                  RAWALPINDI • PAKISTAN
                </span>
              </div>
            </div>

            <p className="text-xs text-[#EFE6DA]/70 font-subheading leading-relaxed mb-6 max-w-sm">
              Fresh Flavor. Every Bite. Every Time. Indulge in artisanal fast food crafted with 100% certified Halal ingredients and fiery secret spice marinades.
            </p>

            <div className="max-w-sm">
              <span className="text-xs font-subheading font-bold text-white block mb-2">
                Subscribe for Exclusive Deals & Secret Discounts
              </span>
              {subscribed ? (
                <div className="text-xs text-[#22C55E] font-subheading font-bold bg-[#22C55E]/10 p-2.5 rounded-xl border border-[#22C55E]/30">
                  ✓ Successfully Subscribed! Check your inbox soon.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs font-subheading bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#EA580C]"
                  />
                  <button
                    type="submit"
                    className="btn-gradient text-white px-4 py-2.5 rounded-xl text-xs font-subheading font-bold flex items-center gap-1 shadow-md"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-[#FACC15] mb-4">QUICK LINKS</h4>
            <ul className="space-y-2.5 text-xs font-subheading text-[#EFE6DA]/80">
              <li><a href="#hero" className="hover:text-[#EA580C] transition-colors">Home Page</a></li>
              <li><a href="#menu" className="hover:text-[#EA580C] transition-colors">Popular Menu</a></li>
              <li><a href="#deals" className="hover:text-[#EA580C] transition-colors">Daily Deals</a></li>
              <li><a href="#about" className="hover:text-[#EA580C] transition-colors">Chef's Choice</a></li>
              <li><a href="#gallery" className="hover:text-[#EA580C] transition-colors">Our Gallery</a></li>
              <li><a href="#faq" className="hover:text-[#EA580C] transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-[#FACC15] mb-4">SERVICES</h4>
            <ul className="space-y-2 text-xs font-subheading text-[#EFE6DA]/80 mb-6">
              <li className="flex items-center gap-2">✓ Dine-In Family VIP</li>
              <li className="flex items-center gap-2">✓ Express Takeaway</li>
              <li className="flex items-center gap-2">✓ 25-Min Thermal Delivery</li>
            </ul>

            <h4 className="font-heading text-xl font-bold text-[#FACC15] mb-2">OPENING HOURS</h4>
            <p className="text-xs font-subheading text-[#EFE6DA]/70 leading-relaxed">
              Mon – Sun: 12:00 PM – 3:00 AM <br />
              (7 Days A Week)
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-[#FACC15] mb-4">LOCATION & CONTACT</h4>
            <div className="space-y-3 text-xs font-subheading text-[#EFE6DA]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>Food Street, AECHS, Rawalpindi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#EA580C] shrink-0" />
                <a href="tel:+923338280577" className="hover:text-white">+92 333 8280577</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EA580C] shrink-0" />
                <a href="mailto:adenazeem595959@gmail.com" className="hover:text-white">adenazeem595959@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <FaInstagram className="w-4 h-4 text-[#EA580C] shrink-0" />
                <a
                  href="https://instagram.com/dine_divine_cuisine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#EA580C] transition-colors underline"
                >
                  @dine_divine_cuisine
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-subheading text-[#EFE6DA]/60">
          <p>© {new Date().getFullYear()} Dine Divine Cuisine. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#B91C1C] text-[#B91C1C]" />
            <span>for Rawalpindi Food Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
