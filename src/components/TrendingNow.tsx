"use client";
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrendingNow() {
  const [activeTab, setActiveTab] = useState("trending");
  
  // Filter products based on active tab
  const filteredProducts = activeTab === "ready"
    ? products.filter(p => p.isReadyToShip).slice(0, 4)
    : products.slice(0, 4);

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Mobile Tab/Filter Bar */}
        <div className="flex md:hidden items-center gap-6 mb-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab("trending")}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "trending" 
                ? "bg-gray-200 text-gray-900" 
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Trending Now
          </button>
          <button 
            onClick={() => setActiveTab("ready")}
            className={`whitespace-nowrap text-sm font-semibold transition-all ${
              activeTab === "ready" 
                ? "bg-gray-200 text-gray-900 px-5 py-2.5 rounded-full" 
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Ready To Ship
          </button>
        </div>

        <div className="hidden md:flex items-baseline justify-between mb-12">
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
