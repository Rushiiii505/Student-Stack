"use client";

import { AnimatedBackground } from "./ui/AnimatedBackground";
import BlurText from "./ui/BlurText";
import { ShinyText } from "./ui/ShinyText";
import { Search, X, Sparkles, Command } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  resultCount: number;
}

export function Hero({ searchQuery, onSearchChange, onSearchSubmit, resultCount }: HeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center dark-section overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl pb-20 pt-10">
      <AnimatedBackground />
      
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        01
      </div>

      {/* Top Status Banner with React Bits ShinyText */}
      <div className="z-10 mb-8 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full glass border border-white/15 text-xs font-extrabold tracking-widest uppercase shadow-[0_0_25px_rgba(212,255,0,0.15)] bg-black/40 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-accent animate-pulse" />
        <ShinyText 
          text="AUTO-SCRAPED & VERIFIED DAILY • MIDNIGHT UTC" 
          speed={3} 
          className="font-mono tracking-wider text-xs md:text-sm font-bold" 
        />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl w-full flex flex-col items-center">
        {/* Main Headline using React Bits BlurText component */}
        <div className="flex flex-col items-center justify-center mb-6 w-full">
          <BlurText 
            text="Digitize your" 
            delay={120} 
            animateBy="words" 
            direction="top" 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight justify-center select-none text-white text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" 
          />
          <BlurText 
            text="developer stack." 
            delay={150} 
            animateBy="words" 
            direction="bottom" 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight justify-center select-none text-accent text-center drop-shadow-[0_0_35px_rgba(212,255,0,0.5)] mt-2" 
          />
        </div>
        
        <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          The ultimate aggregator of every premium software, API, and cloud subscription available for free to verified students.
        </p>

        {/* Premium React Bits Glowing Neon Search Bar */}
        <div className="relative max-w-2xl w-full mx-auto group z-20">
          {/* Neon Gradient Border Aura */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-accent via-emerald-400 to-cyan-400 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500 group-hover:blur-lg animate-pulse"></div>
          
          <div className="relative flex items-center bg-[#0d0d0d] rounded-full p-2.5 pl-6 pr-3 border-2 border-accent/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all">
            <div className="pr-3 text-accent flex items-center gap-2">
              <Search className="w-6 h-6 animate-bounce" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tools, APIs (e.g. 'AWS', 'IDE', 'Database')..."
              className="w-full bg-transparent border-none outline-none text-[#D4FF00] font-bold text-lg md:text-xl placeholder:text-gray-500 placeholder:font-normal py-3 caret-accent focus:ring-0"
              aria-label="Search perks"
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="p-2 text-gray-400 hover:text-accent transition-colors mr-2 cursor-pointer"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 border border-gray-700 bg-white/5 px-2.5 py-1.5 rounded-lg mr-3">
              <Command className="w-3 h-3 text-accent" /> K
            </div>

            <button
              onClick={onSearchSubmit}
              className="bg-accent text-black font-black px-8 py-4 rounded-full whitespace-nowrap hover:bg-white hover:scale-105 active:scale-95 transition-all text-base md:text-lg shadow-[0_0_30px_rgba(212,255,0,0.5)] cursor-pointer"
            >
              Find Perks {searchQuery ? `(${resultCount})` : ""}
            </button>
          </div>
        </div>

        {/* Quick Search Suggestions */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm text-gray-400">
          <span className="font-semibold text-gray-400">Popular Searches:</span>
          {["Cloud", "IDE", "Database", "Design", "GitHub", "Vercel"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                onSearchChange(tag);
                onSearchSubmit();
              }}
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-accent hover:text-black text-gray-200 transition-all font-semibold border border-white/10 shadow-sm cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
