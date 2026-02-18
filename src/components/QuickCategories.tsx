"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    name: "Antique",
    image: "/necklace-coral.jpg",
    href: "/jewelry?era=antique"
  },
  {
    name: "Pendant",
    image: "/necklace-mandala.jpg",
    href: "/jewelry?category=pendant"
  },
  {
    name: "Choker",
    image: "/necklace-stippled.jpg",
    href: "/jewelry?category=choker"
  },
  {
    name: "Long Necklace",
    image: "/necklace-coral.jpg",
    href: "/jewelry?category=long-necklace"
  },
  {
    name: "Short Necklace",
    image: "/necklace-coral-turquoise.jpg",
    href: "/jewelry?category=short-necklace"
  }
];

export default function QuickCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
    // If it was a drag, prevent the click
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Reset dragging state slightly later to allow click events to process if needed
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    
    // Check if user moved enough to consider it a drag
    if (Math.abs(walk) > 5) {
      isDragging.current = true;
    }
    
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="py-2 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-8">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-4 md:gap-8 pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 lg:flex-shrink lg:flex lg:justify-center"
            >
              <Link 
                href={category.href} 
                className="group flex flex-col items-center gap-2 w-32 md:w-40 lg:w-full lg:max-w-[160px]"
                onDragStart={(e) => e.preventDefault()}
                onClick={handleClick}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 transition-all duration-300 group-hover:shadow-md pointer-events-none">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <span className="text-[11px] md:text-[13px] font-semibold text-center text-gray-800 group-hover:text-brilliant-green transition-colors leading-tight px-1 flex items-start justify-center">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
