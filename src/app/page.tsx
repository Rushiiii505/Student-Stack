"use client";

import { useState, useMemo, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { StatsRibbon } from "@/components/StatsRibbon";
import { PerkGrid } from "@/components/PerkGrid";
import { CategoryMarquee } from "@/components/CategoryMarquee";
import { PerkProps } from "@/components/PerkCard";
import { initialPerks } from "@/data/mockPerks";
import { advancedSearchAndRankPerks } from "@/lib/searchAlgorithm";
import { executeAutomatedPerkUpdate } from "@/lib/autoUpdateAlgorithm";

export default function Home() {
  const [perks, setPerks] = useState<PerkProps[]>(initialPerks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");

  // Fetch real perks from backend API if configured
  useEffect(() => {
    async function fetchPerksFromAPI() {
      try {
        const res = await fetch("/api/perks");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPerks(data);
          }
        }
      } catch (err) {
        console.warn("API route fallback active.");
      }
    }
    fetchPerksFromAPI();
  }, []);

  // Automated Real-Time Verification Engine: Auto-updates perks dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setPerks((prevPerks) => executeAutomatedPerkUpdate(prevPerks));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    perks.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [perks]);

  // Advanced search & multi-factor ranking algorithm
  const filteredAndRankedPerks = useMemo(() => {
    return advancedSearchAndRankPerks(perks, searchQuery, selectedCategory, sortBy);
  }, [perks, searchQuery, selectedCategory, sortBy]);

  const scrollToPerks = () => {
    const perksSection = document.getElementById("perks");
    if (perksSection) {
      perksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("relevance");
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Hero
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
        }}
        onSearchSubmit={scrollToPerks}
        resultCount={filteredAndRankedPerks.length}
      />
      
      <StatsRibbon />
      
      <CategoryMarquee />
      
      <PerkGrid
        perks={filteredAndRankedPerks}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          scrollToPerks();
        }}
        searchQuery={searchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        totalCount={perks.length}
      />
      
      {/* Footer */}
      <footer className="dark-section py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">
            Ready to build your stack?
          </h2>
          <button
            onClick={scrollToPerks}
            className="inline-block bg-accent text-black font-extrabold px-10 py-5 rounded-full text-xl hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,255,0,0.4)] cursor-pointer"
          >
            Get Started For Free
          </button>
          <div className="mt-20 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © {new Date().getFullYear()} Student Stack. Dynamically updated daily via automated scraper.
          </div>
        </div>
      </footer>
    </main>
  );
}
