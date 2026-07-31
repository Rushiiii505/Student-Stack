"use client";

import LogoLoop from "./ui/LogoLoop";

const tools = [
  "GitHub", "AWS Educate", "JetBrains", "DigitalOcean", "Notion", "Figma", 
  "Stripe", "Microsoft Azure", "MongoDB", "Heroku", "Vercel", "Canva"
];

const logos = tools.map((tool) => ({
  node: <div className="text-3xl md:text-5xl font-black text-gray-200 hover:text-gray-400 transition-colors cursor-default select-none tracking-tighter whitespace-nowrap">{tool}</div>,
  title: tool
}));

export function CategoryMarquee() {
  return (
    <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">
          Trusted by Top Industry Leaders
        </p>
      </div>
      
      <LogoLoop
        logos={logos}
        speed={120}
        direction="left"
        logoHeight={56}
        gap={80}
        hoverSpeed={20}
        fadeOut
        fadeOutColor="#ffffff"
        className="py-4"
      />
      
      <LogoLoop
        logos={logos}
        speed={120}
        direction="right"
        logoHeight={56}
        gap={80}
        hoverSpeed={20}
        fadeOut
        fadeOutColor="#ffffff"
        className="py-4"
      />
    </section>
  );
}
