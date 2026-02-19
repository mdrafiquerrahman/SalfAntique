"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const HELP_CATEGORIES = [
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How do you handle global shipping?",
        a: "We provide secure, insured global shipping for all our antique pieces. Each item is packed in museum-grade protective cases to ensure its safety during transit."
      },
      {
        q: "What are the typical delivery times?",
        a: "Standard delivery within India takes 3-5 business days. International shipping typically takes 7-14 business days, depending on customs clearance."
      }
    ]
  },
  {
    title: "Private Acquisition",
    items: [
      {
        q: "What is the private acquisition process?",
        a: "Due to the rare nature of our collection, many pieces are handled through private consultation. This ensures provenance is properly documented and the acquisition meets our high standards of service."
      },
      {
        q: "Can I view pieces in person?",
        a: "Yes, we offer private viewings at our curated offices by appointment only. You can schedule a visit through our Customer Support page or via WhatsApp."
      }
    ]
  },
  {
    title: "Authentication",
    items: [
      {
        q: "How do you verify provenance?",
        a: "Every piece in our collection undergoes rigorous authentication by our master curators. We document the era, craftsmanship, and history, providing a Certificate of Provenance with every purchase."
      },
      {
        q: "Are the gemstones certified?",
        a: "Yes, all significant gemstones are accompanied by certifications from globally recognized laboratories such as GIA, IGI, or GRS."
      }
    ]
  },
  {
    title: "Care & Preservation",
    items: [
      {
        q: "How should I care for my antique jewelry?",
        a: "Antique pieces require delicate care. Avoid exposure to harsh chemicals, perfumes, and extreme temperatures. We recommend professional cleaning by a specialist in period jewelry."
      },
      {
        q: "Do you offer restoration services?",
        a: "We offer sympathetic restoration for pieces acquired through Salf Antqe to maintain their historical integrity and value."
      }
    ]
  }
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20 lg:py-32 selection:bg-brilliant-green/30">
      <div className="mx-auto max-w-7xl px-8 lg:px-20">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.5em] font-sans">Client Services</span>
            <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-none tracking-tighter">
              How can we <br /><span className="italic text-brilliant-green">assist you?</span>
            </h1>
            <p className="text-gray-500 font-sans text-lg lg:text-xl max-w-xl italic leading-relaxed">
              Explore our guide to shipping, private acquisitions, and the preservation of historical treasures.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {HELP_CATEGORIES.map((category, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-6">
                <h2 className="font-serif text-gray-400 text-xs uppercase tracking-[0.4em] whitespace-nowrap">{category.title}</h2>
                <div className="h-[1px] w-full bg-gray-200" />
              </div>
              
              <div className="space-y-10">
                {category.items.map((item, i) => (
                  <div key={i} className="group space-y-4">
                    <h3 className="font-serif text-gray-900 text-xl lg:text-2xl tracking-tight group-hover:text-brilliant-green transition-colors">
                      {item.q}
                    </h3>
                    <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-xl">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 pt-20 border-t border-gray-200 text-center space-y-12"
        >
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-gray-900 tracking-tight">Still have questions?</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest">Our curators are available for immediate consultation</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/917977556989" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-10 py-4 text-[14px] font-bold text-white shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Chat on WhatsApp
            </a>
            <Link 
              href="/appointment"
              className="px-10 py-4 rounded-2xl border border-brilliant-green text-brilliant-green text-[12px] font-bold uppercase tracking-widest hover:bg-brilliant-green hover:text-white transition-all"
            >
              Request Appointment
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
