"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";

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
      <Link
        href={`/products/${product.slug}`}
        prefetch={false}
        className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f5f5] border border-gray-100 transition-all duration-300 hover:shadow-md"
      >
        {/* Ready to Ship Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#5d735d] text-white text-[10px] px-2 py-1 rounded-sm font-medium tracking-tight">
            Ready to Ship
          </span>
        </div>

        {/* Product Image */}
        <div className="relative h-full w-full p-8">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              draggable={false}
            />
          ) : (
            <div className="h-full w-full bg-gray-200 rounded-lg" />
          )}
        </div>

        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Wishlist logic would go here
          }}
          className="absolute bottom-3 left-3 z-10 p-1.5 rounded-full hover:bg-white/80 transition-all"
        >
          <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
        </button>
      </Link>

      {/* Product Info below the card */}
      <div className="mt-4 flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-sm text-gray-800 leading-tight group-hover:text-muted-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="font-sans text-xs font-semibold text-gray-900 shrink-0">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(product.price)}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
          {product.era}
        </p>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
            router.push('/cart');
          }}
          className="mt-2 w-full py-2 bg-gray-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
        >
          Quick Add
        </button>
      </div>
    </motion.div>
  );
}
