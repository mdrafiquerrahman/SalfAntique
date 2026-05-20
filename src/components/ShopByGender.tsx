"use client";
import Link from "next/link";

export default function ShopByGender() {
  return (
    <section className="tapestry-onyx-grain mx-auto max-w-6xl px-6 py-10">
      <div className="font-serif text-parchment text-2xl mb-5">Shop By Gender</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/"
          className="rounded-xl border border-muted-gold/40 bg-gradient-to-br from-[#3a1e2a] to-[#12090f] p-10 text-parchment text-center"
        >
          Women
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-muted-gold/40 bg-gradient-to-br from-[#1e2a3a] to-[#090f12] p-10 text-parchment text-center"
        >
          Men
        </Link>
      </div>
    </section>
  );
}
