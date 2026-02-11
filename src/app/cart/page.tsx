"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [activeTrust, setActiveTrust] = React.useState<string | null>(null);

  const trustDetails: Record<string, { title: string, content: string }> = {
    "Cards & UPI": {
      title: "Secure Digital Payments",
      content: "We accept all major credit/debit cards (Visa, Mastercard, RuPay) and UPI payments through our secure encrypted gateway. Every transaction is protected with bank-grade security protocols to ensure your acquisition is safe."
    },
    "Cash on Delivery": {
      title: "Private Concierge Delivery",
      content: "For select high-value pieces, we offer a Cash on Delivery service. Upon placing an order, our private concierge will contact you to confirm the delivery details and secure the transaction for hand-to-hand delivery."
    },
    "100% Authentic": {
      title: "Guaranteed Provenance",
      content: "Every item in the Salf Antique collection undergoes rigorous appraisal by our master curators. We provide a physical Certificate of Authenticity detailing the era, materials, and historical origin of your treasure."
    },
    "Easy Returns": {
      title: "7-Day Inspection Period",
      content: "We want you to be completely enamored with your selection. If the piece does not resonate with you, we offer a no-questions-asked 7-day return policy for a full credit or exchange, provided the item is in its original condition."
    }
  };

  return (
    <main className="min-h-screen bg-offblack py-24 selection:bg-muted-gold/30">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('/grain.png')] z-50" />
      
      <div className="mx-auto max-w-5xl px-8 lg:px-12">
        <div className="space-y-12">
          <header className="text-center space-y-4">
            <h1 className="font-serif text-5xl lg:text-7xl text-parchment tracking-tighter">Your Shopping Bag</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-muted-gold/20" />
              <p className="text-muted-gold/40 text-[10px] uppercase tracking-[0.5em] font-sans">
                {cartCount} {cartCount === 1 ? "Treasure" : "Treasures"} Collected
              </p>
              <div className="h-[1px] w-12 bg-muted-gold/20" />
            </div>
          </header>

          <div className="mt-16">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-32 border border-muted-gold/10 bg-muted-gold/[0.02] rounded-sm text-center space-y-8"
              >
                <div className="flex flex-col items-center">
                  <svg className="w-20 h-20 text-muted-gold/20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-parchment/60 font-serif text-2xl italic">Your bag is currently empty.</p>
                  <p className="mt-2 text-[10px] text-muted-gold/40 uppercase tracking-widest font-sans">Discover something beautiful to fill it with.</p>
                  
                  <Link 
                    href="/" 
                    className="mt-12 border border-muted-gold/30 px-12 py-4 text-[11px] font-bold tracking-[0.3em] text-muted-gold uppercase hover:bg-muted-gold/10 transition-all duration-500"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-10">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.slug}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-muted-gold/10 group"
                      >
                        <div className="relative aspect-[3/4] w-full sm:w-40 bg-offblack/40 overflow-hidden rounded-sm border border-muted-gold/5">
                          {item.image && (
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 space-y-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <h3 className="font-serif text-2xl text-parchment leading-tight group-hover:text-muted-gold transition-colors">
                                <Link href={`/products/${item.slug}`}>{item.name}</Link>
                              </h3>
                              <p className="text-muted-gold/40 text-[9px] uppercase tracking-[0.3em] font-sans">{item.era} Period</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.slug)}
                              className="text-muted-gold/30 hover:text-red-400 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center border border-muted-gold/20 rounded-full px-4 py-1.5 gap-6">
                              <button 
                                onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                className="text-muted-gold/40 hover:text-muted-gold transition-colors text-lg"
                              >
                                −
                              </button>
                              <span className="text-parchment font-serif text-lg w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                className="text-muted-gold/40 hover:text-muted-gold transition-colors text-lg"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-serif text-xl text-muted-gold">
                              {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumFractionDigits: 0
                              }).format(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Payment & Trust Options Section */}
                  <section className="mt-20 space-y-12 py-12 border-t border-muted-gold/5">
                    <div className="flex items-center gap-6">
                      <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/30 whitespace-nowrap">Secure Acquisition & Trust</h2>
                      <div className="h-[1px] w-full bg-muted-gold/5" />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                      {[
                        {
                          id: "Cards & UPI",
                          sub: "Visa, MC, RuPay, UPI",
                          icon: (
                            <svg className="w-6 h-6 text-muted-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          )
                        },
                        {
                          id: "Cash on Delivery",
                          sub: "Concierge Confirmation",
                          icon: (
                            <svg className="w-6 h-6 text-muted-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )
                        },
                        {
                          id: "100% Authentic",
                          sub: "Certified Provenance",
                          icon: (
                            <svg className="w-6 h-6 text-muted-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          )
                        },
                        {
                          id: "Easy Returns",
                          sub: "7-Day Return Policy",
                          icon: (
                            <svg className="w-6 h-6 text-muted-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                            </svg>
                          )
                        }
                      ].map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => setActiveTrust(activeTrust === item.id ? null : item.id)}
                          className="flex flex-col items-start space-y-4 group text-left transition-all"
                        >
                          <div className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all duration-500 ${activeTrust === item.id ? "border-muted-gold bg-muted-gold/10" : "border-muted-gold/10 group-hover:border-muted-gold/30"}`}>
                            {item.icon}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[10px] font-bold tracking-widest text-parchment/80 uppercase">{item.id}</h4>
                            <p className="text-[9px] text-muted-gold/40 italic">{item.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {activeTrust && (
                        <motion.div
                          key="trust-panel"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-muted-gold/[0.03] border border-muted-gold/10 p-8 rounded-sm space-y-4">
                            <div className="flex justify-between items-center">
                              <h5 className="font-serif text-muted-gold text-lg italic">{trustDetails[activeTrust].title}</h5>
                              <button onClick={() => setActiveTrust(null)} className="text-muted-gold/40 hover:text-muted-gold text-xs">Close</button>
                            </div>
                            <p className="font-sans text-parchment/60 text-sm leading-relaxed max-w-2xl">
                              {trustDetails[activeTrust].content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-muted-gold/[0.03] border border-muted-gold/10 p-10 space-y-10 sticky top-32">
                    <h2 className="font-serif text-2xl text-parchment tracking-tight italic border-b border-muted-gold/10 pb-6">Acquisition Summary</h2>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-parchment/40 font-sans uppercase tracking-widest text-[10px]">Subtotal</span>
                        <span className="text-parchment font-serif text-lg">
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0
                          }).format(cartTotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-parchment/40 font-sans uppercase tracking-widest text-[10px]">Shipping</span>
                        <span className="text-muted-gold/60 font-serif italic text-sm">Complimentary</span>
                      </div>
                      <div className="h-[1px] w-full bg-muted-gold/10" />
                      <div className="flex justify-between">
                        <span className="text-muted-gold font-sans uppercase tracking-[0.2em] text-[11px] font-bold">Total</span>
                        <span className="text-muted-gold font-serif text-3xl">
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0
                          }).format(cartTotal)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-muted-gold py-5 font-serif text-offblack font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-parchment transition-all duration-500 shadow-xl">
                      Proceed to Checkout
                    </button>

                    <div className="flex flex-col gap-6 pt-4">
                      <div className="flex items-center justify-between gap-4 opacity-60 hover:opacity-100 transition-all duration-500">
                        <span className="text-[9px] uppercase tracking-widest text-muted-gold/60">Secure Checkout</span>
                        <div className="flex gap-2">
                          {/* Visa */}
                          <svg className="w-7 h-4" viewBox="0 0 32 20" fill="currentColor">
                            <rect width="32" height="20" rx="3" fill="#1434CB"/>
                            <path d="M11 7l-1 6h2l1-6h-2zm7 0l-0.5 2h2.5l-0.5-2h-1.5zm-4 0l-1.5 6h2l0.5-2h1.5l0.5 2h2l-2-6h-3z" fill="white"/>
                          </svg>
                          {/* Mastercard */}
                          <svg className="w-7 h-4" viewBox="0 0 32 20" fill="currentColor">
                            <rect width="32" height="20" rx="3" fill="#1A1A1A"/>
                            <circle cx="12" cy="10" r="6" fill="#EB001B" fillOpacity="0.9"/>
                            <circle cx="20" cy="10" r="6" fill="#F79E1B" fillOpacity="0.9"/>
                          </svg>
                          {/* UPI */}
                          <div className="w-7 h-4 bg-white rounded-[2px] flex items-center justify-center border border-muted-gold/20">
                            <span className="text-[6px] font-black text-[#6B3398] italic">UPI</span>
                          </div>
                          {/* COD */}
                          <div className="w-7 h-4 bg-muted-gold/10 rounded-[2px] flex items-center justify-center border border-muted-gold/20">
                            <span className="text-[6px] font-bold text-muted-gold uppercase">COD</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-muted-gold/30">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-[9px] uppercase tracking-widest">Secure Acquisition Gateway</span>
                      </div>
                      <p className="text-[9px] text-parchment/30 italic font-serif leading-relaxed">
                        Prices include private curation fees and insurance during transit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
