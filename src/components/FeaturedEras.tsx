"use client";
import Link from "next/link";

export default function FeaturedEras() {
  const panels = [
    { key: "victorian", title: "Victorian", from: "from-[#2b0e15]", to: "to-[#14070a]" },
    { key: "artdeco", title: "Art Deco", from: "from-[#0d1c33]", to: "to-[#0a1422]" },
    { key: "edwardian", title: "Edwardian", from: "from-[#0f2d1f]", to: "to-[#0a1c14]" },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-gray-800 tracking-wide">Curated Collections</h2>
          <div className="mt-2 mx-auto w-12 h-px bg-muted-gold/40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {panels.map((p) => (
            <div
              key={p.key}
              className={`group relative h-64 sm:h-72 cursor-pointer overflow-hidden border border-gray-100 shadow-sm rounded-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${p.from} ${p.to} opacity-90 group-hover:scale-105 transition-transform duration-700`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="font-serif text-white text-2xl tracking-[0.2em] uppercase">{p.title}</span>
                  <span className="mt-4 text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase border-b border-white/30 pb-1 group-hover:text-white group-hover:border-white transition-all">Explore Era</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
