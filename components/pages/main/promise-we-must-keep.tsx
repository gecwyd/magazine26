"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const POEM_STANZAS = [
  "A dawn once broke with hope anew,\nAs freedom’s dream at last came true.\nA timeless charter, a solemn pledge,\nWhere justice found its rightful place.",
  "Yet tell me, have we learned at last\nTo heal the wounds our choices cast?\nTo guard the forests, skies, and seas,\nAnd cherish every swaying tree?",
  "We charred the forests, dimmed the skies,\nLeft rivers parched before our eyes.\nWe turned from neighbours, nursed our pride,\nWhile silent grief we chose to hide.",
  "When envy speaks where kindness should,\nAnd greed outweighs the common good,\nWe struggle, strive, and seek to claim\nA fleeting crown, an empty name.",
  "Yet where is trust in human hearts?\nThe bond that holds a people fast?\nFraternity is not mere sound,\nBut love that lifts and gathers round.",
  "It shines through every hand we raise,\nIn hearts that choose compassion over praise.",
  "A nation is more than maps we trace,\nOr flags that flutter into space.\nIt lives wherever hope takes root,\nIn every life that bears its fruit.",
  "In fields where patient farmers sow,\nThrough sun and storm their harvests grow.\nIn birds that sing and trees that stand\nThe living soul of this dear land.",
];

const FINAL_STANZA =
  "The day we love without a claim,\nWithout a caste, without a name,\nThat day our Constitution lives,\nAnd hope in every heart survives.\nThat is the promise we must keep.";

const TOTAL = POEM_STANZAS.length + 1;

const PAPER = "#f4f0e6";
const INK = "#14231e";
const GREEN = "#0f2c24";
const SAFFRON = "#d9772f";
const SAFFRON_SOFT = "#e9a56b";

/*
 * IMAGES — each picture below is a placeholder until its real file is uploaded to the release assets.
 * To replace one: upload the file named in `file` (webp) and it swaps in automatically. Nothing else to change.
 * `alt` is the full brief for the picture, so it can be handed straight to an image generator.
 */
type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  dawn: {
    n: 1,
    file: "promise-dawn-charter.webp",
    ratio: "4:5",
    alt: "A large old bound book, the Constitution of India, lying open on a plain wooden table beside a window at first light. A low saffron sun is just breaking over the horizon outside and a single band of warm golden light falls across the open pages, catching the paper's fibres and the dust in the air. Minimal composition, lots of soft empty space, a calm cream-and-deep-green room, shallow depth of field, tiny bit of film grain. No readable text on the pages, no people, no flags. Hopeful, quiet, dignified, editorial still-life photography.",
    mock: "linear-gradient(170deg, #f3d9b0 0%, #d9a36a 45%, #24473c 100%)",
  },
  scorched: {
    n: 2,
    file: "promise-scorched-earth.webp",
    ratio: "4:3",
    alt: "A wide, desolate landscape divided by a dry cracked riverbed running toward the horizon, its clay split into pale geometric plates. On both banks stand blackened, leafless tree trunks of a burnt forest under a dim, ash-grey hazy sky with a faint dull orange sun. In the exact centre foreground a single small bright-green sapling pushes up through the cracked earth. Desaturated charcoal, ash and dust palette with the sapling as the only vivid green accent. No people, no text. Sombre, restrained, cinematic and graphic with generous empty space.",
    mock: "linear-gradient(180deg, #8d8578 0%, #5b5650 55%, #2b2926 100%)",
  },
  hands: {
    n: 3,
    file: "promise-many-hands.webp",
    ratio: "4:5",
    alt: "Many hands of different ages and skin tones reaching up together from the bottom of the frame toward a warm sky, some open, some clasped, some holding a neighbour's wrist to lift them up. A grandmother's wrinkled hand, a child's small hand, a labourer's rough hand and a student's ink-stained hand, all bare and unadorned. Seen from a low angle against a soft gradient of pale cream sky turning to gentle saffron at the top. Warm natural backlight, shallow depth of field, faces not shown. Humane, unposed, minimal documentary style with a slightly muted film grade, no text.",
    mock: "linear-gradient(0deg, #b7855a 0%, #e8c9a0 55%, #f4ead9 100%)",
  },
  fields: {
    n: 4,
    file: "promise-fields.webp",
    ratio: "21:9",
    alt: "A wide panoramic view of terraced green paddy fields in Wayanad, Kerala, in soft early-morning mist. A lone farmer in a white mundu and a conical hat bends to sow in the middle distance, small in the frame. Tall areca and coconut palms stand along the field edges and a few birds lift into a pale gold sky. Layers of misty blue-green hills fade behind. Calm, breathing, generous negative sky at the top, muted greens with a touch of honey-gold, cinematic landscape photography, no text.",
    mock: "linear-gradient(to top, #2c5a3d 0%, #8fb08a 45%, #e8dfc2 100%)",
  },
} satisfies Record<string, Shot>;

