import GalleryGrid from "@/components/GalleryGrid";
import { use } from "react";

export default function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ era?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const era = resolvedParams.era;

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            {era ? `${era.charAt(0).toUpperCase() + era.slice(1)} Collection` : "Our Collections"}
          </h1>
          <div className="mt-4 h-px w-20 bg-brilliant-green opacity-30"></div>
          <p className="mt-6 text-gray-600 font-serif italic max-w-2xl">
            {era 
              ? `Exploring our curated selection of rare ${era} treasures, each with its own story and timeless elegance.`
              : "Explore our curated selection of rare antique treasures, each with its own story and timeless elegance."}
          </p>
        </div>
        
        <div className="mt-16">
          <GalleryGrid era={era} />
        </div>
      </div>
    </main>
  );
}