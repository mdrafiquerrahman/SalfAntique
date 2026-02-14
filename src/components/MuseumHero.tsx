"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { products } from "../data/products";

export default function MuseumHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayProducts = products.slice(0, 5); // Take first 5 products for the slider

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayProducts.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(timer);
  }, [displayProducts.length]);

  return (
    <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden bg-offblack">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={displayProducts[currentIndex].image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000&auto=format&fit=crop"}
            alt={displayProducts[currentIndex].name}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-offblack via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 lg:px-20">
        <div className="max-w-2xl text-left overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-muted-gold/60 text-[10px] uppercase tracking-[0.5em] font-sans block mb-2">
                  Our Signature Collections
                </span>
                <h2 className="font-serif text-5xl lg:text-7xl text-parchment leading-[0.9] tracking-tighter">
                  {displayProducts[currentIndex].name}
                </h2>
              </div>
              
              <p className="text-parchment/60 font-sans text-lg lg:text-xl max-w-xl italic leading-relaxed line-clamp-2">
                "{displayProducts[currentIndex].story}"
              </p>

              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <Link
                  href={`/products/${displayProducts[currentIndex].slug}`}
                  prefetch={false}
                  className="group relative overflow-hidden bg-muted-gold/10 backdrop-blur-md border border-muted-gold/20 px-10 py-4 rounded-full transition-all duration-500 hover:bg-muted-gold hover:border-muted-gold"
                >
                  <span className="relative z-10 text-[11px] lg:text-[13px] font-bold tracking-[0.2em] text-muted-gold group-hover:text-offblack transition-colors duration-500 uppercase">
                    View Masterpiece
                  </span>
                </Link>
                
                <Link
                  href="/collections"
                  prefetch={false}
                  className="group flex items-center gap-4 px-6 py-4 text-parchment/40 hover:text-parchment transition-colors duration-300"
                >
                  <span className="text-[11px] lg:text-[13px] font-bold tracking-[0.2em] uppercase">
                    Explore Archive
                  </span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Indicators */}
          <div className="absolute bottom-12 left-4 lg:left-20 flex gap-3">
            {displayProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === idx ? "w-12 bg-muted-gold" : "w-6 bg-white/10 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
