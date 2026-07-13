import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteData } from "../../content/site-data";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bluemoon Gallery | Mobile, Laptop & Tablet Shop in Bilimora, Gujarat",
  description: "Established in 2005, Bluemoon Gallery is Bilimora's trusted store for new and certified refurbished mobile phones, laptops, and tablets. Buy, sell, exchange and access our free spec encyclopedia. Owner: Monti Shah.",
  keywords: [
    "mobile shop Bilimora Gujarat",
    "refurbished phones Bilimora",
    "buy sell mobile Bilimora",
    "laptop shop Bilimora Gujarat",
    "tablet shop Bilimora",
    "second hand mobile Bilimora",
    "Bluemoon Gallery Bilimora",
    "Monti Shah Bilimora",
    "best mobile shop Gujarat"
  ],
  metadataBase: new URL("https://bluemoon-gallery.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bluemoon Gallery | Mobile, Laptop & Tablet Shop in Bilimora",
    description: "Trusted tech store since 2005. Best deals on new & refurbished smartphones, laptops, and tablets in Bilimora, Gujarat.",
    url: "https://bluemoon-gallery.vercel.app",
    siteName: "Bluemoon Gallery",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bluemoon Gallery - Electronics Store in Bilimora, Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluemoon Gallery | Mobile, Laptop & Tablet Shop in Bilimora",
    description: "Get certified refurbished iPhones, laptops, and tablets with shop-backed warranty. Trusted local business in Gujarat since 2005.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema markup for LocalBusiness / ElectronicsStore
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": siteData.business.name,
    "image": "https://bluemoon-gallery.vercel.app/og-image.jpg",
    "@id": "https://bluemoon-gallery.vercel.app/#store",
    "url": "https://bluemoon-gallery.vercel.app",
    "telephone": siteData.business.contactNumber,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Railway Station Road, Opposite Town Hall",
      "addressLocality": "Bilimora",
      "postalCode": "396321",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.6804",
      "longitude": "72.9554" // Approximate coordinates for Bilimora town
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:30"
    },
    "sameAs": [
      "https://www.facebook.com/bluemoongallery", // TODO: Replace with real link
      "https://www.instagram.com/bluemoongallery" // TODO: Replace with real link
    ]
  };

  // Google Analytics ID placeholder (disabled by default)
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Google Analytics Script (Dynamic Injection via env var) */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
