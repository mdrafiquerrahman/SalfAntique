import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import TransitionLayout from "../components/TransitionLayout";
import NavBar from "../components/NavBar";
import ContactFooter from "../components/ContactFooter";
import AppointmentBot from "../components/AppointmentBot";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SALF Antqe — Curated Antqe Jewelry",
  description:
    "Vintage-Modern curation of Victorian, Art Deco, and rare gemstone pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
      >
        <CartProvider>
          <WishlistProvider>
            <NavBar />
            <CartDrawer />
            <main className="pt-[52px] lg:pt-[80px]">
              <TransitionLayout>{children}</TransitionLayout>
            </main>
            <ContactFooter />
            <AppointmentBot />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
