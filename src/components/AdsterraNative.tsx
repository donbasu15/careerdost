"use client";

import { useEffect, useRef } from "react";

interface AdsterraNativeProps {
  id: string;
  className?: string;
}

export default function AdsterraNative({ id, className = "" }: AdsterraNativeProps) {
  const nativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nativeRef.current && !nativeRef.current.querySelector("script")) {
      const scriptInvoke = document.createElement("script");
      scriptInvoke.src = `https://pl29089787.profitablecpmratenetwork.com/${id}/invoke.js`;
      scriptInvoke.async = true;
      scriptInvoke.dataset.cfasync = "false";
      
      nativeRef.current.appendChild(scriptInvoke);
    }
  }, [id]);

  return (
    <div className={`w-full ${className}`}>
      <div id={`container-${id}`} ref={nativeRef}></div>
    </div>
  );
}
