import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionDock } from "@/components/layout/MobileActionDock";
import { businessData } from "@/data/business";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KidOld Bakers | Handcrafted Cakes & Artisan Bakery in Jaunpur",
  description:
    "Celebrate sweet family moments with KidOld Bakers in Jaunpur, Uttar Pradesh. Custom birthday celebration cakes, 100% pure veg bakes, and artisanal treats. You Imagine. We Bake.",
  keywords: [
    "KidOld Bakers",
    "Bakery in Jaunpur",
    "Best cake shop in Jaunpur",
    "Custom birthday cakes Jaunpur",
    "Eggless cakes Jaunpur",
    "Artisan bakery Uttar Pradesh",
    "You Imagine We Bake",
  ],
  authors: [{ name: "KidOld Bakers" }],
  openGraph: {
    title: "KidOld Bakers | Handcrafted Cakes & Artisan Bakery in Jaunpur",
    description:
      "Little moments to big smiles. Custom celebration cakes and fresh artisanal bakes in Jaunpur, Uttar Pradesh.",
    url: "https://kidoldbakers.com",
    siteName: "KidOld Bakers",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/brand/kidold-logo-clean.png",
    apple: "/images/brand/kidold-logo-clean.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Bakery JSON-LD Structured Schema for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: businessData.name,
    image: "https://kidoldbakers.com/images/brand/kidold-logo-clean.png",
    "@id": "https://kidoldbakers.com",
    url: "https://kidoldbakers.com",
    telephone: businessData.phoneRaw,
    email: businessData.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${businessData.addressLine}, ${businessData.landmark}, ${businessData.area}`,
      addressLocality: businessData.city,
      addressRegion: businessData.state,
      postalCode: businessData.pincode,
      addressCountry: "IN",
    },
    servesCuisine: "Bakery & Desserts",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${jakarta.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Anti-FOUC Theme Initialization
                try {
                  var theme = localStorage.getItem('kidold-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preload" href="/images/brand/kidold-logo-clean.png" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFDF7] dark:bg-[#120905] text-[#2C1810] dark:text-[#FFFDF7] transition-colors duration-300 antialiased selection:bg-brand-gold/30 selection:text-brand-chocolate dark:selection:text-brand-gold">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileActionDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
