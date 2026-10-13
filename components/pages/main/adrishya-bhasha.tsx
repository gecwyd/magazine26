"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import { Noto_Serif_Malayalam, Space_Mono } from "next/font/google";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { cn } from "@/lib/utils";

const malayalam = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const retroMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type World = {
  ml: string;
  en: string;
  color: string;
  href: string;
  clue: string;
  eq: string;
};

const WORLDS: World[] = [
  {
    ml: "സമയ വികാസം",
    en: "Time Dilation",
    color: "#a84e2a",
    href: "#sec-h",
    clue: "സമയത്തിന്റെ ഒഴുക്കിൽ പോലും ഒരു രഹസ്യമുണ്ട്.",
    eq: "Δt′ = γΔt",
  },
  {
    ml: "തമോദ്വാരം",
    en: "Black Hole",
    color: "#d99065",
    href: "#sec-q",
    clue: "ഇരുട്ടിന്റെ ആഴങ്ങളിൽ പോലും വെളിച്ചത്തെ വെല്ലുവിളിക്കുന്ന ലോകങ്ങളുണ്ട്.",
    eq: "r_s = 2GM/c²",
  },
  {
    ml: "വേംഹോൾ",
    en: "Wormhole",
    color: "#7c6bb0",
    href: "#sec-wormhole",
    clue: "അകലങ്ങളെ മറികടക്കുന്ന വഴികളെക്കുറിച്ചുള്ള സങ്കൽപ്പങ്ങളുണ്ട്.",
    eq: "ds² = −dt² + dl²",
  },
  {
    ml: "ക്വാണ്ടം എന്റാംഗിൾമെന്റ്",
    en: "Quantum Entanglement",
    color: "#c1443b",
    href: "#sec-quantum",
    clue: "ദൂരെയായിരിക്കുമ്പോഴും പരസ്പരം ബന്ധപ്പെട്ടു നിൽക്കുന്ന കണങ്ങളുണ്ട്.",
    eq: "|ψ⟩ = α|0⟩ + β|1⟩",
  },
];

const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span lang="en" className={cn(retroMono.className, "text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#c9a56b]", className)}>
    {children}
  </span>
);

const P = ({ children, lead = false, className = "" }: { children: ReactNode; lead?: boolean; className?: string }) => (
  <p
    lang="ml"
    className={cn(
      lead
        ? "text-[1.35em] sm:text-[1.5em] font-light leading-[1.9] text-[#f2ecdb]"
        : "text-[1.1em] sm:text-[1.2em] font-light leading-[2.05] text-[#dcd5c4]/80",
      className
    )}
  >
    {children}
  </p>
);

function SectionLabel({ title, index }: { title: string; index?: string }) {
  return (
    <div className="mb-12 flex items-center gap-4 md:mb-16">
      {index && (
        <span className={cn(retroMono.className, "shrink-0 rounded-sm border border-[#c9a56b]/40 px-1.5 py-0.5 text-[10px] text-[#c9a56b]/80")}>
          {index}
        </span>
      )}
      <Label>{title}</Label>
      <span
        aria-hidden
        className="h-px flex-1 opacity-50"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #c9a56b 0px, #c9a56b 5px, transparent 5px, transparent 11px)",
        }}
      />
    </div>
  );
}

/** Thin editorial rule lines — a faint horizontal/vertical grid, the way a poster's margins are drawn. */
function FaintGridLines({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.08]", className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`h-${i}`} className="absolute inset-x-0 h-px bg-[#c9a56b]" style={{ top: `${14 + i * 16}%` }} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`v-${i}`} className="absolute inset-y-0 w-px bg-[#c9a56b]" style={{ left: `${10 + i * 20}%` }} />
      ))}
    </div>
  );
}

/** Paired margin rules — the vertical lines that frame a masthead like a print poster. */
function MarginRules() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-6 z-10 w-px bg-[#c9a56b]/15 sm:left-10" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-6 z-10 w-px bg-[#c9a56b]/15 sm:right-10" />
    </>
  );
}

/** CRT-style scanline + vignette texture, scoped to its positioned parent. */
function Scanlines({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-40">
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 12vw 2vw rgba(0,0,0,0.55)" }}
      />
    </div>
  );
}

/** Faint blueprint grid — reinforces the technical-diagram, retro-futurist feel. */
function BlueprintGrid({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(rgba(201,165,107,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,107,0.6) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
      }}
    />
  );
}

