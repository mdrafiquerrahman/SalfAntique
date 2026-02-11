"use client";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl text-gray-900 tracking-wide uppercase">Your Wishlist</h1>
          <p className="mt-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Treasures you've discovered
          </p>
          <div className="mt-4 h-px w-20 bg-brilliant-green mx-auto opacity-30"></div>
        </div>

        <div className="py-32 border border-dashed border-gray-200 rounded-lg bg-white flex flex-col items-center justify-center">
          <svg className="w-16 h-16 text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="font-serif text-xl text-gray-800">Your Wishlist is Empty</h2>
          <p className="mt-2 text-sm text-gray-400 italic mb-10">Start saving your favorite antique pieces here.</p>
          <Link 
            href="/" 
            className="border border-gray-900 px-10 py-3 text-[11px] font-bold tracking-[0.2em] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-all"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </main>
  );
}
