"use client";

import { CountUp } from "./ui/CountUp";

export function StatsRibbon() {
  const stats = [
    { label: "Verified Perks", value: 450, prefix: "+" },
    { label: "Active Students", value: 12000, prefix: "+" },
    { label: "Total Value Saved", value: 2500000, prefix: "$", suffix: "" },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 relative z-10 -mt-10 mx-4 md:mx-12 rounded-[32px] shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="pt-6 md:pt-0 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 font-mono tracking-tighter">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <p className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
