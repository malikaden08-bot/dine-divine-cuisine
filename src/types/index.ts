export type MenuItemCategory = 
  | 'All' 
  | 'Burgers' 
  | 'Wraps & Paratha' 
  | 'Fries' 
  | 'Salad Bar' 
  | 'DDC Special' 
  | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuItemCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  ingredients: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  addons?: { id: string; name: string; price: number }[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedAddons: { id: string; name: string; price: number }[];
  spiceLevel?: string;
  specialInstructions?: string;
  itemTotal: number;
}

export interface DealItem {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  dealPrice: number;
  discountBadge: string;
  expiresInSeconds: number;
  image: string;
  itemsIncluded: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  favoriteDish: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Ambience' | 'Dishes' | 'Kitchen' | 'Events';
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Ordering' | 'Delivery' | 'Dine-In';
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Indoor' | 'Outdoor Rooftop' | 'Family VIP Section';
  specialRequest?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
}
