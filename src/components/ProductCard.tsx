"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Heart, Search, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col group"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f9f9f9] border border-gray-100/50 transition-all duration-300">
        {/* Ready to Ship Badge */}
        {product.isReadyToShip && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#5d735d] text-white text-[9px] px-2 py-1 rounded font-medium tracking-wide">
              Ready to Ship
            </span>
          </div>
        )}

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          prefetch={false}
          className="relative h-full w-full block p-6"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              draggable={false}
            />
          ) : (
            <div className="h-full w-full bg-gray-100 rounded-lg" />
          )}
        </Link>

        {/* Action Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          <button 
            className="p-2 rounded-full bg-gray-200/50 hover:bg-white transition-all shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/products/${product.slug}`);
            }}
          >
            <Search className="w-4 h-4 text-gray-700" />
          </button>
          <button 
            className="p-2 rounded-full bg-gray-200/50 hover:bg-white transition-all shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingCart className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute bottom-3 left-3 z-10 p-1 transition-all"
        >
          <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors stroke-[1.5px]" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-0.5">
        <h3 className="text-[14px] font-medium text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem] font-sans">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-gray-900 font-sans">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(product.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
