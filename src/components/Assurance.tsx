"use client";

const pillars = [
  { title: "Quality Craftsmanship" },
  { title: "Ethically Sourced" },
  { title: "100% Transparency" },
  { title: "Lifetime Maintenance" },
];

export default function Assurance() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-brilliant-green group-hover:bg-brilliant-green group-hover:text-white transition-all duration-300">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-serif text-lg text-gray-800 tracking-wide">{p.title}</h4>
              <p className="mt-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Guaranteed Excellence
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
