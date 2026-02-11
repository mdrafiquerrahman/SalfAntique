"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MuseumHero() {
  return (
    <section className="relative h-[500px] lg:h-[600px] w-full overflow-hidden bg-[#e5e1da]">
      {/* Background Lifestyle Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Jewelry Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center lg:justify-end px-4 lg:px-8">
        <div className="max-w-md text-center lg:text-left lg:ml-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-serif text-3xl lg:text-5xl text-parchment leading-tight">
              Our Signature Collections
            </h2>
            <p className="mt-4 text-xs lg:text-base text-parchment/90 tracking-wide">
              The beauty of nature meets the brilliance of design.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/collections"
                prefetch={false}
                className="bg-transparent px-6 py-3 text-[10px] lg:text-[12px] font-bold tracking-widest text-parchment uppercase hover:bg-brilliant-green transition-all text-center border border-parchment/40 rounded-full"
              >
                Shop Our Collections
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
