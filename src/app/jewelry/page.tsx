"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GalleryGrid from "@/components/GalleryGrid";

export default function JewelryPage() {
  const pathname = usePathname();
  const title = pathname?.split('/').pop()?.replace(/-/g, ' ') || 'Jewelry';

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            {title}
          </h1>
          <div className="mt-4 h-px w-20 bg-brilliant-green opacity-30"></div>
        </div>
        
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </div>
    </main>
  );
}
