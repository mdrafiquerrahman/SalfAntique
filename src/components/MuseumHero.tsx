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
    <section className="relative h-[450px] lg:h-[550px] w-full overflow-hidden bg-offblack">
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
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-offblack via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center lg:justify-end px-4 lg:px-8">
        <div className="max-w-md text-center lg:text-left lg:ml-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-serif text-3xl lg:text-5xl text-parchment leading-tight">
              Our Signature Collections
            </h2>
            <p className="mt-4 text-xs lg:text-base text-parchment/90 tracking-wide">
              The beauty of nature meets the brilliance of design.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/collections"
                prefetch={false}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl transition-all duration-500 hover:bg-white hover:border-white"
              >
                <span className="relative z-10 text-[11px] lg:text-[13px] font-bold tracking-[0.2em] text-white uppercase group-hover:text-[#5d735d] transition-colors duration-500">
                  SHOP OUR COLLECTIONS
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
