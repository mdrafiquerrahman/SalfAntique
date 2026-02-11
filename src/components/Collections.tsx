"use client";
import Link from "next/link";
import OrnateFrame from "./OrnateFrame";

const items = [
  { key: "victorian", label: "Victorian", bg: "from-[#5b3a3a] to-[#2a1e1e]" },
  { key: "art-deco", label: "Art Deco", bg: "from-[#3a4b5b] to-[#1e252a]" },
  { key: "edwardian", label: "Edwardian", bg: "from-[#4b5b3a] to-[#212a1e]" },
  { key: "georgian", label: "Georgian", bg: "from-[#5b4b3a] to-[#2a2320]" },
];

export default function Collections() {
  return (
    <section id="collections" className="w-full">
      <div className="flex flex-col items-center mb-12">
        <h2 className="font-serif text-3xl text-gray-800 tracking-wide">Curated Collections</h2>
        <div className="mt-2 w-16 h-0.5 bg-brilliant-green opacity-30"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((i) => (
          <Link 
            key={i.key} 
            href={`/collections?era=${i.key}`}
            className="group relative cursor-pointer overflow-hidden"
          >
            <div className={`aspect-[4/5] w-full bg-gradient-to-br ${i.bg} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-white text-2xl tracking-widest uppercase">{i.label}</span>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-bold tracking-widest text-white uppercase border-b border-white pb-1">Shop Collection</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
