"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const POEM_PARTS = [
  "I buried my faith in your hands,\nAnd called it home.\nI named you my anchor,\nNever knowing you'd become\nthe tide that pulled me under.",
  "You were my compass,\nuntil I discovered\nthat even north can lie.\nYou became the roots,\nBeneath my quiet dreams.",
  "I was your tree.\nI spent my season growing leaves for you.\nI was your sun.\nI turned myself into your mornings.",
  "Then the day came.\nThe hand I trusted became a storm.\nI was trapped in a cave,\nWhere even daylight forgot my name.",
  "I searched for answers\nin the ashes of your promises.\nBut betrayal is strange\nIt buries the living, leaving no grave\nto mourn.",
  "For a while,\nI carried you like an anchor:\nHeavy enough to drown me,\nYet sacred enough\nthat I refused to let go.",
  "Then one morning,\nThe wind spoke, with a storm.\nThe scars on my soul\nBegan remembering\nthe shape of wings.",
  "Every tear became a feather.\nEvery feather remembered the sky.\nEvery lonely night became a sky,\nand the sky became\nthe home I had been seeking.",
  "You were my destination.\nYou were the lesson before it.\nThe roots still remember your name,\nBut my wings no longer need it.",
  "Now I fly\nNot because I escaped the fall,\nBut because I grew wings from it.\nI found the sun.\nI found both my roots and my wings.",
];

/* Stanzas whose closing line is set apart in the act's accent colour. */
const ACCENT_LAST = new Set([0, 3, 6, 8]);

/*
 * IMAGES — each picture below is a placeholder until its real file is uploaded to the release assets.
 * To replace one: upload the file named in `file` (webp) and it swaps in automatically. Nothing else to change.
 * `alt` is the full brief for the picture, so it can be handed straight to an image generator.
 */
