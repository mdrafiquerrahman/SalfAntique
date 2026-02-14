"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How do I ensure the authenticity of an antique piece?",
    answer: "Every acquisition from Salf Antqe is accompanied by a Certificate of Authenticity and a detailed historical provenance report. Our in-house curators and independent gemologists rigorously verify each piece's period, materials, and craftsmanship."
  },
  {
    question: "Do you offer private viewings?",
    answer: "Yes, we offer both virtual and in-person private consultations. You can schedule a session through our curator chatbot or via the 'Customer Support' section in the navigation bar."
  },
  {
    question: "What is your shipping and delivery policy?",
    answer: "We provide complimentary, fully insured global shipping for all our treasures. Each piece is handled with extreme care and delivered via secure, private couriers to ensure its safety and your privacy."
  },
  {
    question: "Can I customize or resize an antique ring?",
    answer: "While we prioritize preserving the historical integrity of our pieces, minor resizing can often be performed by our specialist antique goldsmiths. We recommend discussing specific requirements during a consultation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and secure digital payments via Razorpay. For high-value acquisitions, private wire transfers are also available."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-offblack px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl lg:text-5xl text-parchment italic tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-gold/60 font-sans text-[11px] uppercase tracking-[0.4em]">The Archive Enquiries</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="border border-muted-gold/10 bg-muted-gold/[0.02] rounded-sm overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#5d735d]/5 transition-all duration-300 group"
              >
                <span className="font-serif text-lg text-parchment italic group-hover:text-white transition-colors">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-gold group-hover:text-[#5d735d] transition-all duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-parchment/60 font-serif text-base leading-relaxed border-t border-muted-gold/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
