"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20 lg:py-32 selection:bg-brilliant-green/30">
      <div className="mx-auto max-w-7xl px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-none tracking-tighter mb-6">
              About <span className="italic text-brilliant-green">Ethenic Glitz</span>
            </h1>
            <div className="h-px w-32 bg-brilliant-green mx-auto opacity-30"></div>
          </div>

          <div className="space-y-8 text-gray-700 font-sans text-lg leading-relaxed">
            <p>
              Welcome to <span className="font-bold text-gray-900">Ethenic Glitz</span>, where elegance meets tradition. We specialize in premium imitation jewellery crafted to bring style, beauty, and confidence to every occasion. From timeless ethnic collections to modern fashion designs, our jewellery is created for women who love affordable luxury without compromising on quality.
            </p>

            <p>
              At <span className="font-bold text-gray-900">Ethenic Glitz</span>, we believe jewellery is more than an accessory — it is a reflection of personality, culture, and self-expression. Our mission is to provide trendy, high-quality, and beautifully designed jewellery inspired by Indian heritage and contemporary fashion.
            </p>

            <p>
              Each product is carefully selected to ensure excellent craftsmanship, attractive finishing, and comfortable wear. Whether you are dressing for weddings, festivals, parties, or everyday elegance, we aim to make every moment shine.
            </p>

            <p>
              Customer satisfaction and trust are at the heart of our brand. We are committed to offering stylish collections, secure shopping, reliable support, and a seamless online shopping experience.
            </p>

            <p className="italic text-gray-600">
              Thank you for choosing <span className="font-bold text-gray-900">Ethenic Glitz</span> to be a part of your style journey.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link 
              href="/" 
              className="inline-block bg-brilliant-green px-12 py-4 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all rounded-xl"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
