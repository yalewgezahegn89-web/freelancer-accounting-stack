'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdUnit({
  slot,
  format = 'auto',
  minHeight = 250,
}: {
  slot: string;
  format?: string;
  minHeight?: number;
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div
      className="relative my-8 overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100"
      style={{ minHeight }}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-medium text-gray-400">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={
          process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ||
          'ca-pub-XXXXXXXXXXXXXXXX'
        }
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
