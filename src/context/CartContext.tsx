"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "../data/products";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("salf-cart");
    if (savedCart) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCart(JSON.parse(savedCart));
        } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("salf-cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.slug === product.slug);
      if (existingItem) {
        return prevCart.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (slug: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
