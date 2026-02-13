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
        {/* Mobile Tab/Filter Bar */}
        <div className="flex md:hidden items-center mb-8">
          <div className="flex items-center bg-transparent border border-gray-100 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab("new")}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "new" 
                  ? "bg-gray-100 text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              New Arrivals
            </button>
            <div className="w-px h-4 bg-gray-200 mx-2" />
            <button 
              onClick={() => setActiveTab("ready")}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "ready" 
                  ? "bg-gray-100 text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Ready To Ship
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-4xl text-gray-900 italic tracking-tight">New Arrivals</h2>
            <p className="text-gray-500 text-[11px] uppercase tracking-[0.3em] font-medium">
              Curated Treasures dropping daily
            </p>
          </div>
          <Link 
            href="/collections"
            className="text-gray-900 text-[11px] uppercase tracking-widest font-bold border-b-2 border-gray-900 pb-1 hover:text-muted-gold hover:border-muted-gold transition-all"
          >
            Explore All New Arrivals
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
