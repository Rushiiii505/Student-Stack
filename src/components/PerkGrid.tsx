"use client";

import { PerkCard, PerkProps } from "./PerkCard";
import { Sparkles, SlidersHorizontal, RefreshCcw } from "lucide-react";

interface PerkGridProps {
  perks: PerkProps[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export function PerkGrid({
  perks,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  sortBy,
  onSortChange,
  onResetFilters,
  totalCount,
}: PerkGridProps) {
  return (
    <section id="perks" className="py-20 bg-[#FAFAFA] relative scroll-mt-10">
      <div className="watermark top-0 right-0 translate-x-1/4 -translate-y-1/4 text-gray-200">
        02
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              <Sparkles className="w-4 h-4 text-accent-glow fill-black" />
              <span>Verified Student Developer Pack</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-3">
              Explore the Stack
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-xl">
              Showing <span className="font-bold text-gray-900">{perks.length}</span> of{" "}
              <span className="font-bold text-gray-900">{totalCount}</span> available benefits.
            </p>
          </div>

          {/* Sort & Controls Dropdown */}
          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-200">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-gray-200 bg-white text-gray-900 font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
              <option value="relevance">Algorithm Relevance Score</option>
              <option value="value-high">Value: High to Low</option>
              <option value="value-low">Value: Low to High</option>
              <option value="name">Name (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-gray-200/60 overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap shadow-sm ${
                  isSelected
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators */}
        {(searchQuery || selectedCategory !== "All") && (
          <div className="flex items-center justify-between gap-4 mb-8 bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Active Filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full font-medium text-xs">
                  Query: &quot;{searchQuery}&quot;
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full font-medium text-xs">
                  Category: {selectedCategory}
                </span>
              )}
            </div>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

        {/* Perks Cards Grid */}
        {perks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk) => (
              <PerkCard key={perk.id} perk={perk} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[32px] border border-dashed border-gray-300 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No matching student perks found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Our advanced matching algorithm couldn&apos;t find any software matching &quot;{searchQuery}&quot; in {selectedCategory}.
            </p>
            <button
              onClick={onResetFilters}
              className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-md"
            >
              Clear Filters &amp; View All Perks
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
