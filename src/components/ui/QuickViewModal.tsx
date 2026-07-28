'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { X, Star, Clock, Flame, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const QuickViewModal: React.FC = () => {
  const { quickViewItem, closeQuickView } = useModal();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<string>('Medium');
  const [selectedAddons, setSelectedAddons] = useState<{ id: string; name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewItem) return null;

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) return prev.filter((a) => a.id !== addon.id);
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  const totalItemPrice = (quickViewItem.price + addonsTotal) * quantity;

  const handleConfirmAddToCart = () => {
    addToCart(quickViewItem, quantity, selectedAddons, selectedSpice, specialInstructions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full z-10 border border-[#EFE6DA]"
        >
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#B91C1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full bg-gray-100 min-h-[300px]">
              <img
                src={quickViewItem.image}
                alt={quickViewItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
              <div>
                <span className="text-[10px] text-[#EA580C] font-subheading font-bold uppercase tracking-widest">
                  {quickViewItem.category}
                </span>

                <h3 className="font-subheading text-2xl font-bold text-[#1E1E1E] leading-snug mt-1">
                  {quickViewItem.name}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[#6B7280] font-subheading mt-2 mb-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                    <strong className="text-[#1E1E1E]">{quickViewItem.rating}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#EA580C]" /> {quickViewItem.prepTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#B91C1C]" /> {quickViewItem.calories} kcal
                  </span>
                </div>

                <p className="text-xs text-[#6B7280] font-subheading leading-relaxed mb-6">
                  {quickViewItem.description}
                </p>

                {quickViewItem.spiceLevel && (
                  <div className="mb-6">
                    <label className="block text-xs font-subheading font-bold text-[#1E1E1E] mb-2">
                      Choose Spice Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSelectedSpice(lvl)}
                          className={`py-2 text-[11px] font-subheading font-semibold rounded-xl border transition-all ${
                            selectedSpice === lvl
                              ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-sm'
                              : 'border-[#EFE6DA] text-[#6B7280] hover:border-[#EA580C]'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quickViewItem.addons && quickViewItem.addons.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-subheading font-bold text-[#1E1E1E] mb-2">
                      Extra Addons & Toppings
                    </label>
                    <div className="space-y-2">
                      {quickViewItem.addons.map((addon) => {
                        const checked = selectedAddons.some((a) => a.id === addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon)}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-subheading cursor-pointer transition-all ${
                              checked
                                ? 'border-[#EA580C] bg-[#EA580C]/5 font-semibold text-[#1E1E1E]'
                                : 'border-[#EFE6DA] text-[#6B7280]'
                            }`}
                          >
                            <span>{addon.name}</span>
                            <span className="font-bold text-[#B91C1C]">+{formatPrice(addon.price)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#EFE6DA] mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 bg-[#FFF8F1] px-3 py-1.5 rounded-full border border-[#EFE6DA]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-full bg-white text-[#1E1E1E] flex items-center justify-center font-bold shadow-sm"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-subheading text-sm font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 rounded-full bg-white text-[#1E1E1E] flex items-center justify-center font-bold shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#6B7280] font-subheading block uppercase">Total</span>
                    <span className="font-heading text-2xl font-bold text-[#B91C1C]">
                      {formatPrice(totalItemPrice)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmAddToCart}
                  className={`w-full py-3.5 rounded-xl font-subheading text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isAdded ? 'bg-[#22C55E] text-white' : 'btn-gradient text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added To Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add To Order ({formatPrice(totalItemPrice)})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
