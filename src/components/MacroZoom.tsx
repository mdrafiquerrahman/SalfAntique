"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function MacroZoom({ image, title }: { image: string; title: string }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="relative group cursor-zoom-in overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <div 
        className="relative aspect-square"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain transition-opacity duration-300 ${isZoomed ? "opacity-0" : "opacity-100"}`}
        />
        
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                backgroundSize: "400%",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brilliant-green font-bold shadow-sm">
            Macro Detail
          </div>
        </div>
      </div>
    </div>
  );
}
