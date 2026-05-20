"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const REFUND_POLICY = [
  {
    title: "Return Policy",
    items: [
      {
        q: "Return & Exchange Window",
        a: "Products can be returned or exchanged within 7 days of delivery."
      },
      {
        q: "Condition Requirements",
        a: "Items must be unused, unworn, and returned in original packaging with tags intact."
      },
      {
        q: "Refund Eligibility",
        a: "Refunds are only applicable for damaged, defective, missing, or incorrect products received."
      }
    ]
  },
  {
    title: "Damage Reporting",
    items: [
      {
        q: "Reporting Timeframe",
        a: "Customers must report damaged or wrong items within 24–48 hours of delivery with photo/video proof."
      }
    ]
  },
  {
    title: "Non-Returnable Items",
    items: [
      {
        q: "Excluded Categories",
        a: "Earrings, customized jewellery, and clearance/sale items are non-returnable and non-refundable."
      }
    ]
  },
  {
    title: "Refund Processing",
    items: [
      {
        q: "Prepaid Order Refunds",
        a: "Refunds for prepaid orders will be processed to the original payment method within 5–10 business days after quality inspection."
      },
      {
        q: "COD Order Refunds",
        a: "Cash on Delivery (COD) order refunds will be processed via UPI, bank transfer, or store credit only."
      }
    ]
  },
  {
    title: "Policy Enforcement",
    items: [
      {
        q: "Return Rejection",
        a: "The company reserves the right to reject returns that do not meet the return policy conditions."
      }
    ]
  }
];

export default function RefundPolicyPage() {
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
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.5em] font-sans">Customer Care</span>
            <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-none tracking-tighter">
              Refund <br /><span className="italic text-brilliant-green">Policy</span>
            </h1>
            <p className="text-gray-500 font-sans text-lg lg:text-xl max-w-xl italic leading-relaxed">
              Our commitment to your satisfaction with transparent and fair return policies for every acquisition.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {REFUND_POLICY.map((category, idx) => (
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
            <h2 className="font-serif text-3xl text-gray-900 tracking-tight">Need assistance with a return?</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest">Our support team is here to help</p>
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
              href="/support"
              className="px-10 py-4 rounded-2xl border border-brilliant-green text-brilliant-green text-[12px] font-bold uppercase tracking-widest hover:bg-brilliant-green hover:text-white transition-all"
            >
              Contact Support
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
