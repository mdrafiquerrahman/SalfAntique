"use client";
import { ReactNode } from "react";

export default function OrnateFrame({ children }: { children: ReactNode }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden ring-1 ring-gray-200 transition-all duration-500">
      {children}
      <span className="pointer-events-none absolute left-0 top-0 w-6 h-6 border-t border-l border-brilliant-green/40 rounded-tl-2xl" />
      <span className="pointer-events-none absolute right-0 top-0 w-6 h-6 border-t border-r border-brilliant-green/40 rounded-tr-2xl" />
      <span className="pointer-events-none absolute left-0 bottom-0 w-6 h-6 border-b border-l border-brilliant-green/40 rounded-bl-2xl" />
      <span className="pointer-events-none absolute right-0 bottom-0 w-6 h-6 border-b border-r border-brilliant-green/40 rounded-br-2xl" />
    </div>
  );
}
