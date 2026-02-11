"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PromoHero() {
  return (
    <section className="relative overflow-hidden tapestry-burgundy-grain">
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[100rem] h-[100rem] rounded-full bg-gradient-to-b from-[#c5a059]/25 to-transparent blur-3xl opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-start gap-4"
        >
          <div className="text-muted-gold uppercase tracking-[0.25em] text-xs">
            Modern Interpretations in Diamond
          </div>
          <h1 className="font-serif text-parchment text-4xl sm:text-6xl leading-tight">
            Curated for the Festival of Diamonds
          </h1>
          <p className="text-parchment/80 max-w-2xl">
            Discover newly launched collections and trendsetting pieces suited for every occasion.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="#collections"
              className="inline-flex items-center rounded-full border border-muted-gold px-6 py-3 text-parchment font-serif transition-all hover:bg-muted-gold hover:text-offblack"
            >
              Explore Collections
            </Link>
            <Link
              href="#boutique"
              className="inline-flex items-center rounded-full border border-muted-gold/60 px-6 py-3 text-parchment/90 transition-all hover:bg-muted-gold/20"
            >
              Find Boutique
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
