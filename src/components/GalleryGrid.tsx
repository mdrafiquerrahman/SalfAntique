"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

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

export default function GalleryGrid({ era }: { era?: string }) {
  const filteredProducts = era 
    ? products.filter(p => p.era.toLowerCase().replace(" ", "-") === era.toLowerCase())
    : products;

  return (
    <motion.div
      className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredProducts.map((product) => (
        <motion.div key={product.slug} variants={item} className="break-inside-avoid">
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
