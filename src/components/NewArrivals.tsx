"use client";
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("new");
  
  // Filter products based on active tab
  const filteredProducts = activeTab === "ready" 
    ? products.filter(p => p.isReadyToShip).slice(0, 4)
    : [...products].reverse().slice(0, 4);

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Centered Tab/Filter Bar */}
        <div className="flex justify-center items-center mb-16">
          <div className="flex items-center gap-4 md:gap-8 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setActiveTab("new")}
              className={`px-8 py-2.5 rounded-xl text-[14px] font-bold tracking-tight transition-all duration-500 ${
                activeTab === "new" 
                  ? "bg-white text-gray-900 shadow-md scale-[1.02]" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
              }`}
            >
              New Arrivals
            </button>
            <button 
              onClick={() => setActiveTab("ready")}
              className={`px-8 py-2.5 rounded-xl text-[14px] font-bold tracking-tight transition-all duration-500 ${
                activeTab === "ready" 
                  ? "bg-white text-gray-900 shadow-md scale-[1.02]" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
              }`}
            >
              Ready To Ship
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link 
            href="/collections"
            className="group flex items-center gap-3 px-10 py-4 bg-[#5d735d] text-white text-[13px] font-bold tracking-[0.1em] rounded-full hover:bg-[#4a5c4a] transition-all duration-300 shadow-lg hover:shadow-[#5d735d]/20 hover:-translate-y-1"
          >
            VIEW ALL PRODUCTS
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
