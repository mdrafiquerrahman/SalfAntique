"use client";
import { ReactNode } from "react";

export default function OrnateFrame({ children }: { children: ReactNode }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden ring-1 ring-[#c5a059]/40 transition-all duration-500">
      {children}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.45)_100%)]" />
      <span className="pointer-events-none absolute left-0 top-0 w-6 h-6 border-t border-l border-[#c5a059]/60 rounded-tl-2xl" />
      <span className="pointer-events-none absolute right-0 top-0 w-6 h-6 border-t border-r border-[#c5a059]/60 rounded-tr-2xl" />
      <span className="pointer-events-none absolute left-0 bottom-0 w-6 h-6 border-b border-l border-[#c5a059]/60 rounded-bl-2xl" />
      <span className="pointer-events-none absolute right-0 bottom-0 w-6 h-6 border-b border-r border-[#c5a059]/60 rounded-br-2xl" />
    </div>
  );
}
