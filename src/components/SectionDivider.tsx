"use client";

export default function SectionDivider() {
  return (
    <div className="relative my-8">
      <div className="h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#c5a059]" />
    </div>
  );
}
