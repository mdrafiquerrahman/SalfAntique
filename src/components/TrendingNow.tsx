"use client";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrendingNow() {
  const trendingProducts = products.slice(0, 4);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-baseline justify-between mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-4xl text-gray-900 italic tracking-tight">Trending Now</h2>
            <p className="text-gray-500 text-[11px] uppercase tracking-[0.3em] font-medium">
              Jewellery pieces everyone’s eyeing
            </p>
          </div>
          <Link 
            href="/collections"
            className="text-gray-900 text-[11px] uppercase tracking-widest font-bold border-b-2 border-gray-900 pb-1 hover:text-muted-gold hover:border-muted-gold transition-all"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {trendingProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