function Plate({
  shot,
  sizes = "100vw",
  priority,
  className = "object-cover",
  overlay,
}: {
  shot: Shot;
  sizes?: string;
  priority?: boolean;
  className?: string;
  overlay?: ReactNode;
}) {
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  /* onError can fire before hydration, so also catch an image that already failed. */
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return (
      <>
        <div role="img" aria-label={shot.alt} className="absolute inset-0" style={{ background: shot.mock }} />
        {overlay}
        <div className="absolute inset-0 z-10 flex items-end p-4 sm:p-6">
          <p
            aria-hidden="true"
            className="max-h-full max-w-md overflow-hidden rounded-sm bg-black/60 px-4 py-3 text-left font-mono text-[10px] leading-relaxed text-white/80 backdrop-blur-sm sm:text-[11px]"
          >
            <b className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-white">
              Image {shot.n} · {shot.ratio}
            </b>
            <code className="mb-2 block text-white/50">{shot.file}</code>
            {shot.alt}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Image
        ref={img}
        src={resolveAsset(shot.file)}
        alt={shot.alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized
        className={className}
        onError={() => setMissing(true)}
      />
      {overlay}
    </>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${className}`}>{children}</span>;
}

function Stanza({
  text,
  index,
  size = "md",
  numberColor = SAFFRON,
  className = "",
}: {
  text: string;
  index: number;
  size?: "md" | "lg";
  numberColor?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  const sizing =
    size === "lg"
      ? "text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.2]"
      : "text-[clamp(1.6rem,2.5vw,2.3rem)] leading-[1.38]";

  return (
    <div className={className}>
      <Label className="mb-6 block">
        <span style={{ color: numberColor }}>
          {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </Label>
      <p className={`${sizing} tracking-[-0.01em]`}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            className="block"
          >
            {line}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

/* Twenty-four thin spokes — a quiet nod to the wheel at the heart of the flag. */
function Wheel({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 160, ease: "linear", repeat: Infinity }}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2="44" transform={`rotate(${i * 15} 50 50)`} />
        ))}
      </g>
    </motion.svg>
  );
}

export function PromiseWeMustKeep() {
  const reduce = useReducedMotion();
  const coverRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const finalLines = FINAL_STANZA.split("\n");
  const finalPledge = finalLines[finalLines.length - 1];

  return (
    <section
      id="sec-promise"
      className={`${serif.className} relative w-full overflow-hidden selection:bg-[#d9772f] selection:text-[#f4f0e6]`}
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* ───────── Cover ───────── */}
      <header
        ref={coverRef}
        className="relative mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16"
      >
        <motion.div style={reduce ? undefined : { y: titleY }} className="lg:col-span-7">
          <Reveal>
            <Label className="text-[#d9772f]">Poetry · Volume 5</Label>
            <h2 className="mt-8 text-[clamp(4.25rem,12vw,9.5rem)] leading-[0.92] tracking-[-0.035em]">
              The Promise
              <span className="block italic text-[#d9772f]">we must keep</span>
            </h2>
            <div className="mt-10 flex items-center gap-5">
              <span aria-hidden className="h-px w-12 bg-[#d9772f]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14231e]/60">
                A poem by Rebekka Mathew
              </p>
            </div>
            <p className="mt-16 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#14231e]/40">
              <span>Justice</span>
              <span>Liberty</span>
              <span>Equality</span>
              <span>Fraternity</span>
            </p>
          </Reveal>
        </motion.div>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <motion.div style={reduce ? undefined : { y: plateY, scale: 1.1 }} className="absolute inset-0">
              <Plate shot={SHOTS.dawn} priority sizes="(max-width: 1024px) 100vw, 40vw" />
            </motion.div>
          </div>
        </Reveal>
      </header>

      {/* ───────── I · Dawn ───────── */}
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-40 lg:px-16">
        <Stanza text={POEM_STANZAS[0]} index={0} className="max-w-2xl lg:ml-[14%]" />
      </div>

      {/* ───────── II · The question ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-40 lg:px-16">
        <Stanza text={POEM_STANZAS[1]} index={1} className="max-w-2xl lg:ml-[38%]" />
      </div>

      {/* ───────── III · What we did ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-40 lg:px-16">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-20">
          <Stanza text={POEM_STANZAS[2]} index={2} className="lg:col-span-5 lg:pb-6" />
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Plate shot={SHOTS.scorched} sizes="(max-width: 1024px) 100vw, 55vw" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* ───────── IV · Envy and greed ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-44 lg:px-16">
        <div className="border-t border-[#14231e]/15 pt-16 md:pt-24">
          <Stanza text={POEM_STANZAS[3]} index={3} className="max-w-2xl lg:ml-[14%]" />
        </div>
      </div>

      {/* ───────── V · Fraternity ───────── */}
      <div className="mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-44 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:sticky lg:top-24">
              <Plate shot={SHOTS.hands} sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </Reveal>
          <div className="flex flex-col gap-20 lg:col-span-7 lg:pt-16 lg:gap-28">
            <Stanza text={POEM_STANZAS[4]} index={4} />
            <Stanza text={POEM_STANZAS[5]} index={5} size="lg" numberColor={SAFFRON} className="lg:pl-[10%]" />
          </div>
        </div>
      </div>

      {/* ───────── VI · The land ───────── */}
      <div className="relative">
        <div className="relative isolate h-[48svh] min-h-[300px] w-full overflow-hidden md:h-[64svh]">
          <Plate
            shot={SHOTS.fields}
            overlay={
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${PAPER} 0%, transparent 24%, transparent 100%)` }}
              />
            }
          />
        </div>

        <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-28 pt-16 md:px-10 md:pb-44 md:pt-24 lg:grid-cols-2 lg:gap-24 lg:px-16">
          <Stanza text={POEM_STANZAS[6]} index={6} />
          <Stanza text={POEM_STANZAS[7]} index={7} className="lg:pt-24" />
        </div>
      </div>

      {/* ───────── VII · The pledge ───────── */}
      <div className="relative" style={{ backgroundColor: GREEN, color: "#f1ebdd" }}>
        <div className="mx-auto max-w-4xl px-6 pb-28 pt-28 text-center md:px-10 md:pb-40 md:pt-40">
          <Reveal>
            <Wheel className="mx-auto mb-12 size-16 text-[#e9a56b]/70 md:size-20" />
            <Label className="mb-10 block text-[#e9a56b]/80">
              {String(TOTAL).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </Label>
            <p className="text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.4] text-[#f1ebdd]/75">
              {finalLines.slice(0, -1).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p
              className="mx-auto mt-14 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] italic leading-[1.1] tracking-[-0.02em]"
              style={{ color: SAFFRON_SOFT }}
            >
              {finalPledge}
            </p>
          </Reveal>
        </div>

        {/* Author */}
        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 lg:px-16">
          <Reveal className="flex items-center gap-6 border-t border-[#f1ebdd]/15 pt-10">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-[#f1ebdd]/20 md:size-20">
              <Image
                src={resolveAsset("rebekka.png")}
                alt="Rebekka Mathew"
                fill
                sizes="80px"
                unoptimized
                className="object-cover grayscale"
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-1 text-[#f1ebdd]/50">Written by</Label>
              <span className="text-2xl md:text-3xl">Rebekka Mathew</span>
              <Label className="mt-1 text-[#f1ebdd]/50">2nd Year · ECE</Label>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PromiseWeMustKeep;
