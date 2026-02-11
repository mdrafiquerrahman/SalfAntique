"use client";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function NewArrivals() {
  // Get the last 3 products added to the array
  const latestProducts = [...products].reverse().slice(0, 3);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-y border-gray-200 py-10 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl text-gray-800">New Arrivals</h3>
            <p className="mt-2 text-sm text-gray-500 tracking-wide uppercase">
              Dropping Daily, Monday through Friday
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-brilliant-green font-serif text-3xl">{products.length * 10}+</span>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Treasures in Collection</span>
          </div>
          <Link 
            href="/collections"
            className="bg-brilliant-green px-10 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all rounded-full"
          >
            Shop All New Arrivals
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
