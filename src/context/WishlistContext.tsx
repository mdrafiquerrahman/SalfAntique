"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "../data/products";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("salf-wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("salf-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.slug === product.slug)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (slug: string) => {
    setWishlist((prev) => prev.filter((item) => item.slug !== slug));
  };

  const isInWishlist = (slug: string) => {
    return wishlist.some((item) => item.slug === slug);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
