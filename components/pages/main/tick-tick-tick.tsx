"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import { Clock } from "lucide-react";

const STANZAS = [
  [
    "ഒച്ചയും ബഹളവും നിറഞ്ഞ ആ വീട്ടിൽ",
    "അന്ന് ആരും ആ ഘടികാരത്തെ കേൾക്കാൻ തയ്യാറായിരുന്നില്ല.",
    "ദിവസവും കണ്ണുകൾ അതിൽ പതിയുമെങ്ങിലും",
    "ചെവിക്കൊടുകാൻ ആരും തയ്യറായിരുന്നില്ല…",
    "ഞാനും.!!"
  ],
  [
    "എന്നാൽ ഇന്ന്,",
    "നിശബ്ദത നിറഞ്ഞ ഏകാന്തതയിൽ",
    "അവൾ അതിനെ ശ്രവിച്ചുകൊണ്ടേയിരുന്നു …"
  ],
  [
    "ഒച്ചയും ബഹളവും ഇല്ലാഞ്ഞിട്ടോ??",
    "അതോ,",
    "അതിനെ ഒന്ന് മനസറിഞ്ഞ് കേൾക്കാം എന്നവണ്ണമോ???"
  ],
  [
    "അവൾ അതിനെ കേട്ടുകൊണ്ടേയിരുന്നു...",
    "അതിനെമാത്രം."
  ],
  [
    "ടിക്…",
    "ടിക്…",
    "ടിക്... !!!!!!"
  ]
];

function PoemLine({ children, isTick }: { children: React.ReactNode, isTick: boolean }) {
  return (
    <p
      className={`font-sans font-light text-[24px] sm:text-[30px] md:text-[38px] lg:text-[46px] leading-[1.5] sm:leading-[1.6] tracking-tight ${isTick ? 'text-[#c96a45] font-normal italic' : 'text-[#e0ddd6]'}`} 
      lang="ml"
    >
      {children}
    </p>
  );
}

function StanzaBlock({ lines, index }: { lines: string[], index: number }) {
  return (
    <div className={`mb-24 sm:mb-32 flex flex-col gap-4 sm:gap-6 items-start ${index === STANZAS.length - 1 ? 'mt-16 sm:mt-24' : ''}`}>
      {lines.map((line, i) => {
        const isTick = line.includes("ടിക്");
        return (
          <PoemLine key={i} isTick={isTick}>
            {line}
          </PoemLine>
        );
      })}
    </div>
  );
}

export function TickTickTick() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 80 });
  const rotate = useTransform(smoothProgress, [0, 1], [0, 1080]);
  const yParallax = useTransform(smoothProgress, [0, 1], [0, -120]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  const stickyOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const stickyY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  const authorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: authorProgress } = useScroll({
    target: authorRef,
    offset: ["start 95%", "center 70%"]
  });
  const authorScale = useTransform(authorProgress, [0, 1], [0.9, 1]);
  const authorOpacity = useTransform(authorProgress, [0, 1], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      id="sec-tick"
      className="relative w-full bg-[#080705] text-[#e0ddd6] selection:bg-[#c96a45]/30 selection:text-white"
    >
      {/* Ambient background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div style={{ scale: imageScale, y: yParallax }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src={resolveAsset("tick-tick-art.webp")}
            alt="Time Background"
            fill
            className="object-cover object-center opacity-10 filter blur-[4px] mix-blend-luminosity"
            priority
            unoptimized
          />
        </motion.div>
        {/* Soft vignette & gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080705] via-[#080705]/80 to-[#080705]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,7,5,0)_0%,#080705_100%)] opacity-80" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-8 sm:pt-16 pb-24 sm:pb-32 flex flex-col lg:flex-row relative">
        <div className="lg:w-5/12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pt-0 pb-8 lg:pb-0 z-10">
           <div>
             <div className="flex items-center mb-6 lg:mb-10">
               <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#c96a45]">
                 A Poem About Time
               </p>
             </div>
             
             <h2 
                className="font-heading text-[18vw] sm:text-[14vw] lg:text-[100px] xl:text-[120px] leading-[0.8] tracking-tight text-[#f5f5f5] mb-8 lg:mb-12" 
                lang="ml"
             >
                ടിക്...<br />
                <span className="text-white/40">ടിക്...</span>
             </h2>
             
             <div className="flex items-center gap-4 text-white/50 pl-2 mb-10">
               <motion.div style={{ rotate }} className="origin-center text-[#c96a45]">
                 <Clock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
               </motion.div>
               <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase">
                 Time passes in silence
               </span>
             </div>

             {/* Illustration Card */}
             <div className="relative w-full max-w-[340px] aspect-[16/10] overflow-hidden">
                <Image 
                  src={resolveAsset("tick-tick-art.webp")}
                  alt="Illustration of woman listening to the clock"
                  fill
                  className="object-cover grayscale contrast-[1.15] brightness-90"
                  unoptimized
                />
             </div>
           </div>
        </div>

        {/* Right Scroll Column */}
        <div className="lg:w-7/12 flex flex-col lg:pt-[45vh] pb-[10vh] relative z-10 pl-0 lg:pl-16 xl:pl-32 mt-12 lg:mt-0">
           {STANZAS.map((stanza, i) => (
             <StanzaBlock key={i} lines={stanza} index={i} />
           ))}

           {/* Minimal Author Block */}
           <motion.div 
             ref={authorRef}
             style={{ scale: authorScale, opacity: authorOpacity, transformOrigin: "left center" }}
             className="mt-12 lg:mt-32 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 hover:bg-white/[0.04] transition-colors duration-500"
           >
             <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ring-1 ring-white/10 shrink-0 shadow-lg">
                <Image 
                  src={resolveAsset("avani-manoj.png")} 
                  alt="Author portrait of Avani Manoj" 
                  fill 
                  sizes="96px" 
                  unoptimized
                  className="object-cover hover:scale-110 transition-transform duration-700 ease-out" 
                />
             </div>
             <div className="flex flex-col">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#c96a45] mb-3">
                  Written by
                </span>
                <span className="font-sans text-2xl sm:text-3xl tracking-tight text-white/90 mb-2">
                  Avani Manoj
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Third year · Electrical & Electronics Engineering
                </span>
             </div>
           </motion.div>
        </div>
      </div>
      
      <footer className="w-full border-t border-white/5 bg-[#080705] relative z-10">
        <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-10 lg:px-16 flex flex-col gap-4 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · Avani Manoj</span>
        </div>
      </footer>
    </section>
  );
}
