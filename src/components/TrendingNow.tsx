"use client";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function TrendingNow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (scrollRef.current) {
        const viewportWidth = scrollRef.current.offsetWidth;
        const contentWidth = scrollRef.current.firstChild instanceof HTMLElement 
          ? scrollRef.current.firstChild.scrollWidth 
          : 0;
        
        if (contentWidth > viewportWidth) {
          setConstraints({ left: -(contentWidth - viewportWidth), right: 0 });
        } else {
          setConstraints({ left: 0, right: 0 });
        }
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <section className="tapestry-emerald-grain mx-auto max-w-6xl px-8 py-12 overflow-hidden rounded-[2.5rem] border border-muted-gold/10 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="font-serif text-parchment text-3xl tracking-tight">Trending Now</h2>
          <div className="h-0.5 w-12 bg-muted-gold/40 rounded-full" />
        </div>
        <span className="text-muted-gold/60 text-xs uppercase tracking-[0.2em] font-medium">Jewellery pieces everyone’s eyeing</span>
      </div>
      
      {/* Desktop View: Smooth Horizontal Drag */}
      <div 
        ref={scrollRef}
        className="hidden lg:block relative cursor-grab active:cursor-grabbing overflow-visible"
      >
        <motion.div 
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          dragMomentum={true}
          className="flex gap-6 min-w-max pb-4"
        >
          {products.map((p) => (
            <div key={p.slug} className="w-80 select-none shrink-0">
              <div className="pointer-events-auto">
                <ProductCard product={p} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile View: Vertical Scroll in Container */}
      <div className="lg:hidden relative overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide h-[600px]">
        <div className="flex flex-col gap-6 pb-4">
          {products.map((p) => (
            <div key={p.slug} className="w-full select-none snap-center shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
