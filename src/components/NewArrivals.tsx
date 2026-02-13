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
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveTab("new")}
              className={`px-6 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-300 ${
                activeTab === "new" 
                  ? "bg-[#e5e7eb] text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              New Arrivals
            </button>
            <button 
              onClick={() => setActiveTab("ready")}
              className={`px-6 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-300 ${
                activeTab === "ready" 
                  ? "bg-[#e5e7eb] text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
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

        <div className="mt-16 flex justify-center">
          <Link 
            href="/collections"
            className="text-[#5d735d] text-[13px] font-medium border-b border-[#5d735d]/30 hover:border-[#5d735d] transition-all pb-0.5"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
