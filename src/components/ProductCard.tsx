"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart, Search, ShoppingCart, Truck } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const isFavorite = isInWishlist(product.slug);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  };

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
          <div className="absolute top-0 left-0 z-10">
            <span className="flex items-center gap-1 bg-[#5d735d] text-white text-[9px] px-2.5 py-1 rounded-br-lg font-semibold tracking-wide shadow-sm">
              <Truck className="w-2.5 h-2.5" strokeWidth={2.5} />
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
            <div className="h-full w-full bg-gray-100 rounded-xl" />
          )}
        </Link>

        {/* Desktop Quick Actions */}
        <div className="absolute inset-0 z-10 hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
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

        {/* Bottom Right Actions (Cart, Heart & Search) */}
        <div className="absolute bottom-3 right-3 z-20 flex flex-col items-center gap-1.5">
          {/* Mobile Cart Button */}
          <button 
            className="md:hidden p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all hover:scale-110"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-gray-700" />
          </button>

          {/* Search Button */}
          <button 
            className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/products/${product.slug}`);
            }}
          >
            <Search className="w-3.5 h-3.5 text-gray-700 hover:text-gray-900" />
          </button>

          {/* Heart Icon */}
          <button 
            onClick={toggleWishlist}
            className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all hover:scale-110"
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-all duration-300 stroke-[1.5px] ${
                isFavorite 
                  ? "text-red-500 fill-red-500 scale-110" 
                  : "text-gray-700 hover:text-red-500"
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link 
        href={`/products/${product.slug}`}
        className="mt-3 flex flex-col gap-0.5 group/info"
      >
        <h3 className="text-[14px] font-medium text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem] font-sans group-hover/info:text-[#5d735d] transition-colors">
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
      </Link>
    </motion.div>
  );
}
