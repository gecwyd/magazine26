"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { REPORT_PHOTOS } from "@/lib/report-photos";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  Stat,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./sae.module.css";

const TONE: ReportTone = {
  paper: "#edf1f7",
  ink: "#0f1f3a",
  accent: "#1f4c96",
  muted: "#0f1f3aaa",
  rule: "#0f1f3a26",
};

const PALETTE = {
  "--race": "#c81e2c",
  "--amber": "#e8942c",
} as CSSProperties;

const INTRO =
  "The SAE Students Chapter of Government Engineering College Wayanad conducted a series of technical, academic, community-oriented and student engagement activities during the academic year 2025–26. The chapter aimed to enhance students’ technical knowledge, practical skills, creativity, teamwork, communication and professional development.";

const EVENTS = [
  {
    no: "01",
    lap: "3–5 Feb 2026",
    title: "Inauguration & ANSYS Workshop",
    body: "The chapter was officially inaugurated from 3–5 February 2026, followed by a three-day ANSYS Hands-On Workshop led by Dr. P. A. Abdul Samad, Professor, Government Engineering College, Palakkad. The workshop introduced students to engineering simulation and provided practical training in ANSYS.",
  },
  {
    no: "02",
    lap: "13 Mar 2026",
    title: "“Find a Solution” Challenge",
    body: "The chapter organised the “Find a Solution” Challenge for first-year SAE members. The event encouraged students to approach engineering problems creatively and develop innovative solutions through teamwork and brainstorming.",
  },
  {
    no: "03",
    lap: "25 Mar 2026",
    title: "Exhibition at Valliyoorkavu Temple",
    body: "The chapter also participated in an exhibition at Valliyoorkavu Temple, where students displayed engineering projects and working models to the public. This provided valuable experience in explaining technical concepts and interacting with a diverse audience.",
  },
  {
    no: "04",
    lap: "27 Mar 2026",
    title: "Farewell 2026 – Drive Out",
    body: "The academic year concluded with “Farewell 2026 – Drive Out”, organised in association with the Exorque Club. The programme brought together juniors and seniors through games, cultural performances, experience sharing and informal interactions.",
  },
] as const;

const CLOSING =
  "Together, these activities strengthened students’ technical abilities, problem-solving skills, communication, leadership and teamwork, while creating opportunities for innovation, professional development and community engagement.";

const STATS = [
  { value: "03", label: "Workshop Days" },
  { value: "04", label: "Flagship Events" },
  { value: "01", label: "SAE Chapter" },
  { value: "25/26", label: "Academic Year" },
];

const TAPE_TOP = ["Torque", "Chassis", "Ignition", "Velocity", "Gearbox", "Grid"];
const TAPE_BOTTOM = ["Traction", "Throttle", "Horsepower", "Pit Stop", "Redline", "Drive"];

const OUTLINE = "[-webkit-text-stroke:2px_currentColor] [-webkit-text-fill-color:transparent]";

function Marquee({
  words,
  reverse = false,
  duration = 40,
  outline = false,
}: {
  words: string[];
  reverse?: boolean;
  duration?: number;
  outline?: boolean;
}) {
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={`${styles.track} ${reverse ? styles.reverse : ""} flex min-w-full shrink-0 items-center justify-around gap-8 pr-8`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span
            className={`font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-none ${outline ? OUTLINE : ""}`}
          >
            {word}
          </span>
          <span className="text-[clamp(1.5rem,3vw,2.5rem)] leading-none">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3 sm:py-4">
      {track(false)}
      {track(true)}
    </div>
  );
}

