"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function NavBar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const categories = {
    jewelry: [
      { name: "All Jewelry", href: "/jewelry" },
      { name: "Necklaces", href: "/jewelry?category=necklace" },
      { name: "Earrings", href: "/jewelry?category=earrings" },
      { name: "Bangles & Bracelets", href: "/jewelry?category=bangles" },
      { name: "Rings", href: "/jewelry?category=rings" },
      { name: "Pendants", href: "/jewelry?category=pendants" },
    ],
    collections: [
      { name: "All Collections", href: "/collections" },
      { name: "Antique", href: "/jewelry?era=antique" },
      { name: "Victorian", href: "/jewelry?era=victorian" },
      { name: "Art Deco", href: "/jewelry?era=art-deco" },
      { name: "Bridal", href: "/jewelry?category=bridal" },
    ],
    gemstones: [
      { name: "All Gemstones", href: "/gemstones" },
      { name: "Diamonds", href: "/diamonds" },
      { name: "Emeralds", href: "/gemstones?type=emerald" },
      { name: "Rubies", href: "/gemstones?type=ruby" },
      { name: "Sapphires", href: "/gemstones?type=sapphire" },
    ]
  };

  return (
    <div 
      className="z-50 w-full bg-white text-gray-800"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      {/* Main Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Top Row: Utilities */}
          <div className="flex items-center justify-between py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsSearchOpen(false);
                }}
                className="p-1 hover:text-brilliant-green transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <Link href="/stores" prefetch={false} className="hover:text-[#5d735d] transition-colors">Our Office</Link>
              <Link 
                href="/appointment" 
                prefetch={false} 
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 hover:bg-[#5d735d] hover:text-white transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Customer Support
              </Link>
            </div>

            {/* Mobile Logo (Visible only on mobile in top row) */}
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <div className="relative w-7 h-7 overflow-hidden rounded-full border border-gray-100">
                <Image src="/logo.png" alt="Salf Antqe Logo" fill className="object-cover" />
              </div>
              <span className="font-serif text-[13px] tracking-[0.15em] text-gray-900 uppercase whitespace-nowrap">Salf Antqe</span>
            </Link>

            <div className="flex items-center gap-4 lg:gap-5">
              {/* Search Toggle */}
              <div className="relative flex items-center">
                {isSearchOpen && (
                  <form onSubmit={handleSearch} className="absolute right-full mr-2 lg:mr-4 hidden lg:block">
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-32 lg:w-48 border-b border-gray-300 bg-transparent py-1 px-2 text-[11px] focus:outline-none focus:border-brilliant-green transition-all"
                      autoFocus
                    />
                  </form>
                )}
                <button 
                  onClick={() => {
                    if (isSearchOpen && searchQuery.trim()) {
                      handleSearch({ preventDefault: () => {} } as React.FormEvent);
                    } else {
                      setIsSearchOpen(!isSearchOpen);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`transition-colors ${isSearchOpen ? 'text-brilliant-green' : 'hover:text-brilliant-green'}`}
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Wishlist Link */}
              <Link href="/wishlist" prefetch={false} className="hover:text-brilliant-green transition-colors">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-brilliant-green transition-colors"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brilliant-green text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full min-w-[14px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Dropdown (Appears below logo row) */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden bg-gray-50 border-t border-gray-100"
              >
                <div className="px-4 py-3">
                  <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <button type="submit" className="text-gray-400 hover:text-brilliant-green transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <input 
                      type="text" 
                      placeholder="Search Salf Antqe..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-[13px] focus:outline-none"
                      autoFocus
                    />
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-gray-50"
              >
                <div className="flex flex-col py-4 px-2 space-y-4 text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                  <Link href="/stores" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 hover:text-brilliant-green transition-colors">Stores</Link>
                  <Link href="/appointment" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 hover:text-brilliant-green transition-colors">Virtual Appointment</Link>
                  <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 hover:text-brilliant-green transition-colors">Collections</Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 hover:text-brilliant-green transition-colors">Our Story</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Middle Row: Logo (Desktop only) */}
          <div className="hidden lg:flex justify-center py-8">
            <Link href="/" prefetch={false} className="flex items-center gap-8 group">
              <span className="text-4xl lg:text-5xl font-serif tracking-[0.2em] text-gray-900 uppercase group-hover:text-brilliant-green transition-colors duration-500">
                Salf
              </span>
              <div className="relative w-20 h-20 overflow-hidden rounded-full border border-gray-100 group-hover:border-brilliant-green transition-all duration-500 shadow-md group-hover:shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Salf Antqe Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-4xl lg:text-5xl font-serif tracking-[0.2em] text-gray-900 uppercase group-hover:text-brilliant-green transition-colors duration-500">
                Antqe
              </span>
            </Link>
          </div>

          {/* Bottom Row: Navigation */}
          <nav className="hidden lg:flex justify-center gap-8 lg:gap-12 pb-4 text-[12px] font-semibold tracking-widest text-gray-700 uppercase">
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu('gemstones')}
            >
              <Link href="/gemstones" prefetch={false} className="hover:text-brilliant-green border-b-2 border-transparent hover:border-brilliant-green pb-1 transition-all whitespace-nowrap">Gemstones</Link>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu('jewelry')}
            >
              <Link href="/jewelry" prefetch={false} className="hover:text-brilliant-green border-b-2 border-transparent hover:border-brilliant-green pb-1 transition-all whitespace-nowrap">Jewelry</Link>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu('collections')}
            >
              <Link href="/collections" prefetch={false} className="hover:text-brilliant-green border-b-2 border-transparent hover:border-brilliant-green pb-1 transition-all whitespace-nowrap">Collections</Link>
            </div>
            <Link href="/gifts" prefetch={false} className="hover:text-brilliant-green border-b-2 border-transparent hover:border-brilliant-green pb-1 transition-all whitespace-nowrap">Gifts</Link>
            <Link href="/about" prefetch={false} className="hover:text-brilliant-green border-b-2 border-transparent hover:border-brilliant-green pb-1 transition-all whitespace-nowrap">About</Link>
          </nav>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 w-full bg-white border-b border-gray-100 shadow-xl z-40 overflow-hidden"
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="grid grid-cols-4 gap-12">
                  <div className="col-span-1">
                    <h3 className="text-brilliant-green text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                      Shop by {activeMegaMenu}
                    </h3>
                    <ul className="space-y-4">
                      {categories[activeMegaMenu as keyof typeof categories].map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href} 
                            className="text-gray-600 hover:text-brilliant-green text-[13px] font-medium transition-colors"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-8">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                      <Image 
                        src="/necklace-coral.jpg" 
                        alt="Featured" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-6">
                        <div className="text-white">
                          <p className="text-[10px] uppercase tracking-widest mb-1">New Collection</p>
                          <h4 className="font-serif text-xl">The Heritage Series</h4>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                      <Image 
                        src="/necklace-amber-disc.jpg" 
                        alt="Featured" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-6">
                        <div className="text-white">
                          <p className="text-[10px] uppercase tracking-widest mb-1">Best Seller</p>
                          <h4 className="font-serif text-xl">Antique Gold Pendants</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 bg-gray-50 rounded-xl p-6 flex flex-col justify-center text-center">
                    <h4 className="font-serif text-2xl text-gray-900 mb-2">Exquisite Craftsmanship</h4>
                    <p className="text-[12px] text-gray-500 leading-relaxed mb-6">Discover pieces that tell a story of timeless beauty and heritage.</p>
                    <Link 
                      href="/jewelry" 
                      className="inline-block bg-brilliant-green text-white text-[10px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-opacity-90 transition-all"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
