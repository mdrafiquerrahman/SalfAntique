"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import GalleryGrid from "@/components/GalleryGrid";

function JewelryContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const era = searchParams.get('era') || undefined;
  const [sortBy, setSortBy] = useState("featured");

  const title = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : era 
      ? era.charAt(0).toUpperCase() + era.slice(1) + " Era"
      : 'All Jewelry';

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-4">
              <Link href="/" className="hover:text-brilliant-green transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900">Shop</span>
            </nav>
            <h1 className="font-serif text-4xl lg:text-5xl text-gray-900 tracking-tight italic">
              {title}
            </h1>
            <div className="mt-4 h-px w-24 bg-brilliant-green opacity-30"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[11px] font-bold uppercase tracking-widest text-gray-900 focus:outline-none bg-transparent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <GalleryGrid era={era} category={category} sort={sortBy} />
        </div>
      </div>
    </main>
  );
}

export default function JewelryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <JewelryContent />
    </Suspense>
  );
}
