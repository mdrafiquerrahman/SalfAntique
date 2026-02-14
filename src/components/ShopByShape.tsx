"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const shapes = [
  { name: "Round", icon: "M12 21a9 9 0 100-18 9 9 0 000 18z" },
  { name: "Oval", icon: "M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" },
  { name: "Emerald", icon: "M7 3h10l3 3v12l-3 3H7l-3-3V6l3-3z" },
  { name: "Pear", icon: "M12 3c0 0-7 8-7 12a7 7 0 0014 0c0-4-7-12-7-12z" },
  { name: "Princess", icon: "M4 4h16v16H4z" },
  { name: "Cushion", icon: "M4 8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V8z" },
  { name: "Marquise", icon: "M12 2c0 0-8 6-8 10s8 10 8 10 8-6 8-10-8-10-8-10z" },
  { name: "Radiant", icon: "M6 3h12l3 3v12l-3 3H6l-3-3V6l3-3z" },
  { name: "Asscher", icon: "M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5z" },
  { name: "Heart", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
];

export default function ShopByShape() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center font-serif text-2xl lg:text-3xl text-gray-800 tracking-wide">
          Shop Diamonds by Shape
        </h2>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-12">
          {shapes.map((shape, idx) => (
            <Link 
              key={shape.name} 
              href={`/diamonds?shape=${shape.name.toLowerCase()}`}
              className="group flex flex-col items-center gap-3 transition-all"
            >
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-400 group-hover:border-brilliant-green group-hover:text-brilliant-green group-hover:bg-white transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={shape.icon} />
                </svg>
              </motion.div>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase group-hover:text-brilliant-green transition-colors">
                {shape.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}