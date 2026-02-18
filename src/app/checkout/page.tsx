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
    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to create order");
      }
      return data;
    } catch (error: any) {
      console.error("Order creation fetch failed:", error);
      throw error;
    }
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
          try {
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
          } catch (verifyError) {
            console.error("Verification failed:", verifyError);
            alert("Payment verification error. Please check your email for confirmation.");
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

      if (!(window as any).Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please check your internet connection.");
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error: any) {
      console.error("Payment initiation failed:", error);
      alert(error.message || "Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" />
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full text-center space-y-12 py-24 border border-gray-200 bg-gray-50 rounded-xl"
          >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-brilliant-green/10 flex items-center justify-center border border-brilliant-green/20">
              <ShieldCheck className="w-10 h-10 text-brilliant-green" />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="font-serif text-4xl lg:text-6xl text-gray-900 tracking-tighter italic">Acquisition Confirmed</h1>
            <p className="text-gray-500 font-sans text-[11px] uppercase tracking-[0.4em]">Transaction Successful</p>
          </div>
          <p className="text-gray-600 font-serif text-xl italic px-12 leading-relaxed">
            Your selection has been secured. A curator will reach out shortly to coordinate the private delivery of your treasures.
          </p>
          <Link 
            href="/"
            className="inline-block px-12 py-4 bg-brilliant-green text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brilliant-green/90 transition-all duration-500 rounded-xl"
          >
            Return to Gallery
          </Link>
        </motion.div>
      </main>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-8 text-center">
        <div className="space-y-8">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
          <h1 className="font-serif text-3xl text-gray-900 italic">The Archive is Empty</h1>
          <Link href="/collections" className="inline-block px-12 py-4 bg-brilliant-green text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brilliant-green/90 transition-all duration-500 rounded-xl">
            Explore Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-32 pb-24 px-4 lg:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form Side */}
          <div className="space-y-12">
            <header className="space-y-4">
              <h1 className="font-serif text-4xl lg:text-5xl italic tracking-tight">Secure Checkout</h1>
              <div className="flex items-center gap-4 text-gray-400 text-[10px] uppercase tracking-[0.3em]">
                <span>Contact Details</span>
                <div className="h-[1px] w-12 bg-gray-200" />
                <span>Payment</span>
              </div>
            </header>

            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-6">
                <div className="group relative">
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-900 font-serif italic text-lg focus:outline-none focus:border-brilliant-green transition-colors placeholder:text-gray-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-900 font-serif italic text-lg focus:outline-none focus:border-brilliant-green transition-colors placeholder:text-gray-300"
                    placeholder="curator@salf.com"
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-900 font-serif italic text-lg focus:outline-none focus:border-brilliant-green transition-colors placeholder:text-gray-300"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full group relative overflow-hidden bg-brilliant-green py-6 text-white font-bold uppercase text-[11px] tracking-[0.4em] hover:bg-brilliant-green/90 transition-all duration-500 shadow-xl disabled:opacity-50 rounded-xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isProcessing ? "Processing..." : "Initiate Acquisition"}
                    {!isProcessing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gray-400">
                  <Lock className="w-3 h-3" />
                  SSL Encrypted
                </div>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gray-400">
                  <ShieldCheck className="w-3 h-3" />
                  PCI Compliant
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="lg:sticky lg:top-40 h-fit space-y-8">
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl space-y-8">
              <h2 className="font-serif text-xl italic text-gray-800">Acquisition Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.slug} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-white border border-gray-200 shrink-0 overflow-hidden">
                      {item.image && (
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-serif text-gray-900 truncate uppercase tracking-wider">{item.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.era} Period</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-gray-600">Qty: {item.quantity}</span>
                        <span className="text-[11px] font-serif text-gray-900">₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-[13px] uppercase tracking-[0.4em] text-gray-900 font-bold">Total</span>
                  <span className="text-2xl text-brilliant-green font-serif">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-brilliant-green/20 bg-brilliant-green/[0.05] flex items-start gap-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-brilliant-green/10 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-brilliant-green" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900">Razorpay Secure</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest">
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
