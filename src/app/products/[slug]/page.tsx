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
  const { addToCart } = useCart();
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
      {/* Decorative Background Element */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('/grain.png')] z-50" />
      
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
          <div className="lg:w-[55%] space-y-32 py-8">
            {/* Header & Price */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-6 text-muted-gold/40 font-sans text-[9px] uppercase tracking-[0.5em]">
                  <span className="text-muted-gold/60">{product.era} Period</span>
                  <span className="h-[1px] w-8 bg-muted-gold/20" />
                  <span>Inv. No. {slug.slice(0, 4).toUpperCase()}</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-parchment leading-[0.95] md:leading-[0.85] tracking-tighter">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4 pt-4">
                  <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-muted-gold/90">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0
                    }).format(product.price)}
                  </span>
                  <span className="text-muted-gold/40 text-[10px] uppercase tracking-[0.2em] font-sans">Inc. Private Acquisition Fees</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="h-[1px] w-24 bg-muted-gold/20" />
                <p className="text-muted-gold/40 text-[10px] italic font-serif tracking-wide">Secure global shipping and private consultation included.</p>
              </div>
            </motion.div>

            {/* The Story & Curator's Note */}
            <section className="space-y-16">
              <div className="space-y-8">
                <h2 className="font-serif text-[10px] uppercase tracking-[0.4em] text-muted-gold/30">Narrative & Provenance</h2>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-muted-gold/[0.03] rounded-2xl border border-muted-gold/10 transition-all duration-700 group-hover:bg-muted-gold/[0.05] group-hover:border-muted-gold/20" />
                  <p className="relative font-sans text-parchment/80 leading-[1.6] text-xl md:text-2xl lg:text-3xl font-light italic max-w-2xl">
                    "{product.story}"
                  </p>
                </div>
              </div>
              
              {product.curatorNote && (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-muted-gold/[0.02] border-l-[1px] border-muted-gold/20 p-12 space-y-4 max-w-xl"
                >
                  <span className="block font-serif text-muted-gold/60 text-xs italic tracking-wider">Curator's Insight</span>
                  <p className="font-sans text-parchment/50 text-sm leading-relaxed italic">
                    {product.curatorNote}
                  </p>
                </motion.div>
              )}
            </section>

            {/* Provenance & Heritage Timeline */}
            <section className="space-y-16">
              <div className="flex items-center gap-8">
                <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/30">Historical Timeline</h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-muted-gold/20 to-transparent" />
              </div>
              <div className="relative pl-12 space-y-16 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-muted-gold/30 before:via-muted-gold/5 before:to-transparent">
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
                    <div className="space-y-3">
                      <span className="font-serif text-muted-gold text-2xl leading-none opacity-80">{item.year}</span>
                      <div className="space-y-2">
                        <h4 className="font-serif text-parchment text-xl tracking-tight">{item.event}</h4>
                        {item.description && (
                          <p className="font-sans text-parchment/40 text-sm leading-relaxed max-w-lg">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Gemstones with Detail Zoom */}
            <section className="space-y-16">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/30">Gemstone Analysis</h2>
                <span className="text-muted-gold/20 text-[9px] uppercase tracking-widest italic">Macro Inspection</span>
              </div>
              <div className="grid gap-12">
                {product.gemstones.map((g, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="rounded-sm border border-muted-gold/5 bg-offblack/30 p-12 transition-all duration-700 hover:border-muted-gold/20">
                      <div className="flex flex-col md:flex-row gap-12">
                        {g.detailImage && (
                          <div className="w-full md:w-40">
                            <MacroZoom image={g.detailImage} title={`${g.name} Detail`} />
                          </div>
                        )}
                        <div className="flex-1 space-y-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0">
                            <div className="space-y-2">
                              <h4 className="font-serif text-parchment text-3xl group-hover:text-muted-gold transition-colors duration-500">{g.name}</h4>
                              <p className="font-sans text-muted-gold/50 text-[10px] uppercase tracking-[0.3em]">
                                {g.carat ? `${g.carat} Carats • ` : ""}{g.cut ? `${g.cut} Cut • ` : ""}{g.color}
                              </p>
                            </div>
                            {g.provenance && (
                              <span className="w-fit font-serif text-muted-gold/30 text-[10px] uppercase tracking-widest bg-muted-gold/[0.03] px-4 py-2 rounded-full border border-muted-gold/5">{g.provenance}</span>
                            )}
                          </div>
                          <div className="h-[1px] w-full bg-muted-gold/5" />
                          {g.cut && (
                            <p className="text-parchment/30 text-sm leading-relaxed italic max-w-xl">
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

            {/* Technical Specifications */}
            <section className="space-y-16">
              <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/30">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 border-t border-muted-gold/5 pt-16">
                {[
                  { label: "Composition", value: product.specs.metal },
                  { label: "Era & Origin", value: `${product.era}, ${product.specs.origin}` },
                  { label: "Gross Weight", value: product.specs.weight },
                  { label: "Condition Report", value: product.specs.condition },
                ].map((spec, i) => (
                  <div key={i} className="space-y-3">
                    <span className="block text-muted-gold/30 text-[9px] uppercase tracking-[0.4em]">{spec.label}</span>
                    <span className="font-serif text-parchment text-2xl tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Delivery & Pincode Checker (Zapvi style) */}
            <section className="space-y-8 py-12 border-t border-muted-gold/5">
              <div className="flex items-center gap-6">
                <h2 className="font-serif text-xs uppercase tracking-[0.4em] text-muted-gold/30 whitespace-nowrap">Check Delivery</h2>
                <div className="h-[1px] w-full bg-muted-gold/5" />
              </div>
              
              <div className="max-w-md space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Pincode" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="flex-1 bg-muted-gold/[0.03] border border-muted-gold/10 px-6 py-4 font-serif italic text-parchment focus:outline-none focus:border-muted-gold/40 transition-all text-sm sm:text-base"
                  />
                  <button 
                    onClick={checkPincode}
                    disabled={pincode.length < 6 || pincodeStatus === "checking"}
                    className="bg-muted-gold/10 px-8 py-4 font-serif text-muted-gold text-[10px] uppercase tracking-widest hover:bg-muted-gold/20 disabled:opacity-20 transition-all border border-muted-gold/20 whitespace-nowrap"
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
                      Currently unavailable for direct shipping. Contact concierge.
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
              className="pt-12 border-t border-muted-gold/5 flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <Link href="/" className="group flex items-center gap-4 text-parchment/30 hover:text-muted-gold/60 transition-all duration-500">
                <span className="transition-transform group-hover:-translate-x-3 text-2xl">←</span>
                <span className="font-serif italic tracking-widest text-sm">Return to Archive</span>
              </Link>
              <div className="flex flex-col gap-6 w-full md:w-auto px-4 md:px-0">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center md:justify-end">
                  <button 
                    onClick={() => {
                      addToCart(product);
                      router.push('/cart');
                    }}
                    className="w-full sm:w-auto border border-muted-gold/40 px-10 py-5 font-serif text-muted-gold hover:bg-muted-gold/10 transition-all duration-500 uppercase text-[9px] tracking-[0.3em] font-bold"
                  >
                    Add to Bag
                  </button>
                  <button 
                    onClick={handleInquiry}
                    className="w-full sm:w-auto border border-muted-gold/20 px-10 py-5 font-serif text-muted-gold/60 hover:bg-muted-gold/[0.02] hover:border-muted-gold/40 transition-all duration-500 uppercase text-[9px] tracking-[0.3em]"
                  >
                    Private Inquiry
                  </button>
                  <button 
                    onClick={handleAcquire}
                    className="w-full sm:w-auto bg-muted-gold/90 px-12 py-5 font-serif text-offblack hover:bg-parchment transition-all duration-500 uppercase text-[9px] tracking-[0.4em] font-bold shadow-xl"
                  >
                    Acquire Piece
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