type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  roots: {
    n: 1,
    file: "roots-and-wings-roots.webp",
    ratio: "16:9",
    alt: "Cross-section of dark earth showing the roots of a great tree spreading downward and outward like veins, each fine root tipped with a faint amber glow. Only the base of the trunk is visible at the top edge, lost in shadow. Deep umber and near-black tones with warm amber light, cinematic and painterly, lots of quiet negative space on the left. No people, no text.",
    mock: "radial-gradient(ellipse at 70% 30%, #3b2412 0%, #16110d 70%)",
  },
  cave: {
    n: 2,
    file: "roots-and-wings-cave.webp",
    ratio: "4:5",
    alt: "A lone woman seen from behind, standing deep inside the mouth of a cave. Outside, a violent storm: slate-blue clouds, sheets of rain, wind-torn trees. Daylight is visible beyond the opening but does not reach her; the cave around her is heavy shadow. Desaturated blue-grey palette, cinematic and moody. Face not visible, no text.",
    mock: "linear-gradient(160deg, #26323f 0%, #10161d 75%)",
  },
  feathers: {
    n: 3,
    file: "roots-and-wings-feathers.webp",
    ratio: "21:9",
    alt: "Hundreds of pale feathers drifting upward through a dark stormy sky that lightens toward the top into pale dawn gold. A few feathers carry glistening droplets, as if tears are turning into feathers. Soft focus, slate blue at the bottom fading to warm cream at the top. No people, no text.",
    mock: "linear-gradient(to top, #10161d 0%, #5d7185 45%, #f6efe4 100%)",
  },
  flight: {
    n: 4,
    file: "roots-and-wings-flight.webp",
    ratio: "16:9",
    alt: "A woman in a flowing dress lifting into the sky with wide feathered wings spread, seen from below and behind, silhouetted against a rising sun over soft clouds. Far below, the roots of a tree are visible as a thin dark pattern in the earth. Pale gold and soft blue, luminous and hopeful. Face not visible, no text.",
    mock: "linear-gradient(to top, #e9c58a 0%, #f6efe4 55%, #cfe1ea 100%)",
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
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <p
            aria-hidden="true"
            className="max-w-md rounded-sm bg-black/55 px-5 py-4 text-left font-mono text-[11px] leading-relaxed text-white/80 backdrop-blur-sm"
          >
            <b className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-white">
              Image {shot.n} · {shot.ratio}
            </b>
            <code className="mb-3 block text-white/50">{shot.file}</code>
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
      initial={reduce ? false : { opacity: 0, y: 28 }}
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
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${className}`}>{children}</span>
  );
}

function Stanza({
  text,
  accent,
  className = "",
  accentClass,
}: {
  text: string;
  accent: boolean;
  className?: string;
  accentClass: string;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  return (
    <div className={className}>
      <p className="text-[1.75rem] font-light leading-[1.5] sm:text-[2.1rem] md:text-[2.6rem] md:leading-[1.45]">
        {lines.map((line, i) => {
          const isAccent = accent && i === lines.length - 1;
          return (
            <motion.span
              key={i}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
              className={`block ${isAccent ? `italic ${accentClass}` : ""}`}
            >
              {line}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}

function ActHeading({ no, title, className = "" }: { no: string; title: string; className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <Label>
        {no} · {title}
      </Label>
      <span aria-hidden className="h-px flex-1 bg-current opacity-20" />
    </div>
  );
}



export function RootsAndWings() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const rootsRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroP, [0, 1], ["0%", "14%"]);
  const heroScale = useTransform(heroP, [0, 1], [1.05, 1.15]);
  const heroFade = useTransform(heroP, [0, 0.7], [1, 0]);

  return (
    <section
      id="sec-roots-and-wings"
      className={`${serif.className} relative w-full bg-[#16110d] text-[#efe4d2] selection:bg-[#c98a4b] selection:text-[#16110d]`}
    >
      {/* ───────── Cover ───────── */}
      <header ref={heroRef} className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
        <motion.div
          style={reduce ? undefined : { y: heroY, scale: heroScale }}
          className="absolute inset-0 -z-10"
        >
          <Plate
            shot={SHOTS.roots}
            priority
            overlay={<div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#16110d] via-[#16110d]/50 to-[#16110d]/10" />}
          />
        </motion.div>

        <motion.div
          style={reduce ? undefined : { opacity: heroFade }}
          className="mx-auto w-full max-w-6xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16"
        >
          <Label className="text-[#c98a4b]">Poetry · Volume 1</Label>
          <h2 className="mt-6 text-[4.75rem] font-light uppercase leading-[0.85] tracking-[0.04em] text-[#f6ecd9] sm:text-[7rem] md:text-[10rem] lg:text-[12rem]">
            Roots
            <span className="block text-[0.62em] font-light normal-case italic tracking-normal text-[#c98a4b]">&amp; Wings</span>
          </h2>
          <div className="mt-10 flex items-center justify-between gap-6 border-t border-[#efe4d2]/15 pt-6">
            <p className="text-lg italic text-[#efe4d2]/70 md:text-xl">by Zephanah Elizabeth</p>
            <Label className="flex items-center gap-3 text-[#efe4d2]/50">
              Scroll
            </Label>
          </div>
        </motion.div>
      </header>

      {/* ───────── I · Roots ───────── */}
      <section ref={rootsRef} className="relative overflow-hidden bg-[#16110d] text-[#efe4d2]">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Plate
            shot={SHOTS.roots}
            overlay={<div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#16110d]/20 via-[#16110d]/80 to-[#16110d]" />}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-44 lg:px-16">
          <ActHeading no="I" title="Roots" className="text-[#c98a4b]" />
          <div className="mt-20 max-w-2xl space-y-16 md:mt-32 md:space-y-28">
            {POEM_PARTS.slice(0, 3).map((text, i) => (
              <Stanza
                key={i}
                text={text}
                accent={ACCENT_LAST.has(i)}
                accentClass="text-[#c98a4b]"
                className={i % 2 ? "md:ml-[14%]" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── II · Storm ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#16110d] via-[#10161d] to-[#10161d] text-[#dbe4ec]">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Plate
            shot={SHOTS.cave}
            overlay={<div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#16110d]/60 via-[#10161d]/80 to-[#10161d]" />}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:px-10 md:pb-24 lg:px-16">
          <ActHeading no="II" title="Storm" className="text-[#8fb0c9]" />
          <div className="relative mt-20 max-w-2xl space-y-16 md:mt-28 md:space-y-28 lg:ml-[42%] lg:pt-16">
            {POEM_PARTS.slice(3, 6).map((text, i) => (
              <Stanza
                key={i}
                text={text}
                accent={ACCENT_LAST.has(i + 3)}
                accentClass="text-[#8fb0c9]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── III · Wings ───────── */}
      <section className="relative overflow-hidden bg-[#f6efe4] text-[#2a2018] selection:bg-[#b5561f] selection:text-[#f6efe4]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[#10161d] md:h-[380px]">
          <Plate
            shot={SHOTS.feathers}
            className="object-cover opacity-[0.65]"
            overlay={
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-[#10161d] via-[#f6efe4]/80 to-[#f6efe4]"
              />
            }
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16 md:px-10 md:pb-16 md:pt-20 lg:px-16">
          <ActHeading no="III" title="Wings" className="text-[#b5561f]" />
          <div className="mt-16 max-w-2xl space-y-16 md:mt-20 md:space-y-28 lg:ml-[8%]">
            {POEM_PARTS.slice(6, 9).map((text, i) => (
              <Stanza
                key={i}
                text={text}
                accent={ACCENT_LAST.has(i + 6)}
                accentClass="text-[#b5561f]"
              />
            ))}
          </div>
        </div>

        {/* Finale */}
        <div className="relative isolate min-h-[760px] overflow-hidden md:min-h-[900px]">
          <Plate
            shot={SHOTS.flight}
            overlay={
              <>
                <div aria-hidden className="absolute inset-0 bg-[#f6efe4]/35" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-[#f6efe4] via-transparent to-[#f6efe4]"
                />
              </>
            }
          />
          <div className="relative mx-auto flex min-h-[760px] max-w-4xl items-start px-6 pb-28 pt-12 text-center md:min-h-[900px] md:px-10 md:pb-40 md:pt-16">
            {(() => {
              const lines = POEM_PARTS[9].split("\n");
              const closing = lines[lines.length - 1];
              return (
                <Reveal>
                  <p className="text-[1.6rem] font-normal leading-[1.6] text-[#211810] [text-shadow:0_1px_2px_rgba(246,239,228,0.95)] md:text-[2.25rem]">
                    {lines.slice(0, -1).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="mx-auto mt-6 max-w-3xl text-[2.25rem] font-normal italic leading-[1.25] text-[#9f4317] [text-shadow:0_1px_2px_rgba(246,239,228,0.95)] sm:text-[3.25rem] md:text-[4.5rem]">
                    {closing}
                  </p>
                </Reveal>
              );
            })()}
          </div>
        </div>

        {/* Author */}
        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 lg:px-16">
          <Reveal className="flex items-center gap-6 border-t border-[#2a2018]/15 pt-10">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#2a2018]/15 md:h-20 md:w-20">
              <Image
                src={resolveAsset("sefana-elizabeth.png")}
                alt="Zephanah Elizabeth"
                fill
                sizes="80px"
                unoptimized
                className="object-cover grayscale"
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-1 text-[#2a2018]/50">Written by</Label>
              <span className="text-2xl font-medium md:text-3xl">Zephanah Elizabeth</span>
              <Label className="mt-1 text-[#b5561f]/70">1st Year · CSE</Label>
            </div>
          </Reveal>
        </div>
      </section>
    </section>
  );
}

export default RootsAndWings;