/** Four corner brackets, like a viewfinder or a vintage instrument readout. */
function CornerFrame({ inset = "inset-4 sm:inset-6", className = "" }: { inset?: string; className?: string }) {
  const corners = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute z-20", inset, className)}>
      {corners.map((pos) => (
        <span key={pos} className={cn("absolute h-5 w-5 sm:h-7 sm:w-7 border-[#c9a56b]/60", pos)} />
      ))}
    </div>
  );
}

/** Radar / crosshair mark — a signal-detecting instrument, standing in for "the invisible made legible". */
function RadarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 56"
      className={cn("h-10 w-10 sm:h-14 sm:w-14 text-[#c9a56b]", className)}
      fill="none"
    >
      <circle cx="28" cy="28" r="25" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 5" />
      <circle cx="28" cy="28" r="15" stroke="currentColor" strokeOpacity="0.45" />
      <circle cx="28" cy="28" r="2.5" fill="currentColor" />
      <line x1="28" y1="0" x2="28" y2="7" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="28" y1="49" x2="28" y2="56" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="0" y1="28" x2="7" y2="28" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="49" y1="28" x2="56" y2="28" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  );
}

/** Evenly spaced dots along an edge, like film-strip sprocket holes. */
function Sprockets({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 z-20 flex justify-between px-4 sm:px-8", className)}>
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#c9a56b]/25" />
      ))}
    </div>
  );
}

function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay"
      style={{
        opacity,
        backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
      }}
    />
  );
}

