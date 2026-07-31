"use client";

import Dither from "./Dither";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#0F0F0F] opacity-70">
      <Dither
        waveColor={[0.83, 1.0, 0.0]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.5}
        colorNum={5}
        waveAmplitude={0.35}
        waveFrequency={3.5}
        waveSpeed={0.15}
      />
    </div>
  );
}
