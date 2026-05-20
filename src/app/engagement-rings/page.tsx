"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlaceholderPage() {
  const pathname = usePathname();
  const title = pathname?.split('/').pop()?.replace(/-/g, ' ') || 'Page';

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            {title}
          </h1>
          <div className="mt-4 h-px w-20 bg-brilliant-green mx-auto opacity-30"></div>
          
          <div className="mt-20 py-32 border border-gray-100 bg-white shadow-sm">
            <p className="text-gray-400 font-serif text-xl italic">Collection coming soon</p>
            <p className="mt-4 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
              Curating the finest antique treasures
            </p>
            <Link 
              href="/" 
              className="mt-12 inline-block bg-brilliant-green px-10 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
