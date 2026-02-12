"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus("success");
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
      setStatus("idle");
    }
  };

  return (
    <footer id="contact" className="border-t border-muted-gold/30 bg-offblack overflow-hidden">
      {/* Newsletter Section */}
      <div className="border-b border-muted-gold/10">
        <div className="mx-auto max-w-7xl px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="font-serif text-3xl text-parchment mb-4 italic">Join the Inner Circle</h3>
            <p className="text-parchment/50 text-sm tracking-wide leading-relaxed">
              Subscribe to receive exclusive early access to our newest antique acquisitions, 
              historical narratives, and private collection releases.
            </p>
          </div>
          
          <div className="w-full lg:w-auto min-w-[320px] lg:min-w-[450px]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-muted-gold/5 border border-muted-gold/20 p-6 text-center"
                >
                  <p className="font-serif italic text-muted-gold text-lg mb-2">Welcome to the Archive</p>
                  <p className="text-parchment/40 text-[10px] uppercase tracking-widest">A confirmation has been sent to your email.</p>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-muted-gold/[0.03] border border-muted-gold/20 px-6 py-4 font-serif italic text-parchment focus:outline-none focus:border-muted-gold/60 transition-all text-sm"
                    required
                    disabled={status === "loading"}
                  />
                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-muted-gold/90 px-8 py-4 font-serif text-offblack text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-parchment transition-all shadow-lg whitespace-nowrap disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                  >
                    {status === "loading" ? (
                      <svg className="animate-spin h-4 w-4 text-offblack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Subscribe"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="font-serif text-parchment text-lg">Contact</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-parchment/80">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[#c5a059]/60 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" fill="#c5a059"/>
                <circle cx="12" cy="9" r="2.5" fill="#c5a059"/>
              </svg>
            </span>
            <div>
              <div className="text-parchment/60 text-xs uppercase tracking-widest">Address</div>
              <a 
                href="https://maps.google.com/?q=19.013641,73.036125"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs leading-relaxed hover:text-muted-gold transition-colors"
              >
                Shop no 3 Raghunath apartment, Fanaspada Gaon, Sector 19, Belapur, Navi Mumbai, 400614
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[#c5a059]/60 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16v16H4z" fill="none" />
                <path d="M4 7l8 5 8-5" stroke="#c5a059" strokeWidth="1.5" fill="none" />
                <path d="M4 7v10h16V7" stroke="#c5a059" strokeWidth="1.5" fill="none" />
              </svg>
            </span>
            <div>
              <div className="text-parchment/60 text-xs uppercase tracking-widest">Email</div>
              <a href="mailto:rafiquerrahman66@gmail.com" className="hover:text-muted-gold transition-colors text-xs">
                rafiquerrahman66@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[#c5a059]/60 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="#c5a059" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="#c5a059" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="#c5a059" />
              </svg>
            </span>
            <div>
              <div className="text-parchment/60 text-xs uppercase tracking-widest">Instagram</div>
              <a
                href="https://instagram.com/salfantique"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-gold transition-colors text-xs"
              >
                @salfantique
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[#c5a059]/60 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 4l3 3-2 2c1.5 3 4 5.5 7 7l2-2 3 3-2 3c-7 0-14-7-14-14l3-2z" stroke="#c5a059" strokeWidth="1.5" fill="none" />
              </svg>
            </span>
            <div>
              <div className="text-parchment/60 text-xs uppercase tracking-widest">Phone</div>
              <a href="tel:+917977556989" className="hover:text-muted-gold transition-colors text-xs">
                +91 79775 56989
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
