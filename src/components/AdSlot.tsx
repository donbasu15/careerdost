"use client";

import Script from "next/script";
import { useEffect } from "react";
import AdsterraBanner from "./AdsterraBanner";

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
      className={`relative flex items-center justify-center border border-slate-200 rounded-lg overflow-hidden min-h-[50px] md:min-h-[100px] w-full ${className}`}
    >
      {/* Desktop Banner (728x90) */}
      <div className="hidden md:block">
        <AdsterraBanner idKey="384b70d58a2bb2329af8f530b01bcabb" width={728} height={90} />
      </div>
      
      {/* Mobile Banner (320x50) */}
      <div className="block md:hidden">
        <AdsterraBanner idKey="8098abcde4016ea6924c3734d1b9b143" width={320} height={50} />
      </div>
    </div>
  );
}