/** A masked line that rises into place — used for the hero title lines. */
function RiseLine({
  children,
  delay = 0,
  duration = 1.2,
  className = "",
  reduce = false,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  reduce?: boolean;
}) {
  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={reduce ? { y: 0, opacity: 0 } : { y: "115%" }}
        animate={reduce ? { y: 0, opacity: 1 } : { y: 0 }}
        transition={{ duration, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Per-chapter instrument glyph for the world cards. */
function WorldGlyph({ index, className = "" }: { index: number; className?: string }) {
  const common = { stroke: "currentColor", strokeWidth: 1, fill: "none" } as const;
  return (
    <svg aria-hidden viewBox="0 0 48 48" className={cn("h-full w-full", className)} fill="none">
      {index === 0 && (
        <g {...common}>
          <circle cx="24" cy="24" r="16" strokeOpacity="0.45" />
          <circle cx="24" cy="24" r="21" strokeOpacity="0.18" strokeDasharray="2 4" />
          <path d="M24 12v12l9 5" strokeOpacity="0.9" strokeLinecap="round" />
          <path d="M8 40c6-6 10-14 10-22" strokeOpacity="0.3" strokeDasharray="2 3" />
        </g>
      )}
      {index === 1 && (
        <g {...common}>
          <circle cx="24" cy="24" r="8" fill="currentColor" fillOpacity="0.85" stroke="none" />
          <ellipse cx="24" cy="24" rx="20" ry="7" strokeOpacity="0.7" />
          <ellipse cx="24" cy="24" rx="14" ry="4.5" strokeOpacity="0.35" />
          <ellipse cx="24" cy="24" rx="20" ry="7" strokeOpacity="0.25" transform="rotate(28 24 24)" />
        </g>
      )}
      {index === 2 && (
        <g {...common}>
          <ellipse cx="9" cy="24" rx="4" ry="13" strokeOpacity="0.75" />
          <ellipse cx="39" cy="24" rx="4" ry="13" strokeOpacity="0.75" />
          <path d="M9 11c10 6 20 6 30 0" strokeOpacity="0.45" />
          <path d="M9 37c10-6 20-6 30 0" strokeOpacity="0.45" />
          <path d="M9 24h30" strokeOpacity="0.25" strokeDasharray="2 3" />
        </g>
      )}
      {index === 3 && (
        <g {...common}>
          <circle cx="11" cy="24" r="4.5" fill="currentColor" fillOpacity="0.85" stroke="none" />
          <circle cx="37" cy="24" r="4.5" fill="currentColor" fillOpacity="0.85" stroke="none" />
          <circle cx="11" cy="24" r="9" strokeOpacity="0.3" strokeDasharray="2 3" />
          <circle cx="37" cy="24" r="9" strokeOpacity="0.3" strokeDasharray="2 3" />
          <path d="M15.5 24c4-7 13-7 17 0" strokeOpacity="0.7" />
          <path d="M15.5 24c4 7 13 7 17 0" strokeOpacity="0.7" />
        </g>
      )}
    </svg>
  );
}

/** Rule-bordered marquee of the four chapters — a quiet contents line, like a masthead's index strip. */
function ChapterTicker({ reduce }: { reduce: boolean }) {
  const run = (
    <div className="flex shrink-0 items-center">
      {WORLDS.map((w) => (
        <span key={w.en} className="flex items-center whitespace-nowrap">
          <span lang="ml" className="text-xs text-[#ece6d8]/55 sm:text-sm">{w.ml}</span>
          <span lang="en" className={cn(retroMono.className, "ml-3 text-[9px] uppercase tracking-[0.3em] text-[#c9a56b]/70")}>
            {w.en}
          </span>
          <span aria-hidden className="mx-7 h-1 w-1 rotate-45 bg-[#c9a56b]/50 sm:mx-10" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="relative z-20 w-full overflow-hidden border-t border-b border-[#c9a56b]/15 bg-black/20 py-3"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex w-max" style={reduce ? undefined : { animation: "marquee 42s linear infinite" }}>
        {run}
        {run}
      </div>
    </div>
  );
}

/** A single chapter card — tilts gently toward the cursor, an instrument catching a reading. */
function WorldCard({ world, index, reduce }: { world: World; index: number; reduce: boolean }) {
  return (
    <a
      href={world.href}
      className={cn(
        "group relative flex flex-col p-6 sm:p-8 transition-colors duration-500 hover:bg-white/[0.02]",
        index % 2 === 0 ? "md:mt-0" : "md:mt-24"
      )}
    >
      <div className="mb-6 flex items-center gap-4 text-[#c9a56b]">
        <span className={cn(retroMono.className, "text-[10px]")}>{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-[#c9a56b]/30" />
      </div>

      <h3 lang="ml" className="mb-2 text-2xl font-light text-[#f2ecdb] transition-colors duration-300 group-hover:text-white sm:text-3xl">
        {world.ml}
      </h3>
      <p className={cn(retroMono.className, "mb-4 text-[10px] uppercase tracking-widest text-[#c9a56b] sm:text-xs")}>
        {world.en}
      </p>
      <p lang="ml" className="text-sm font-light leading-relaxed text-[#dcd5c4]/70 sm:text-base">
        {world.clue}
      </p>
      <p aria-hidden className={cn(retroMono.className, "mt-4 text-[10px] tracking-wider text-[#c9a56b]/35")}>
        {world.eq}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <span className={cn(retroMono.className, "text-[9px] uppercase tracking-[0.3em] text-[#c9a56b]/50 transition-colors duration-500 group-hover:text-[#c9a56b]")}>
          Read Chapter
        </span>
        <span aria-hidden className="text-[#c9a56b]/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[#c9a56b]">
          &rarr;
        </span>
      </div>
    </a>
  );
}

function AnimatedWorldGrid({ reduce }: { reduce: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative my-20 w-full">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 opacity-30 md:block"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, #c9a56b 0px, #c9a56b 4px, transparent 4px, transparent 10px)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-24" style={{ perspective: 1200 }}>
        {WORLDS.map((world, i) => (
          <WorldCard key={world.en} world={world} index={i} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}



export function AdrishyaBhasha() {
  const containerRef = useRef<HTMLElement>(null);
  const standfirstRef = useRef<HTMLDivElement>(null);
  const heroLockRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });

  const { scrollYProgress: heroLockProgress } = useScroll({
    target: heroLockRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroLockProgress, [0, 1], [0, -60]);
  const heroContentFade = useTransform(heroLockProgress, [0, 0.8], [1, 0]);

  const threadY = useTransform(smoothProgress, [0.3, 0.6], [50, -50]);
  const threadScale = useTransform(smoothProgress, [0.3, 0.6], [1.1, 1]);

  const { scrollYProgress: standProgress } = useScroll({
    target: standfirstRef,
    offset: ["start end", "end start"],
  });
  const driftLeft = useTransform(standProgress, [0, 1], ["-6%", "4%"]);
  const driftRight = useTransform(standProgress, [0, 1], ["6%", "-4%"]);

  const bookCloseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bookCloseProgress } = useScroll({
    target: bookCloseRef,
    offset: ["start start", "end start"],
  });
  const bookCloseSmooth = useSpring(bookCloseProgress, { stiffness: 60, damping: 20 });
  const pageRotateY = useTransform(bookCloseSmooth, [0, 0.6], [0, -170]);
  const pageOpacity = useTransform(bookCloseSmooth, [0.5, 0.65], [1, 0]);
  const coverOpacity = useTransform(bookCloseSmooth, [0.45, 0.7], [0, 1]);
  const coverScale = useTransform(bookCloseSmooth, [0.45, 0.75], [0.96, 1]);

  return (
    <section
      ref={containerRef}
      id="sec-adrishya-bhasha"
      aria-labelledby="adrishya-bhasha-title"
      className={cn(malayalam.className, "relative w-full bg-[#050505] text-[#ece6d8] selection:bg-[#c9a56b]/30 selection:text-white")}
    >
      <Grain opacity={0.06} />

      {/* Reading rail — a quiet progress instrument pinned beside the essay. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-2 z-30 hidden w-10 lg:block">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-5">
          <span
            className={cn(retroMono.className, "text-[9px] uppercase tracking-[0.4em] text-[#c9a56b]/40")}
            style={{ writingMode: "vertical-rl" }}
          >
            Adrishya Samavakyam
          </span>
          <div className="relative h-40 w-px bg-[#c9a56b]/15">
            <motion.span
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#c9a56b] to-[#e6d0a7]"
              style={{ scaleY: smoothProgress }}
            />
          </div>
        </div>
      </div>

      {/* ───────── Hero Section — scroll-lock: pins while the user scrolls through extra height ───────── */}
      <div ref={heroLockRef} className="relative h-[150svh]">
        <div className="sticky top-0 flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 h-full w-full origin-center">
            <Image
              src={resolveAsset("adrishya-bhasha-hero.webp")}
              alt="A single luminous golden thread stretching across a dark night sky"
              fill
              priority
              sizes="100vw"
              unoptimized
              className="object-cover sepia-[15%] contrast-[105%]"
            />
            <div aria-hidden className="absolute inset-0 bg-[#050505]/60" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
          </div>

          <MarginRules />

          {/* Masthead meta row: identity left, live signal center, chapter count right. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={cn(
              retroMono.className,
              "relative z-20 flex items-center justify-between px-6 pt-8 text-[9px] uppercase tracking-[0.3em] text-[#c9a56b]/70 sm:px-10 sm:pt-10"
            )}
          >
            <span className="hidden sm:inline">Fig. 00: Prologue</span>
            <span className="hidden sm:inline">04 Chapters</span>
          </motion.div>

          {/* Masthead — an introductory two-line phrase, with a signal mark between the lines. */}
          <motion.div style={{ y: heroContentY, opacity: heroContentFade }} className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex w-full flex-col items-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
                lang="en"
                className={cn(retroMono.className, "mb-6 text-[9px] uppercase tracking-[0.45em] text-[#ece6d8]/40 sm:text-[11px]")}
              >
                Four Chapters &middot; One Thread
              </motion.p>
            </div>

            <h2 id="adrishya-bhasha-title" lang="ml" className="flex w-full flex-col items-center">
              <div className="flex w-full flex-col items-center">
                <RiseLine delay={0.45} reduce={reduce}>
                  <span
                    className="block text-[9.5vw] font-medium leading-none tracking-tight text-transparent sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem]"
                    style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.9)" }}
                  >
                    അദൃശ്യ
                  </span>
                </RiseLine>
              </div>

              <div className="my-3 sm:my-4" />

              <div className="flex w-full flex-col items-center">
                <RiseLine delay={0.7} duration={1.4} reduce={reduce}>
                  <span className="block text-[13vw] font-bold leading-[0.95] text-[#c9a56b] sm:text-[5.5rem] md:text-[7rem] md:leading-[0.9] lg:text-[8.5rem]">
                    സമവാക്യം
                  </span>
                </RiseLine>
              </div>
            </h2>

            <div className="flex w-full flex-col items-center">
              <p lang="en" className={cn(retroMono.className, "mt-8 whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-[#ece6d8]/60 sm:text-xs md:text-sm md:tracking-[0.4em]")}>
                The Invisible Equation
              </p>
            </div>
          </motion.div>


          <ChapterTicker reduce={reduce} />
        </div>
      </div>

      {/* ───────── Standfirst ───────── */}
      <div ref={standfirstRef} className="relative z-20 overflow-hidden bg-[#050505]">
        <Scanlines opacity={0.03} />
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center md:px-12 md:py-48">
          <span className={cn(retroMono.className, "mb-8 inline-block rounded-sm border border-[#c9a56b]/30 px-2 py-1 text-[9px] uppercase tracking-[0.35em] text-[#c9a56b]/70")}>
            Fig. 0: Field Notes
          </span>
          <p lang="en" className="font-heading text-[10vw] font-black leading-[0.9] tracking-tighter text-white sm:text-[8vw] md:text-[6vw]">
            <motion.span className="block" style={reduce ? undefined : { x: driftLeft }}>
              WHAT THE EYE
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-[#c9a56b] to-[#e6d0a7] bg-clip-text text-transparent"
              style={reduce ? undefined : { x: driftRight }}
            >
              CANNOT SEE.
            </motion.span>
          </p>
          <div className="mt-14 flex flex-col items-center gap-6">
            <RadarMark />
            <p lang="en" className={cn(retroMono.className, "max-w-md text-xs uppercase leading-relaxed tracking-[0.2em] text-[#ece6d8]/50 sm:text-sm")}>
              Four unrelated fields of physics.<br/>One question that refuses to leave.
            </p>
          </div>
        </div>
      </div>

      {/* ───────── Article Part I ───────── */}
      <div className="relative z-20 bg-[#050505]">
        <article lang="ml" className="mx-auto max-w-5xl px-6 pb-24 md:px-12">
          <SectionLabel title="Fig. I: The Unseen Universe" index="01" />

          <div className="max-w-3xl">
            <P lead>
              പ്രപഞ്ചം ചിലപ്പോൾ നമുക്ക് കാണുന്ന നക്ഷത്രങ്ങളുടെയും ഗ്രഹങ്ങളുടെയും പ്രകാശത്തിന്റെയും മാത്രം
              കഥയല്ല. കാണാനാകാത്ത ചില ബന്ധങ്ങളും, കണ്ടെത്താനാകാത്ത ചില നിയമങ്ങളും, നിശ്ശബ്ദമായി അതിനെ
              മുന്നോട്ട് നയിക്കുന്നുണ്ട്.
            </P>
          </div>

          <AnimatedWorldGrid reduce={reduce} />

          <div className="ml-auto max-w-3xl text-right">
            <P>
              സമയ വികാസം, തമോദ്വാരം, വേംഹോൾ, ക്വാണ്ടം എന്റാംഗിൾമെന്റ്. വ്യത്യസ്തമായ ഈ നാല്
              ലോകങ്ങളിലേക്കുള്ള യാത്ര, ഒടുവിൽ നമ്മെ ഒരേ ചോദ്യത്തിലേക്കാണ് കൊണ്ടെത്തിക്കുന്നത്:
            </P>
          </div>
        </article>

        {/* ───────── Cinematic Thesis Band ───────── */}
        <div className="relative my-20 w-full overflow-hidden border-y border-[#c9a56b]/10 bg-black">
          <motion.div style={{ y: threadY, scale: threadScale }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
            <Image
              src={resolveAsset("adrishya-bhasha-thread.webp")}
              alt="Four faint threads of light drifting through darkness"
              fill
              sizes="100vw"
              unoptimized
              className="object-cover opacity-70 sepia-[10%]"
            />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-[#050505]/70" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <Scanlines opacity={0.05} />
          <CornerFrame />
          <Sprockets className="top-3" />
          <Sprockets className="bottom-3" />
          <span className={cn(retroMono.className, "absolute bottom-6 right-6 z-20 text-[9px] uppercase tracking-[0.3em] text-[#c9a56b]/60 sm:right-10")}>
            Fig. I.5: Threads
          </span>

          <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
            <div className="mx-auto mb-8 h-[2px] w-16 bg-[#c9a56b]/70 sm:w-24" />
            <p lang="ml" className="text-[1.8em] font-light leading-[1.4] text-white sm:text-[2.2em] md:text-[3em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              കണ്ണുകൾക്ക് കാണാനാകാത്തതിനെ
              <br />
              <span className="font-semibold text-[#c9a56b]">എങ്ങനെ മനസ്സിലാക്കാം?</span>
            </p>
            <div className="mx-auto mt-8 h-[2px] w-16 bg-[#c9a56b]/70 sm:w-24" />
          </div>
        </div>

        {/* ───────── Article Part II ───────── */}
        <article lang="ml" className="mx-auto max-w-5xl px-6 pb-32 pt-12 md:px-12">
          <SectionLabel title="Fig. II: Life's Own Equations" index="02" />

          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <P lead className="text-[#c9a56b]">
                ഒരുപക്ഷേ, പ്രപഞ്ചത്തിന്റെ ഏറ്റവും വലിയ സമവാക്യങ്ങൾ പോലും നമുക്ക് പൂർണ്ണമായി
                കാണാനാകാത്തതായിരിക്കാം. അതുപോലെ തന്നെയാണ് ജീവിതവും.
              </P>
            </div>

            <div className="space-y-[2em] md:col-span-6 md:col-start-7">
              <P>
                ചില സൗഹൃദങ്ങൾ എങ്ങനെ പിറക്കുന്നു എന്നതിന് സമവാക്യമില്ല; ചില ഓർമ്മകൾ എന്തുകൊണ്ട് ഇത്രയും
                കാലം നമ്മളിൽ ജീവിക്കുന്നു എന്നതിനും ഉത്തരമില്ല.
              </P>
              <P>
                ചില മനുഷ്യർ നമ്മുടെ ജീവിതത്തിലേക്ക് കടന്നുവരുന്നതും, ചില നിമിഷങ്ങൾ നമ്മിൽ
                എന്നെന്നേക്കുമായി പതിയുന്നതും, കാണാനാകാത്ത ഏതോ ബന്ധത്തിന്റെ ഫലമായിരിക്കാം.
              </P>
            </div>
          </div>
        </article>
      </div>

      {/* ───────── Finale ───────── */}
      <div className="relative z-20 overflow-hidden bg-[#050505]">
        <BlueprintGrid opacity={0.04} />
        <div lang="en" className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
          <div className="space-y-8 md:space-y-12">
            <p className="text-[1.2rem] font-light italic leading-[1.9] text-[#dcd5c4]/60 sm:text-[1.4rem] md:text-[1.6rem]">
              The universe is still being read.
              <br />
              So is the human being.
            </p>
            <p className="text-[1.2rem] font-light italic leading-[1.9] text-[#dcd5c4]/60 sm:text-[1.4rem] md:text-[1.6rem]">
              Every time we understand one thing,
              <br />
              another unknown opens ahead of it.
            </p>
            <p className="text-[1.4rem] font-normal leading-[1.7] text-[#c9a56b] drop-shadow-lg sm:text-[1.6rem] md:text-[2rem]">
              This is a small attempt at that endless &lsquo;more&rsquo;.
              <br />
              the Invisible Equation.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3 md:mt-20">
            <p className={cn(retroMono.className, "max-w-xs text-[10px] leading-[1.8] tracking-[0.15em] text-[#dcd5c4]/40 sm:max-w-md sm:text-[11px]")}>
              A note from the editor: thank you for reading this far into the unseen.
              Every equation here, seen or not, was built by hands that believed it was worth writing.
            </p>
            <p className="mt-2 font-sans text-base text-[#ece6d8]/80 sm:text-lg">
              Adhil Muhammed K
            </p>
            <p className={cn(retroMono.className, "text-[9px] uppercase tracking-[0.3em] text-[#c9a56b]/50")}>
              Editor
            </p>
          </div>

          <p
            className={cn(retroMono.className, "mt-10 text-[10px] uppercase tracking-[0.5em] text-[#ece6d8]/20 sm:text-xs")}
          >
            Fin.
          </p>
        </div>
      </div>

      {/* ───────── Closing — book closes on a scroll-scrub, cover title reappears as a bookend to the hero ───────── */}
      <div ref={bookCloseRef} className="relative h-[200svh] bg-[#050505]">
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden [perspective:1400px]">
          <motion.div
            style={{ opacity: reduce ? 1 : coverOpacity, scale: reduce ? 1 : coverScale }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div lang="ml" className="flex w-full flex-col items-center">
              <div className="flex w-full flex-col items-center">
                <span
                  className="block text-[9.5vw] font-medium leading-none tracking-tight text-transparent sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem]"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.9)" }}
                >
                  അദൃശ്യ
                </span>
              </div>
              <div className="my-3 sm:my-4" />
              <div className="flex w-full flex-col items-center">
                <span className="block text-[13vw] font-bold leading-[0.95] text-[#c9a56b] sm:text-[5.5rem] md:text-[7rem] md:leading-[0.9] lg:text-[8.5rem]">
                  സമവാക്യം
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              rotateY: reduce ? 0 : pageRotateY,
              opacity: reduce ? undefined : pageOpacity,
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-0 z-20 bg-[#050505]"
          />
        </div>
      </div>
    </section>
  );
}

export default AdrishyaBhasha;
