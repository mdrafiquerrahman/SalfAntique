"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../data/products";
import OrnateFrame from "./OrnateFrame";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  // Create visual rhythm with varying aspect ratios based on index/slug
  const isTall = product.slug.length % 2 === 0;
  const aspectClass = isTall ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <motion.div transition={{ duration: 0.2 }}>
      <Link
        href={`/products/${product.slug}`}
        prefetch={false}
        className="group block rounded-3xl border border-[#c5a059]/30 bg-offblack/60 p-6 text-parchment inner-glow transition-all duration-500 hover:border-[#c5a059] overflow-hidden"
      >
        <OrnateFrame>
          <div className={`relative ${aspectClass} rounded-2xl overflow-hidden`}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                draggable={false}
              />
            ) : (
              <div className="h-full w-full bg-offblack/40 rounded-2xl" />
            )}
          </div>
        </OrnateFrame>

        <div className="mt-5 flex items-baseline justify-between">
          <h3 className="font-serif text-base lg:text-lg tracking-wide">{product.name}</h3>
          <span className="text-muted-gold text-[8px] lg:text-[9px] uppercase tracking-[0.2em] opacity-60">{product.era}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-serif text-sm lg:text-base text-muted-gold/90">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(product.price)}
          </span>
        </div>
        <p className="mt-4 font-sans text-[10px] lg:text-[11px] text-parchment/50 leading-relaxed line-clamp-2 italic">
          {product.story}
        </p>
        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              router.push('/cart');
            }}
            className="bg-muted-gold/10 hover:bg-muted-gold/25 border border-muted-gold/20 text-[8px] lg:text-[10px] text-muted-gold uppercase tracking-widest px-5 py-2 transition-all rounded-full"
          >
            Add to Bag
          </button>
          <span className="font-serif text-muted-gold/60 text-[10px] lg:text-[11px] italic group-hover:text-muted-gold/90 transition-colors">
            Discover provenance →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
