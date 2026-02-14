"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Heart, Search, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  };

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

        {/* Desktop Quick Actions */}
        <div className="absolute inset-0 z-10 hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          {/* Top Right Search */}
          <button 
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm pointer-events-auto hover:bg-white hover:scale-110 transition-all duration-300 group/search"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/products/${product.slug}`);
            }}
          >
            <Search className="w-4 h-4 text-gray-700 group-hover/search:text-gray-900" />
          </button>
          
          {/* Bottom Full-width Add to cart - Slides up */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 pointer-events-auto">
            <button 
              className="w-full py-3 bg-white/95 backdrop-blur-md text-gray-900 text-[13px] font-bold tracking-wide rounded-xl shadow-lg hover:bg-[#5d735d] hover:text-white transition-all duration-300"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Mobile Action Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex md:hidden flex-col gap-2 z-10">
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
            onClick={handleAddToCart}
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
