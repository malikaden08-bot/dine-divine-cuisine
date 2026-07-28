import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'Dine Divine Cuisine | Fresh Fast Food Restaurant in Rawalpindi',
  description:
    'Experience Rawalpindi’s finest fast food at Dine Divine Cuisine. Gourmet double-smash Angus beef burgers, wood-fired sourdough pizzas, and golden 11-spice crispy chicken in AECHS Food Street.',
  keywords: [
    'Dine Divine Cuisine',
    'Fast Food Rawalpindi',
    'Best Burgers Rawalpindi',
    'Pizza AECHS Food Street',
    'Crispy Fried Chicken Rawalpindi',
    'Restaurant Airport Housing Society',
    'Fast Food Delivery Rawalpindi',
  ],
  authors: [{ name: 'Dine Divine Cuisine' }],
  openGraph: {
    title: 'Dine Divine Cuisine | Fresh Fast Food Restaurant in Rawalpindi',
    description: 'Fresh Flavor. Every Bite. Every Time. Located at Food Street, AECHS, Rawalpindi.',
    url: 'https://dinedivinecuisine.com',
    siteName: 'Dine Divine Cuisine',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Dine Divine Cuisine Gourmet Burger Feast',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dine Divine Cuisine | Fresh Fast Food Restaurant in Rawalpindi',
    description: 'Gourmet burgers, sourdough pizza & 11-spice crispy chicken. Food Street, AECHS, Rawalpindi.',
    images: ['https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80'],
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'FastFoodRestaurant',
  name: 'Dine Divine Cuisine',
  image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  '@id': 'https://dinedivinecuisine.com',
  url: 'https://dinedivinecuisine.com',
  telephone: '+923338280577',
  priceRange: '$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Food Street, Airport Employee Cooperative Housing Society (AECHS)',
    addressLocality: 'Rawalpindi',
    addressRegion: 'Punjab',
    postalCode: '46000',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.5855,
    longitude: 73.0906,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '03:00',
    },
  ],
  servesCuisine: ['Fast Food', 'Burgers', 'Pizza', 'Fried Chicken'],
  sameAs: ['https://instagram.com/dine_divine_cuisine'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[#FFF8F1] text-[#222222] font-sans antialiased selection:bg-[#EA580C] selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
