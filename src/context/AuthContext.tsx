'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar: string;
  role: 'ADMIN' | 'CUSTOMER';
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isCustomer: boolean;
  loginWithGoogle: (isCustomer?: boolean) => Promise<void>;
  loginCustomerEmail: (email: string, name?: string, phone?: string, address?: string) => void;
  loginWithPasscode: (passcode: string) => boolean;
  updateCustomerProfile: (profile: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('dine_divine_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    }
  }, []);

  const loginWithGoogle = async (isCustomer = false) => {
    const mockProfile: UserProfile = {
      id: `usr-google-${Date.now()}`,
      name: isCustomer ? 'Customer (Google OAuth)' : 'Manager (Google OAuth)',
      email: isCustomer ? 'customer.foodie@gmail.com' : 'manager.dinedivine@gmail.com',
      phone: isCustomer ? '+92 300 1234567' : '+92 333 8280577',
      address: isCustomer ? 'House 14, AECHS Sector A, Rawalpindi' : 'Food Street AECHS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: isCustomer ? 'CUSTOMER' : 'ADMIN',
    };
    setUser(mockProfile);
    localStorage.setItem('dine_divine_user', JSON.stringify(mockProfile));
  };

  const loginCustomerEmail = (email: string, name = 'Valued Customer', phone = '', address = '') => {
    const customerProfile: UserProfile = {
      id: `usr-cust-${Date.now()}`,
      name: name || 'Valued Customer',
      email,
      phone: phone || '+92 300 1234567',
      address: address || 'Rawalpindi, Pakistan',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      role: 'CUSTOMER',
    };
    setUser(customerProfile);
    localStorage.setItem('dine_divine_user', JSON.stringify(customerProfile));
  };

  const loginWithPasscode = (passcode: string): boolean => {
    if (passcode === 'admin123' || passcode === 'divine2026') {
      const adminProfile: UserProfile = {
        id: 'usr-passcode-admin',
        name: 'Executive Admin',
        email: 'admin@dinedivinecuisine.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        role: 'ADMIN',
      };
      setUser(adminProfile);
      localStorage.setItem('dine_divine_user', JSON.stringify(adminProfile));
      return true;
    }
    return false;
  };

  const updateCustomerProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    localStorage.setItem('dine_divine_user', JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dine_divine_user');
  };

  const isAdmin = user?.role === 'ADMIN';
  const isCustomer = user?.role === 'CUSTOMER';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isCustomer,
        loginWithGoogle,
        loginCustomerEmail,
        loginWithPasscode,
        updateCustomerProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