/** Small rotating gear accent, drawn as teeth around a hub. */
function Gear({ className = "" }: { className?: string }) {
  const teeth = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={`${styles.spin} ${className}`}>
      <g fill="currentColor">
        {teeth.map((_, i) => (
          <rect key={i} x="46" y="2" width="8" height="20" rx="1.5" transform={`rotate(${i * 45} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="30" />
      </g>
      <circle cx="50" cy="50" r="11" fill="var(--paper)" />
    </svg>
  );
}

/** Semicircular instrument gauge with a idly-revving needle. */
function Gauge({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const cx = 110;
  const cy = 112;
  const r = 90;
  const toXY = (value: number, radius: number) => {
    const deg = 180 + value; // 0 -> 180deg (left), 180 -> 360deg (right)
    const rad = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const ticks = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
  const needleTip = toXY(122, r - 20);

  return (
    <svg viewBox="0 0 220 130" aria-hidden className={className}>
      <path
        d={`M ${toXY(0, r).x} ${toXY(0, r).y} A ${r} ${r} 0 0 1 ${toXY(180, r).x} ${toXY(180, r).y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.35"
      />
      {ticks.map((value) => {
        const outer = toXY(value, r);
        const inner = toXY(value, r - 10);
        const label = toXY(value, r - 26);
        return (
          <g key={value}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" strokeWidth="2" />
            <text
              x={label.x}
              y={label.y}
              fontSize="9"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono"
              fill="currentColor"
              opacity="0.6"
            >
              {value}
            </text>
          </g>
        );
      })}
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` } as CSSProperties}
        animate={reduceMotion ? undefined : { rotate: [-4, 4, -4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y} stroke="var(--race)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      <circle cx={cx} cy={cy} r="7" fill="var(--race)" />
      <text x={cx} y={cy + 26} textAnchor="middle" fontSize="11" className="font-mono uppercase" fill="currentColor" opacity="0.7">
        km/h
      </text>
    </svg>
  );
}

export function Sae() {
  const { width, height } = REPORT_PHOTOS["sae-logo"];
  const reduceMotion = useReducedMotion();

  return (
    <ReportSection id="sec-sae" tone={TONE}>
      <div style={PALETTE}>
        <Container>
          <Rail left="SAE Students Chapter" right="Clubs & Activities / 09" />
        </Container>

        {/* Hero */}
        <div className={`${styles.blueprint} relative`}>
          <Container>
            <div className="grid gap-14 pb-16 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
              <Reveal>
                <div className="mb-6 flex items-center gap-3">
                  <Gear className="h-8 w-8 text-[color:var(--accent)] sm:h-10 sm:w-10" />
                  <Kicker>Academic Year 2025–26</Kicker>
                </div>
                <h2 className="font-heading uppercase leading-[0.82] tracking-[-0.01em]">
                  <span className="block text-[clamp(3.5rem,11vw,6.5rem)]">Society of</span>
                  <span
                    className={`block text-[clamp(2.6rem,8.5vw,5rem)] text-[color:var(--accent)] ${OUTLINE}`}
                  >
                    Automotive
                  </span>
                  <span className="block text-[clamp(3.5rem,11vw,6.5rem)]">Engineers</span>
                </h2>
                <p className="mt-8 max-w-xl border-l-4 border-[color:var(--race)] pl-6 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">
                  {INTRO}
                </p>
              </Reveal>

              <Reveal delay={0.12} className="relative mx-auto w-full max-w-sm">
                <div className={`${styles.lift} relative bg-white p-8 sm:p-10`}>
                  <span
                    aria-hidden
                    className="absolute -top-3 left-8 font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--race)]"
                  >
                    GECW · SAE
                  </span>
                  <Image
                    src={resolveAsset("sae-logo.webp")}
                    alt="SAE GECW – Society of Automotive Engineers logo"
                    width={width}
                    height={height}
                    priority
                    className="h-auto w-full"
                  />
                  <Gauge className="mt-6 h-auto w-full text-[color:var(--ink)]" />
                </div>
                <motion.div
                  aria-hidden
                  animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--race)] font-heading text-xs uppercase leading-none text-white shadow-lg sm:h-20 sm:w-20"
                >
                  Drive
                  <br />
                  Out
                </motion.div>
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Instrument cluster stats */}
        <Container>
          <div className="grid grid-cols-2 gap-6 border-t border-[color:var(--rule)] py-10 sm:grid-cols-4 sm:py-14">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.05} y={14}>
                <Stat value={stat.value} label={stat.label} />
              </Reveal>
            ))}
          </div>
        </Container>

        {/* Checkered racing tape */}
        <div className="relative z-10 py-6 sm:py-10">
          <div className={`${styles.checkerPaper} h-3 w-full bg-[color:var(--ink)] sm:h-4`} />
          <div className="-mx-[5%] -rotate-1 bg-[color:var(--ink)] text-[color:var(--paper)]">
            <Marquee words={TAPE_TOP} duration={42} />
          </div>
          <div className="-mx-[5%] -mt-2 rotate-1 bg-[color:var(--race)] text-[color:var(--paper)]">
            <Marquee words={TAPE_BOTTOM} reverse duration={36} outline />
          </div>
          <div className={`${styles.checkerPaper} h-3 w-full bg-[color:var(--ink)] sm:h-4`} />
        </div>

        {/* Race calendar / events */}
        <Container>
          <div className="pb-20 pt-16 sm:pb-28 sm:pt-24">
            <Reveal className="mb-12 sm:mb-16">
              <Kicker>Season Log</Kicker>
              <h3 className="font-heading text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.85] tracking-[-0.01em]">
                Race Calendar
              </h3>
            </Reveal>

            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {EVENTS.map((event, index) => (
                <motion.li
                  key={event.no}
                  initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.lift}
                >
                  <div
                    className={`${styles.plate} flex min-h-[22rem] flex-col bg-white px-6 pb-8 pt-6`}
                  >
                    <div className="flex items-start justify-between border-b border-[color:var(--rule)] pb-3">
                      <span className="font-heading text-6xl leading-[0.8] text-[color:var(--accent)]">
                        {event.no}
                      </span>
                      <span className="rounded-full bg-[color:var(--ink)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--paper)]">
                        Lap {event.no}
                      </span>
                    </div>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--race)]">
                      {event.lap}
                    </p>
                    <h4 className="mt-3 font-heading text-2xl uppercase leading-[0.95] tracking-wide">
                      {event.title}
                    </h4>
                    <p className="mt-4 text-[14px] leading-[1.75] text-[color:var(--muted)]">{event.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>

        {/* Garage board photos */}
        <div className="bg-white py-16 sm:py-24">
          <Container>
            <Reveal className="mb-10 sm:mb-14">
              <Kicker>From the Garage</Kicker>
              <h3 className="font-heading text-[clamp(2.5rem,7vw,4.5rem)] uppercase leading-[0.85] tracking-[-0.01em]">
                On the Floor
              </h3>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Reveal delay={0} y={18} className="md:col-span-2">
                <div className={`${styles.lift} rotate-1 bg-[color:var(--paper)] p-2`}>
                  <ReportPhoto
                    id="sae-2"
                    alt="Large group photo of SAE chapter members in the seminar hall"
                    ratio="16/9"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.06} y={18}>
                <div className={`${styles.lift} -rotate-2 bg-[color:var(--paper)] p-2`}>
                  <ReportPhoto id="sae-3" alt="SAE members gathered at the farewell event" ratio="3/4" />
                </div>
              </Reveal>
              <Reveal delay={0.12} y={18}>
                <div className={`${styles.lift} rotate-2 bg-[color:var(--paper)] p-2`}>
                  <ReportPhoto id="sae-4" alt="A certificate being handed over during an SAE session" ratio="3/4" />
                </div>
              </Reveal>
              <Reveal delay={0.18} y={18} className="md:col-span-2">
                <div className={`${styles.lift} -rotate-1 bg-[color:var(--paper)] p-2`}>
                  <ReportPhoto
                    id="sae-1"
                    alt="SAE members and guests seated together under string lights"
                    ratio="4/3"
                  />
                </div>
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Closing */}
        <div className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--paper)]">
          <div className={`${styles.checkerPaper} h-3 w-full opacity-80 sm:h-4`} />
          <span
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[clamp(8rem,28vw,26rem)] uppercase leading-none opacity-[0.08] ${OUTLINE}`}
          >
            SAE
          </span>

          <Container className="relative">
            <div className="grid items-end gap-14 py-24 sm:py-32 lg:grid-cols-[1fr_auto] lg:gap-20">
              <Reveal>
                <p className="max-w-3xl font-serif text-2xl italic leading-[1.4] sm:text-3xl lg:text-4xl">
                  {CLOSING}
                </p>
                <p className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[color:var(--amber)]">
                  <span className="h-px w-10 bg-[color:var(--amber)]" />
                  SAE Students Chapter · GECW
                </p>
              </Reveal>
              <Gear className="h-24 w-24 text-[color:var(--amber)] sm:h-32 sm:w-32" />
            </div>
          </Container>
          <div className={`${styles.checkerPaper} h-3 w-full opacity-80 sm:h-4`} />
        </div>
      </div>
    </ReportSection>
  );
}
