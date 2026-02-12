"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  const freeShippingThreshold = 5000;
  const shippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-offblack border-l border-muted-gold/20 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-muted-gold/10 flex items-center justify-between bg-offblack/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-muted-gold" />
                <h2 className="font-serif text-xl text-parchment uppercase tracking-widest">Your Archive</h2>
                <span className="bg-brilliant-green/20 text-brilliant-green text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {cart.length} ITEMS
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-muted-gold/10 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-muted-gold group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-6 py-4 bg-muted-gold/5 border-b border-muted-gold/10">
              <div className="flex justify-between text-[11px] uppercase tracking-wider mb-2">
                <span className="text-parchment/70 font-medium">
                  {remainingForFreeShipping > 0 
                    ? `Add ₹${remainingForFreeShipping.toLocaleString()} for free shipping`
                    : "You've earned free shipping!"}
                </span>
                <span className="text-muted-gold font-bold">{Math.round(shippingProgress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted-gold/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  className="h-full bg-brilliant-green"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-muted-gold/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted-gold/20" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-parchment mb-2">The Archive is Empty</h3>
                    <p className="text-parchment/40 text-sm italic max-w-[200px] mx-auto">
                      Your curated collection will appear here as you explore our treasures.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-brilliant-green text-parchment text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-emerald-900 transition-colors shadow-lg shadow-black/20"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-24 h-24 bg-muted-gold/5 overflow-hidden border border-muted-gold/10 shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted-gold/5 flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-muted-gold/20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <Link 
                            href={`/products/${item.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-[13px] text-parchment font-serif hover:text-muted-gold transition-colors truncate uppercase tracking-wider"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.slug)}
                            className="text-muted-gold/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-muted-gold/60 uppercase tracking-widest">{item.era}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-muted-gold/20 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="p-1.5 text-muted-gold hover:bg-muted-gold/10 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[12px] text-parchment font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="p-1.5 text-muted-gold hover:bg-muted-gold/10 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-[13px] text-parchment font-serif">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-muted-gold/5 border-t border-muted-gold/10 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] text-parchment/60 uppercase tracking-[0.2em]">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-parchment/60 uppercase tracking-[0.2em]">
                    <span>Shipping</span>
                    <span>{cartTotal >= freeShippingThreshold ? "FREE" : "Calculated at checkout"}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-muted-gold/10">
                    <span className="text-[13px] text-parchment font-serif uppercase tracking-widest">Total</span>
                    <span className="text-xl text-muted-gold font-serif">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <Link 
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-brilliant-green text-parchment text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/40"
                  >
                    Secure Checkout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 border border-muted-gold/20 text-parchment text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-muted-gold/5 transition-all flex items-center justify-center gap-2"
                  >
                    View Full Archive
                  </Link>
                  <p className="text-[9px] text-parchment/30 text-center italic">
                    Taxes and shipping calculated at next step
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
