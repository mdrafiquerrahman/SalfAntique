"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StoresPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            Our Office
          </h1>
          <div className="mt-4 h-px w-20 bg-brilliant-green mx-auto opacity-30"></div>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Store Information */}
            <div className="text-left bg-white p-8 lg:p-12 border border-gray-100 shadow-sm rounded-2xl">
              <h2 className="font-serif text-2xl text-gray-800 mb-6">Salf Antqe Boutique</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brilliant-green/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brilliant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Address</h3>
                    <a 
                      href="https://maps.google.com/?q=19.013641,73.036125"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 font-serif text-lg leading-relaxed hover:text-brilliant-green transition-colors"
                    >
                      Shop no 3 Raghunath apartment,<br />
                      Fanaspada Gaon, Sector 19,<br />
                      Belapur, Navi Mumbai, 400614
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brilliant-green/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brilliant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Opening Hours</h3>
                    <p className="text-gray-600 font-serif text-lg">Mon – Sat: 11:00 AM – 8:00 PM</p>
                    <p className="text-gray-400 text-sm italic mt-1">Sunday by appointment only</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brilliant-green/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brilliant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Contact</h3>
                    <p className="text-gray-600 font-serif text-lg">+91 79775 56989</p>
                    <p className="text-gray-600 font-serif text-lg">rafiquerrahman66@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link 
                  href="/appointment" 
                  className="inline-block bg-brilliant-green px-8 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all rounded-xl"
                >
                  Book a Visit
                </Link>
              </div>
            </div>

            {/* Map Section */}
            <div className="h-[500px] bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden relative shadow-inner">
              <iframe
                src="https://www.google.com/maps?q=19.013641,73.036125&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
