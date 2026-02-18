"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function NavBar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
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
    categories: [
      { name: "Necklaces Sets", href: "/jewelry?category=necklace" },
      { name: "Choker Sets", href: "/jewelry?category=choker" },
      { name: "Pendant Sets", href: "/jewelry?category=pendant" },
      { name: "Earring Designs", href: "/jewelry?category=earrings" },
      { name: "Bangles and Bracelets", href: "/jewelry?category=bangles" },
      { name: "Long Necklace Sets", href: "/jewelry?category=long-necklace" },
      { name: "Rings", href: "/jewelry?category=rings" },
      { name: "Hair Accessories", href: "/jewelry?category=hair-accessories" },
      { name: "Waistbands", href: "/jewelry?category=waistbands" },
      { name: "Mangalsutra Collection", href: "/jewelry?category=mangalsutra" },
    ],
    collections: [
      { name: "All Collections", href: "/collections" },
      { name: "Antique", href: "/jewelry?era=antique" },
      { name: "Victorian", href: "/jewelry?era=victorian" },
      { name: "Art Deco", href: "/jewelry?era=art-deco" },
      { name: "Bridal", href: "/jewelry?category=bridal" },
    ],
    bridal: [
      { name: "All Bridal", href: "/jewelry?category=bridal" },
      { name: "Wedding Sets", href: "/jewelry?category=wedding-sets" },
      { name: "Maang Tikka", href: "/jewelry?category=maang-tikka" },
    ]
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[100] w-full bg-white text-gray-800 shadow-sm"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      {/* Main Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-[1920px] px-4 lg:px-12">
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-800 hover:text-brilliant-green transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-serif tracking-[0.15em] text-gray-900 uppercase">Salf</span>
              <div className="relative w-8 h-8 overflow-hidden rounded-full border border-gray-100">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-serif tracking-[0.15em] text-gray-900 uppercase">Antqe</span>
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-800 hover:text-brilliant-green transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/wishlist" className="relative text-gray-800 hover:text-brilliant-green transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-800 hover:text-brilliant-green transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brilliant-green text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-col w-full py-2">
            
            {/* Top Row: Utility, Logo, Icons */}
            <div className="flex justify-between items-center h-16 relative">
              
              {/* Left: Utility Links */}
              <div className="flex gap-6 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                <Link href="/office" className="hover:text-brilliant-green transition-colors">Our Office</Link>
                <Link href="/support" className="hover:text-brilliant-green transition-colors">Support</Link>
              </div>

              {/* Center: Split Logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link href="/" className="flex items-center gap-4 group">
                  <span className="text-2xl font-serif tracking-[0.15em] text-gray-900 uppercase group-hover:text-brilliant-green transition-colors duration-500">
                    Salf
                  </span>
                  <div className="relative w-14 h-14 overflow-hidden rounded-full border border-gray-100 group-hover:border-brilliant-green transition-all duration-500">
                    <Image
                      src="/logo.png"
                      alt="Salf Antqe Logo"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-2xl font-serif tracking-[0.15em] text-gray-900 uppercase group-hover:text-brilliant-green transition-colors duration-500">
                    Antqe
                  </span>
                </Link>
              </div>

              {/* Right: Icons */}
              <div className="flex items-center justify-end gap-6">
                <div className="relative flex items-center">
                  {isSearchOpen && (
                    <form onSubmit={handleSearch} className="absolute right-full mr-4">
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-40 border-b border-gray-200 bg-transparent py-1 px-2 text-[13px] focus:outline-none focus:border-brilliant-green transition-all"
                        autoFocus
                      />
                    </form>
                  )}
                  <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className={`text-gray-800 transition-colors ${isSearchOpen ? 'text-brilliant-green' : 'hover:text-brilliant-green'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                <Link href="/wishlist" className="relative text-gray-800 hover:text-brilliant-green transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-gray-800 hover:text-brilliant-green transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brilliant-green text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Row: Navigation */}
            <nav className="flex justify-center gap-12 mt-2 text-[11px] font-bold tracking-[0.15em] text-gray-600 uppercase">
              <Link href="/jewelry?category=gemstones" className="hover:text-brilliant-green transition-colors whitespace-nowrap">Gemstones</Link>
              
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('categories')}
              >
                <span className="flex items-center gap-1 hover:text-brilliant-green transition-colors whitespace-nowrap">
                  Jewelry
                </span>
              </div>

              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('collections')}
              >
                <span className="flex items-center gap-1 hover:text-brilliant-green transition-colors whitespace-nowrap">
                  Collections
                </span>
              </div>

              <Link href="/gifts" className="hover:text-brilliant-green transition-colors whitespace-nowrap">Gifts</Link>
              <Link href="/about" className="hover:text-brilliant-green transition-colors whitespace-nowrap">About</Link>
            </nav>
          </div>
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
                        sizes="(max-width: 1280px) 25vw, 300px"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-white z-50 lg:hidden overflow-y-auto shadow-xl"
            >
              <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-serif tracking-widest uppercase">Menu</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  <Link 
                    href="/jewelry?category=gemstones" 
                    className="text-lg font-medium text-gray-800 hover:text-brilliant-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Gemstones
                  </Link>
                  <Link 
                    href="/jewelry" 
                    className="text-lg font-medium text-gray-800 hover:text-brilliant-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Jewelry
                  </Link>
                  <Link 
                    href="/collections" 
                    className="text-lg font-medium text-gray-800 hover:text-brilliant-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Collections
                  </Link>
                  <Link 
                    href="/gifts" 
                    className="text-lg font-medium text-gray-800 hover:text-brilliant-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Gifts
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-lg font-medium text-gray-800 hover:text-brilliant-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  
                  <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                    <Link 
                      href="/office" 
                      className="text-sm font-bold tracking-widest text-gray-400 uppercase hover:text-brilliant-green transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Office
                    </Link>
                    <Link 
                      href="/support" 
                      className="text-sm font-bold tracking-widest text-gray-400 uppercase hover:text-brilliant-green transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Support
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
