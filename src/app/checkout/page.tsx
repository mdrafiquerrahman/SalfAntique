"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import Script from "next/script";
import Image from "next/image";
import { ArrowRight, Lock, ShieldCheck, CreditCard, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createOrder = async () => {
    const response = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotal }),
    });
    return await response.json();
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsProcessing(true);

    try {
      const order = await createOrder();
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Salf Antique Gallery",
        description: "Antique Jewelry Acquisition",
        order_id: order.id,
        handler: async function (response: any) {
          // Verify payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerDetails: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
              },
              items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
              totalAmount: cartTotal,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.status === "ok") {
            setIsSuccess(true);
            clearCart();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#004225", // brilliant-green
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-offblack flex items-center justify-center p-8">
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-12 py-24 border border-muted-gold/10 bg-muted-gold/[0.02] rounded-sm"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-brilliant-green/20 flex items-center justify-center border border-brilliant-green/30">
              <ShieldCheck className="w-10 h-10 text-brilliant-green" />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="font-serif text-4xl lg:text-6xl text-parchment tracking-tighter italic">Acquisition Confirmed</h1>
            <p className="text-muted-gold/60 font-sans text-[11px] uppercase tracking-[0.4em]">Transaction Successful</p>
          </div>
          <p className="text-parchment/60 font-serif text-xl italic px-12 leading-relaxed">
            Your selection has been secured. A curator will reach out shortly to coordinate the private delivery of your treasures.
          </p>
          <Link 
            href="/"
            className="inline-block px-12 py-4 bg-muted-gold text-offblack text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-parchment transition-all duration-500"
          >
            Return to Gallery
          </Link>
        </motion.div>
      </main>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <main className="min-h-screen bg-offblack flex items-center justify-center p-8 text-center">
        <div className="space-y-8">
          <ShoppingBag className="w-16 h-16 text-muted-gold/20 mx-auto" />
          <h1 className="font-serif text-3xl text-parchment italic">The Archive is Empty</h1>
          <Link href="/collections" className="inline-block px-12 py-4 bg-muted-gold text-offblack text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-parchment transition-all duration-500">
            Explore Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-offblack text-parchment pt-32 pb-24 px-4 lg:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form Side */}
          <div className="space-y-12">
            <header className="space-y-4">
              <h1 className="font-serif text-4xl lg:text-5xl italic tracking-tight">Secure Acquisition</h1>
              <div className="flex items-center gap-4 text-muted-gold/40 text-[10px] uppercase tracking-[0.3em]">
                <span>Contact Details</span>
                <div className="h-[1px] w-12 bg-muted-gold/20" />
                <span>Payment</span>
              </div>
            </header>

            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-6">
                <div className="group relative">
                  <label className="block text-[10px] font-bold tracking-widest text-muted-gold/40 uppercase mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-muted-gold/10 py-3 text-parchment font-serif italic text-lg focus:outline-none focus:border-muted-gold transition-colors placeholder:text-muted-gold/5"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-bold tracking-widest text-muted-gold/40 uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-muted-gold/10 py-3 text-parchment font-serif italic text-lg focus:outline-none focus:border-muted-gold transition-colors placeholder:text-muted-gold/5"
                    placeholder="curator@salf.com"
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-bold tracking-widest text-muted-gold/40 uppercase mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-muted-gold/10 py-3 text-parchment font-serif italic text-lg focus:outline-none focus:border-muted-gold transition-colors placeholder:text-muted-gold/5"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full group relative overflow-hidden bg-muted-gold py-6 text-offblack font-bold uppercase text-[11px] tracking-[0.4em] hover:bg-parchment transition-all duration-500 shadow-2xl disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isProcessing ? "Processing..." : "Initiate Acquisition"}
                    {!isProcessing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 pt-6 border-t border-muted-gold/5">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-muted-gold/30">
                  <Lock className="w-3 h-3" />
                  SSL Encrypted
                </div>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-muted-gold/30">
                  <ShieldCheck className="w-3 h-3" />
                  PCI Compliant
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="lg:sticky lg:top-40 h-fit space-y-8">
            <div className="bg-muted-gold/[0.02] border border-muted-gold/10 p-8 rounded-sm space-y-8">
              <h2 className="font-serif text-xl italic text-parchment/80">Acquisition Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.slug} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-offblack/40 border border-muted-gold/10 shrink-0 overflow-hidden">
                      {item.image && (
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-cover grayscale opacity-80"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-serif text-parchment truncate uppercase tracking-wider">{item.name}</p>
                      <p className="text-[10px] text-muted-gold/40 uppercase tracking-widest">{item.era} Period</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-muted-gold/60">Qty: {item.quantity}</span>
                        <span className="text-[11px] font-serif">₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-muted-gold/10">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-muted-gold/40">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-muted-gold/40">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-muted-gold/20">
                  <span className="text-[13px] uppercase tracking-[0.4em] text-parchment font-bold">Total</span>
                  <span className="text-2xl text-muted-gold font-serif">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-brilliant-green/20 bg-brilliant-green/[0.02] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brilliant-green/10 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-brilliant-green" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-parchment">Razorpay Secure</h4>
                <p className="text-[10px] text-muted-gold/40 leading-relaxed uppercase tracking-widest">
                  Pay securely via UPI, Cards, NetBanking, or Wallets through our encrypted payment gateway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
