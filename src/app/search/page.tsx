import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams.q;
  const query = typeof rawQuery === "string" ? rawQuery : Array.isArray(rawQuery) ? rawQuery[0] : "";

  const filteredProducts = products.filter((product) => {
    if (!query) return false;
    const searchStr = [
      product.name,
      product.era,
      product.story,
      product.curatorNote,
      product.specs?.metal,
      product.specs?.origin,
      ...(product.gemstones?.map((g) => g.name) || []),
    ].filter(Boolean).join(" ").toLowerCase();
    
    return searchStr.includes(query.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            Search Results
          </h1>
          <p className="mt-2 text-gray-500 font-serif italic">
            {query ? `Showing results for "${query}"` : "Please enter a search term"}
          </p>
          <div className="mt-4 h-px w-20 bg-brilliant-green opacity-30"></div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-gray-100 bg-white shadow-sm">
            <p className="text-gray-400 font-serif text-xl italic">No treasures found matching your search</p>
            <p className="mt-4 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
              Try different keywords or browse our collections
            </p>
            <Link 
              href="/" 
              className="mt-12 inline-block bg-brilliant-green px-10 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
