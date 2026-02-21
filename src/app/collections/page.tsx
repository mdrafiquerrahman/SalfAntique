import GalleryGrid from "@/components/GalleryGrid";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";

const collectionTypes = [
  { key: "antique", label: "Antique", image: "/necklace-amber-disc.jpg" },
  { key: "pendant", label: "Pendants", image: "/necklace-mandala.jpg" },
  { key: "choker", label: "Chokers", image: "/necklace-stippled.jpg" },
  { key: "long-necklace", label: "Long Necklaces", image: "/necklace-coral.jpg" },
  { key: "short-necklace", label: "Short Necklaces", image: "/necklace-coral-turquoise.jpg" },
];

export default function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const category = resolvedParams.category;

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : "Our Collections"}
          </h1>
          <div className="mt-4 h-px w-20 bg-brilliant-green opacity-30"></div>
          <p className="mt-6 text-gray-600 font-serif italic max-w-2xl">
            {category 
              ? `Exploring our curated selection of rare ${category} treasures, each with its own story and timeless elegance.`
              : "Explore our curated selection of rare antique treasures, each with its own story and timeless elegance."}
          </p>
        </div>

        {/* Collection Types Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {collectionTypes.map((item) => (
            <Link
              key={item.key}
              href={`/collections?category=${item.key}`}
              className={`relative group overflow-hidden rounded-xl aspect-[3/2] shadow-sm hover:shadow-md transition-all ${
                category === item.key ? 'ring-2 ring-offset-2 ring-[#5d735d]' : ''
              }`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white text-lg md:text-xl tracking-widest uppercase drop-shadow-md z-10">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16">
          <GalleryGrid category={category} key={category || 'all'} />
        </div>
      </div>
    </main>
  );
}