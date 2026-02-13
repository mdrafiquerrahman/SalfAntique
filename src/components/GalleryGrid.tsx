"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products, Category, Era } from "../data/products";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface GalleryGridProps {
  era?: string;
  category?: string;
  sort?: string;
}

export default function GalleryGrid({ era, category, sort }: GalleryGridProps) {
  let filteredProducts = [...products];

  if (era) {
    filteredProducts = filteredProducts.filter(
      p => p.era.toLowerCase().replace(" ", "-") === era.toLowerCase()
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort) {
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // For now, newest is just reverse alphabetical or original order
        filteredProducts.reverse();
        break;
    }
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400 font-serif italic">No pieces found matching your criteria.</p>
        <button 
          onClick={() => window.location.href = '/jewelry'}
          className="mt-8 px-10 py-3 bg-[#5d735d] text-white text-[11px] font-bold tracking-[0.2em] rounded-full hover:bg-[#4a5c4a] transition-all duration-300 shadow-lg uppercase"
        >
          View All Jewelry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredProducts.map((product) => (
        <motion.div key={product.slug} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
