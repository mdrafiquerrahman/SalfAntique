"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Necklaces",
    image: "/necklace-coral-turquoise.jpg",
    href: "/jewelry?category=necklace",
    count: "120+ Pieces"
  },
  {
    name: "Earrings",
    image: "/necklace-stippled.jpg", // Using available images for now
    href: "/jewelry?category=earrings",
    count: "85+ Pieces"
  },
  {
    name: "Bangles",
    image: "/necklace-white-pearl.jpg",
    href: "/jewelry?category=bangles",
    count: "60+ Pieces"
  },
  {
    name: "Rings",
    image: "/necklace-mandala.jpg",
    href: "/jewelry?category=rings",
    count: "45+ Pieces"
  }
];

export default function ShopByCategory() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-gray-900 mb-4 italic">Shop by Category</h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Explore our curated collections by jewelry type</p>
          <div className="mt-6 h-1 w-20 bg-brilliant-green/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={category.href} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-1 opacity-80">{category.count}</p>
                    <h3 className="font-serif text-2xl tracking-wide">{category.name}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-brilliant-green transition-colors">
                    Explore Now
                  </span>
                  <div className="w-8 h-px bg-gray-200 group-hover:w-12 group-hover:bg-brilliant-green transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
