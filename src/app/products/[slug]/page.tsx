"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { products } from "../../../data/products";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import OrnateFrame from "../../../components/OrnateFrame";
import MacroZoom from "../../../components/MacroZoom";
import * as React from "react";
import { useCart } from "../../../context/CartContext";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [pincode, setPincode] = React.useState("");
  const [pincodeStatus, setPincodeStatus] = React.useState<"idle" | "checking" | "available" | "unavailable">("idle");

  const checkPincode = () => {
    if (!pincode || pincode.length < 6) return;
    setPincodeStatus("checking");
    setTimeout(() => {
      // Mock check: even pincodes are available
      setPincodeStatus(parseInt(pincode) % 2 === 0 ? "available" : "unavailable");
    }, 1000);
  };

  const handleInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-appointment-bot", {
      detail: { message: `I am interested in the ${product.name}. Could you provide more details regarding its provenance?` }
    }));
  };

  const handleAcquire = () => {
    window.dispatchEvent(new CustomEvent("open-appointment-bot", {
      detail: { message: `I would like to acquire the ${product.name}. Please guide me through the private acquisition process.` }
    }));
  };

  return (
    <div className="min-h-screen bg-offblack selection:bg-muted-gold/30">
      {/* Decorative background grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] z-50" />
      
      <div className="mx-auto max-w-[1440px] px-8 lg:px-20 py-16 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-24 lg:gap-40">
          
          {/* Left: Sticky Image Gallery */}
          <div className="lg:w-[45%]">
            <div className="lg:sticky lg:top-32 space-y-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <OrnateFrame>
                  <div className="relative aspect-[4/5] bg-offblack/60 group overflow-hidden shadow-2xl">
                    <Image
                      src={product.image || "/window.svg"}
                      alt={product.name}
                      fill
                      className="object-cover md:object-contain p-0 md:p-16 transition-transform duration-1000 group-hover:scale-105"
                      priority
                    />
                    {/* Soft Vintage Vignette Overlay */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)] mix-blend-multiply" />
                  </div>
                </OrnateFrame>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 gap-10"
              >
                {product.secondaryImages?.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="relative aspect-square rounded-sm border border-muted-gold/5 overflow-hidden bg-offblack/40 group cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} detail ${i + 1}`}
                      fill
                      className="object-cover md:object-contain p-0 md:p-10 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-muted-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>

              {product.hallmarkImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 pt-12 border-t border-muted-gold/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-muted-gold/20" />
                    <h3 className="font-serif text-muted-gold/60 text-[9px] uppercase tracking-[0.4em]">Master Hallmark</h3>
                  </div>
                  <div className="max-w-[280px]">
                    <MacroZoom image={product.hallmarkImage} title="Hallmark Detail" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: Scrollable Information Panel */}
          <div className="lg:w-[55%] space-y-24 py-8">
            {/* Header & Price */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-muted-gold/80 font-sans text-[10px] uppercase tracking-[0.5em]">
                  <span className="text-muted-gold/90">{product.era} Period</span>
                  <span className="h-[1px] w-8 bg-muted-gold/60" />
                  <span>Inv. No. {slug.slice(0, 4).toUpperCase()}</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-parchment leading-tight tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4 pt-2">
                  <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-muted-gold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0
                    }).format(product.price)}
                  </span>
                  <span className="text-muted-gold/80 text-[10px] uppercase tracking-[0.2em] font-sans">Inc. Private Acquisition Fees</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="h-[1px] w-24 bg-muted-gold/20" />
                
                {/* Cart Actions */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch gap-4">
                    <div className="flex items-center justify-between border border-muted-gold/40 rounded-xl bg-muted-gold/[0.02] px-2">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-muted-gold hover:text-parchment transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 12H4" /></svg>
                      </button>
                      <span className="w-12 text-center text-parchment font-serif text-xl">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 text-muted-gold hover:text-parchment transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        addToCart(product, quantity);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 py-5 px-8 border border-muted-gold/60 text-parchment text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-muted-gold hover:text-offblack transition-all duration-700 relative group overflow-hidden rounded-xl"
                    >
                      <span className="relative z-10">Add to Cart</span>
                      <div className="absolute inset-0 bg-muted-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      addToCart(product, quantity);
                      router.push('/checkout');
                    }}
                    className="w-full py-6 bg-[#0a2e1f] text-parchment border border-brilliant-green/50 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-brilliant-green transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 group rounded-xl"
                  >
                    Buy It Now
                    <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>

                <p className="text-muted-gold/60 text-[10px] italic font-serif tracking-wide">Secure global shipping and private consultation included.</p>
              </div>
            </motion.div>

            {/* The Story & Curator's Note */}
            <section className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-muted-gold/40" />
                  <span className="text-muted-gold font-serif italic text-lg">The Narrative</span>
                </div>
                <p className="font-serif text-xl lg:text-2xl text-parchment/90 leading-relaxed italic max-w-2xl">
                  {product.story}
                </p>
              </div>
              
              {product.curatorNote && (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-muted-gold/[0.04] border-l-[1px] border-muted-gold/40 p-10 space-y-4 max-w-xl"
                >
                  <span className="block font-serif text-muted-gold/80 text-xs italic tracking-wider">Curator's Insight</span>
                  <p className="font-sans text-parchment/80 text-sm leading-relaxed italic">
                    {product.curatorNote}
                  </p>
                </motion.div>
              )}
            </section>

            {/* Provenance & Heritage Timeline */}
            {product.timeline && product.timeline.length > 0 && (
              <section className="space-y-12">
                <div className="flex items-center gap-8">
                  <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/80">Historical Timeline</h2>
                  <div className="h-[1px] w-full bg-gradient-to-r from-muted-gold/60 to-transparent" />
                </div>
                <div className="relative pl-12 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-muted-gold/40 before:via-muted-gold/10 before:to-transparent">
                  {product.timeline.map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="relative"
                    >
                      <div className="absolute -left-[51.5px] top-2 h-[6px] w-[6px] rounded-full bg-muted-gold/40 ring-4 ring-offblack shadow-[0_0_15px_rgba(196,164,132,0.2)]" />
                      <div className="space-y-2">
                        <span className="font-serif text-muted-gold text-2xl leading-none opacity-80">{item.year}</span>
                        <div className="space-y-1">
                          <h4 className="font-serif text-parchment text-xl tracking-tight">{item.event}</h4>
                          {item.description && (
                            <p className="font-sans text-parchment/60 text-sm leading-relaxed max-w-lg">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Gemstones with Detail Zoom */}
            {product.gemstones && product.gemstones.length > 0 && (
              <section className="space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/60">Gemstone Analysis</h2>
                </div>
                <div className="grid gap-10">
                  {product.gemstones.map((g, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="rounded-sm border border-muted-gold/5 bg-offblack/30 p-10 transition-all duration-700 hover:border-muted-gold/20">
                        <div className="flex flex-col md:flex-row gap-10">
                          {g.detailImage && (
                            <div className="w-full md:w-40">
                              <MacroZoom image={g.detailImage} title={`${g.name} Detail`} />
                            </div>
                          )}
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0">
                              <div className="space-y-1">
                                <h4 className="font-serif text-parchment text-3xl group-hover:text-muted-gold transition-colors duration-500">{g.name}</h4>
                                <p className="font-sans text-muted-gold/70 text-[10px] uppercase tracking-[0.3em]">
                                  {g.carat ? `${g.carat} Carats • ` : ""}{g.cut ? `${g.cut} Cut • ` : ""}{g.color}
                                </p>
                              </div>
                              {g.provenance && (
                                <span className="w-fit font-serif text-muted-gold/60 text-[10px] uppercase tracking-widest bg-muted-gold/[0.05] px-4 py-2 rounded-xl border border-muted-gold/20">{g.provenance}</span>
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-muted-gold/5" />
                            {g.cut && (
                              <p className="text-parchment/60 text-sm leading-relaxed italic max-w-xl">
                                The {g.cut.toLowerCase()} cut of this {g.name.toLowerCase()} is a testament to the artisan's skill in the {product.era} era.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Client Testimonials Section */}
            <section className="space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/80">Client Testimonials</h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-muted-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-muted-gold text-[10px] uppercase tracking-widest font-bold">4.9/5 Rating</span>
                </div>
              </div>
              
              <div className="space-y-10">
                {[
                  { name: "Eleanor V.", date: "Dec 2025", review: "The craftsmanship is even more breathtaking in person. A true heirloom piece that feels like it carries centuries of history." },
                  { name: "James L.", date: "Nov 2025", review: "Acquisition process was seamless and professional. The provenance documentation provided is exceptionally detailed." }
                ].map((rev, i) => (
                  <div key={i} className="border-b border-muted-gold/20 pb-10 last:border-0">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-serif text-parchment text-lg">{rev.name}</span>
                      <span className="text-muted-gold/50 text-[10px] uppercase tracking-widest">{rev.date}</span>
                    </div>
                    <p className="font-sans text-parchment/80 text-sm leading-relaxed italic">"{rev.review}"</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Specifications */}
            <section className="space-y-16">
              <div className="flex items-center gap-8">
                <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/80">Technical Specifications</h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-muted-gold/60 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted-gold/40 border border-muted-gold/40 rounded-xl overflow-hidden">
                {[
                  { label: "Composition", value: product.specs.metal },
                  { label: "Era & Origin", value: `${product.era}, ${product.specs.origin}` },
                  { label: "Gross Weight", value: product.specs.weight },
                  { label: "Condition Report", value: product.specs.condition },
                ].map((spec, i) => (
                  <div key={i} className="bg-offblack/40 p-10 space-y-4 hover:bg-muted-gold/[0.04] transition-colors">
                    <span className="block text-muted-gold/60 text-[9px] uppercase tracking-[0.4em] font-medium">{spec.label}</span>
                    <span className="block font-serif text-parchment text-xl tracking-tight leading-snug">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Delivery & Pincode Checker (Zapvi style) */}
            <section className="space-y-8 py-12 border-t border-muted-gold/10">
              <div className="flex items-center gap-6">
                <h2 className="font-serif text-[10px] font-bold uppercase tracking-[0.4em] text-muted-gold whitespace-nowrap">Check Delivery</h2>
                <div className="h-[1px] w-full bg-muted-gold/40" />
              </div>
              
              <div className="max-w-md space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Pincode" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="flex-1 bg-muted-gold/[0.08] border border-muted-gold/60 px-6 py-4 font-serif italic text-parchment focus:outline-none focus:border-muted-gold focus:ring-1 focus:ring-muted-gold/30 transition-all text-sm sm:text-base rounded-xl placeholder:text-muted-gold/20"
                  />
                  <button 
                    onClick={checkPincode}
                    disabled={pincode.length < 6 || pincodeStatus === "checking"}
                    className="bg-transparent px-12 py-4 font-serif text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center hover:bg-muted-gold/[0.1] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 transition-all border border-muted-gold/80 whitespace-nowrap rounded-full z-10 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                  >
                    {pincodeStatus === "checking" ? "Checking..." : "Check"}
                  </button>
                </div>
                
                <AnimatePresence mode="wait">
                  {pincodeStatus === "available" && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] text-green-500/80 font-sans tracking-wider flex items-center gap-2"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Standard delivery available to this location (3-5 days)
                    </motion.p>
                  )}
                  {pincodeStatus === "unavailable" && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] text-red-400/80 font-sans tracking-wider flex items-center gap-2"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      Currently unavailable for direct shipping. Contact curator.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Footer Actions */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-12 border-t border-muted-gold/10 flex flex-col lg:flex-row items-center justify-between gap-8"
            >
              <Link href="/" className="group flex items-center gap-6 text-parchment/60 hover:text-muted-gold transition-all duration-700">
                <div className="w-10 h-10 rounded-full border border-muted-gold/20 flex items-center justify-center group-hover:border-muted-gold/60 transition-all">
                  <span className="transition-transform group-hover:-translate-x-1 text-xl">←</span>
                </div>
                <span className="font-serif italic tracking-[0.2em] text-[10px] uppercase">Return to Gallery</span>
              </Link>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
                <button 
                  onClick={handleInquiry}
                  className="px-6 py-4 border border-muted-gold/60 text-muted-gold/80 hover:text-muted-gold hover:border-muted-gold transition-all duration-500 uppercase text-[9px] tracking-[0.3em] font-bold rounded-xl"
                >
                  Private Inquiry
                </button>
                <button 
                  onClick={handleAcquire}
                  className="px-8 py-4 bg-muted-gold text-offblack hover:bg-parchment transition-all duration-700 uppercase text-[9px] tracking-[0.4em] font-bold shadow-2xl rounded-xl"
                >
                  Acquire Piece
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Sticky Mobile Add to Cart */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-offblack/80 backdrop-blur-xl border-t border-muted-gold/20 lg:hidden z-[60]"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-parchment font-serif text-sm truncate">{product.name}</p>
            <p className="text-muted-gold text-xs">₹{product.price.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => {
              addToCart(product, 1);
              setIsCartOpen(true);
            }}
            className="px-8 py-4 bg-[#0a2e1f] text-parchment border border-brilliant-green/50 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brilliant-green transition-all duration-500 shadow-xl rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}
