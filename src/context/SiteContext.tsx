'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, MenuItemCategory } from '@/types';
import { MENU_ITEMS as initialMenuItems } from '@/data/menu';

export interface OrderRecord {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  paymentSlipUrl?: string;
  orderStatus: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface PaymentMethodConfig {
  id: string;
  name: string;
  type: 'CoD' | 'JazzCash' | 'EasyPaisa' | 'BankTransfer' | 'Stripe';
  enabled: boolean;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  iban?: string;
  instructions?: string;
}

export interface SiteSettings {
  heroHeadline: string;
  heroTagline: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
  dineInHours: string;
  deliveryHours: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  instagramUrl: string;
}

interface SiteContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleStockStatus: (id: string) => void;

  orders: OrderRecord[];
  placeOrder: (newOrder: Omit<OrderRecord, 'orderId' | 'createdAt'>) => OrderRecord;
  updateOrderStatus: (orderId: string, status: OrderRecord['orderStatus']) => void;

  paymentMethods: PaymentMethodConfig[];
  updatePaymentMethod: (id: string, config: Partial<PaymentMethodConfig>) => void;

  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
}

const initialPaymentMethods: PaymentMethodConfig[] = [
  {
    id: 'pm-cod',
    name: 'Cash on Delivery (CoD)',
    type: 'CoD',
    enabled: true,
    instructions: 'Pay in cash upon doorstep delivery or takeaway pick up.',
  },
  {
    id: 'pm-jazzcash',
    name: 'JazzCash Mobile Wallet',
    type: 'JazzCash',
    enabled: true,
    accountName: 'Dine Divine Cuisine',
    accountNumber: '0333 8280577',
    instructions: 'Transfer order amount to JazzCash account 03338280577 and present transaction ID to rider.',
  },
  {
    id: 'pm-easypaisa',
    name: 'EasyPaisa Mobile Wallet',
    type: 'EasyPaisa',
    enabled: true,
    accountName: 'Dine Divine Cuisine',
    accountNumber: '0333 8280577',
    instructions: 'Transfer to EasyPaisa account 03338280577 and attach screenshot.',
  },
  {
    id: 'pm-bank',
    name: 'Direct Bank Transfer',
    type: 'BankTransfer',
    enabled: true,
    bankName: 'Meezan Bank Ltd.',
    accountName: 'Dine Divine Cuisine',
    accountNumber: '01020304050607',
    iban: 'PK36MEZN0001020304050607',
    instructions: 'Deposit into Meezan Bank account PK36MEZN0001020304050607.',
  },
  {
    id: 'pm-stripe',
    name: 'Credit / Debit Card (Stripe)',
    type: 'Stripe',
    enabled: true,
    instructions: 'Pay securely using Visa, MasterCard, or UnionPay.',
  },
];

const defaultSettings: SiteSettings = {
  heroHeadline: 'FRESH FLAVOR. EVERY BITE. EVERY TIME.',
  heroTagline: 'Rawalpindi’s Premier Fast-Food Landmark • AECHS Food Street',
  heroSubtitle: 'Indulge in artisanal double-smash Angus beef burgers, 100% sourdough pizzas, and golden hand-breaded 11-spice crispy chicken.',
  phone: '+92 333 8280577',
  email: 'adenazeem595959@gmail.com',
  address: 'Food Street, Airport Employee Cooperative Housing Society (AECHS), Rawalpindi, Pakistan',
  dineInHours: '12:00 PM – 1:00 AM',
  deliveryHours: '12:00 PM – 3:00 AM',
  freeDeliveryThreshold: 35,
  standardDeliveryFee: 2.99,
  instagramUrl: 'https://instagram.com/dine_divine_cuisine',
};

const initialMockOrders: OrderRecord[] = [];

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [orders, setOrders] = useState<OrderRecord[]>(initialMockOrders);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodConfig[]>(initialPaymentMethods);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    try {
      const savedMenu = localStorage.getItem('dine_divine_menu_items');
      if (savedMenu) setMenuItems(JSON.parse(savedMenu));

      const savedOrders = localStorage.getItem('dine_divine_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedPayments = localStorage.getItem('dine_divine_payments');
      if (savedPayments) setPaymentMethods(JSON.parse(savedPayments));

      const savedSettings = localStorage.getItem('dine_divine_settings');
      if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.error('Failed to parse site context from local storage', e);
    }
  }, []);

  const saveMenu = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem('dine_divine_menu_items', JSON.stringify(items));
  };

  const saveOrders = (ordList: OrderRecord[]) => {
    setOrders(ordList);
    localStorage.setItem('dine_divine_orders', JSON.stringify(ordList));
  };

  const savePayments = (pList: PaymentMethodConfig[]) => {
    setPaymentMethods(pList);
    localStorage.setItem('dine_divine_payments', JSON.stringify(pList));
  };

  const saveSettings = (sets: SiteSettings) => {
    setSiteSettings(sets);
    localStorage.setItem('dine_divine_settings', JSON.stringify(sets));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    saveMenu([newItem, ...menuItems]);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    saveMenu(menuItems.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  };

  const deleteMenuItem = (id: string) => {
    saveMenu(menuItems.filter((m) => m.id !== id));
  };

  const toggleStockStatus = (id: string) => {
    saveMenu(
      menuItems.map((m) => (m.id === id ? { ...m, isPopular: !m.isPopular } : m))
    );
  };

  const placeOrder = (newOrderData: Omit<OrderRecord, 'orderId' | 'createdAt'>): OrderRecord => {
    const newRecord: OrderRecord = {
      ...newOrderData,
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just Now',
    };
    saveOrders([newRecord, ...orders]);
    return newRecord;
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['orderStatus']) => {
    saveOrders(
      orders.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  const updatePaymentMethod = (id: string, config: Partial<PaymentMethodConfig>) => {
    savePayments(
      paymentMethods.map((p) => (p.id === id ? { ...p, ...config } : p))
    );
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    saveSettings({ ...siteSettings, ...settings });
  };

  return (
    <SiteContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleStockStatus,

        orders,
        placeOrder,
        updateOrderStatus,

        paymentMethods,
        updatePaymentMethod,

        siteSettings,
        updateSiteSettings,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
