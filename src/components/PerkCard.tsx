"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle, Zap } from "lucide-react";

export interface PerkProps {
  id: string;
  name: string;
  description: string;
  category: string;
  benefit_value: number;
  url: string;
  logo_url: string;
  last_verified_date?: string;
  isRecentlyVerified?: boolean;
  status?: string;
}

export function PerkCard({ perk }: { perk: PerkProps }) {
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(perk.logo_url);
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleImageError = () => {
    try {
      const domain = new URL(perk.url).hostname;
      
      if (fallbackLevel === 0) {
        setFallbackLevel(1);
        setImgSrc(`https://logo.clearbit.com/${domain}`);
      } else if (fallbackLevel === 1) {
        setFallbackLevel(2);
        setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      } else {
        setImgError(true);
      }
    } catch {
      // If URL parsing fails, skip right to the final text fallback
      setImgError(true);
    }
  };

  return (
    <div className={`group relative bg-white rounded-[32px] p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border flex flex-col h-full ${
      perk.isRecentlyVerified 
        ? "border-accent ring-2 ring-accent/50 shadow-[0_0_25px_rgba(212,255,0,0.3)]" 
        : "border-gray-100"
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center p-3 border border-gray-100 shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
          {!imgError && imgSrc ? (
            <img 
              src={imgSrc} 
              alt={perk.name} 
              onError={handleImageError}
              className="w-full h-full object-contain" 
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-black text-accent flex items-center justify-center text-xl font-black">
              {perk.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          {perk.isRecentlyVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-black text-xs font-black animate-pulse shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-black" />
              Verified Just Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
          
          {perk.benefit_value > 0 && (
            <span className="text-gray-400 text-xs mt-2 font-medium">
              Value: ${perk.benefit_value}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-black">{perk.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{perk.description}</p>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {perk.category}
        </span>
        <a
          href={perk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:bg-accent hover:text-black hover:shadow-lg"
        >
          Get Access
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
