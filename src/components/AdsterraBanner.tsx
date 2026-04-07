"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerProps {
  idKey: string;
  height: number;
  width: number;
  className?: string;
}

export default function AdsterraBanner({ idKey, height, width, className = "" }: AdsterraBannerProps) {
  return (
    <div 
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: height, width: "100%", maxWidth: width }}
    >
      <iframe
        title={`ad-${idKey}`}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{ border: 'none', overflow: 'hidden' }}
        srcDoc={`
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: ${height}px; overflow: hidden; }
              </style>
            </head>
            <body>
              <script type="text/javascript">
                atOptions = {
                  'key' : '${idKey}',
                  'format' : 'iframe',
                  'height' : ${height},
                  'width' : ${width},
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="https://www.highperformanceformat.com/${idKey}/invoke.js"></script>
            </body>
          </html>
        `}
      />
    </div>
  );
}
