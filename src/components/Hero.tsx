"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative tapestry-onyx-grain">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-gradient-to-b from-[#c5a059]/30 to-transparent blur-2xl opacity-20" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center">
        <div className="relative h-40 w-40 opacity-10">
          <svg viewBox="0 0 1 1" className="h-full w-full">
            <image href="/logo.png" height="1" width="1" preserveAspectRatio="xMidYMid meet" />
          </svg>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
        <motion.h1
          className="font-serif text-5xl sm:text-7xl leading-tight tracking-tight text-parchment"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          SALF Antqe
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl font-sans text-parchment/80 text-lg sm:text-xl tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
        >
          Vintage-Modern curation of rare Victorian, Art Deco, and Edwardian jewelry.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Link
            href="#gallery"
            className="inline-flex items-center rounded-full border border-muted-gold px-6 py-3 text-parchment font-serif transition-all hover:bg-muted-gold hover:text-offblack"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"
      />
    </section>
  );
}
