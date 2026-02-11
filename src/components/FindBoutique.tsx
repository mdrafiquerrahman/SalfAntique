"use client";
import Link from "next/link";

export default function FindBoutique() {
  return (
    <section id="boutique" className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-2xl border border-muted-gold/40 bg-offblack/60 p-6">
        <div className="font-serif text-parchment text-xl">Find a Boutique or Book a Consultation</div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full border border-muted-gold px-6 py-3 text-parchment transition-all hover:bg-muted-gold hover:text-offblack"
          >
            Book Consultation
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full border border-muted-gold/60 px-6 py-3 text-parchment/90 transition-all hover:bg-muted-gold/20"
          >
            Contact Boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
