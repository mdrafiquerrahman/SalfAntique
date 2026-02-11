"use client";

export default function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-muted-gold/30 bg-offblack">
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
