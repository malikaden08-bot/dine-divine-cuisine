'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FEATURED_CATEGORIES } from '@/data/menu';
import { ArrowRight } from 'lucide-react';

export const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-20 bg-[#FFF8F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#EA580C] font-subheading text-xs font-bold uppercase tracking-widest"
            >
              Crafted To Perfection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl font-bold text-[#1E1E1E] mt-1"
            >
              FEATURED CATEGORIES
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6B7280] font-subheading text-sm sm:text-base max-w-md mt-4 md:mt-0"
          >
            Explore our artisanal culinary selections. From flamed smash burgers to 900°F blistered sourdough pizzas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href="#menu"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-lg border border-[#EFE6DA] block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#B91C1C] text-white px-3 py-1 rounded-full text-xs font-subheading font-bold shadow-md">
                {cat.itemCount}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
                <h3 className="font-heading text-3xl font-bold tracking-wide group-hover:text-[#FACC15] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#EFE6DA]/80 font-subheading line-clamp-2 mt-1 mb-4">
                  {cat.description}
                </p>

                <div className="flex items-center text-xs font-subheading font-bold text-[#EA580C] group-hover:text-[#FACC15] transition-colors gap-2">
                  <span>EXPLORE CATEGORY</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
