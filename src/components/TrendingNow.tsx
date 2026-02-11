"use client";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function TrendingNow() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (viewportRef.current && contentRef.current) {
        const viewportWidth = viewportRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        // If content is wider than viewport, allow dragging
        if (contentWidth > viewportWidth) {
          setConstraints({ left: -(contentWidth - viewportWidth), right: 0 });
        } else {
          setConstraints({ left: 0, right: 0 });
        }
      }
    };

    updateConstraints();
    // Use a small delay to ensure DOM is fully rendered
    const timer = setTimeout(updateConstraints, 500);
    
    window.addEventListener('resize', updateConstraints);
    return () => {
      window.removeEventListener('resize', updateConstraints);
      clearTimeout(timer);
    };
  }, [products]);

  return (
    <section className="tapestry-emerald-grain mx-auto max-w-6xl px-8 py-12 overflow-hidden rounded-[2.5rem] border border-muted-gold/10 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="font-serif text-parchment text-3xl tracking-tight">Trending Now</h2>
          <div className="h-0.5 w-12 bg-muted-gold/40 rounded-full" />
        </div>
        <span className="text-muted-gold/60 text-xs uppercase tracking-[0.2em] font-medium">Jewellery pieces everyone’s eyeing</span>
      </div>
      
      <div 
        ref={viewportRef}
        className="relative cursor-grab active:cursor-grabbing overflow-visible"
      >
        <motion.div 
          ref={contentRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          dragMomentum={true}
          className="flex gap-6 min-w-max"
        >
          {products.map((p) => (
            <div key={p.slug} className="w-72 select-none">
              <div className="pointer-events-auto">
                <ProductCard product={p} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
