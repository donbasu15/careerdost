"use client";

import { useEffect } from "react";

interface AdSlotProps {
  className?: string;
  id?: string;
}

export default function AdSlot({ className = "", id }: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense trigger error", e);
    }
  }, []);

  return (
    <div
      id={id}
      className={`flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-semibold uppercase tracking-wider rounded-lg p-6 min-h-[100px] w-full ${className}`}
    >
      {/* 
        The external AdSense script (adsbygoogle.js) is already loaded globally 
        via src/app/layout.tsx to optimize performance. 
      */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6427408126692725"
        data-ad-slot="5510408861"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
