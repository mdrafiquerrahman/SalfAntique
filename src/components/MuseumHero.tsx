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
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full transition-all duration-500 hover:bg-white hover:border-white"
              >
                <span className="relative z-10 text-[11px] lg:text-[13px] font-bold tracking-[0.2em] text-white uppercase group-hover:text-[#5d735d] transition-colors duration-500">
                  SHOP OUR COLLECTIONS
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
