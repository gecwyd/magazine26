"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./orion.module.css";

const TONE: ReportTone = {
  paper: "#05060b",
  ink: "#eef0f8",
  accent: "#8fb4ff",
  muted: "#eef0f8ab",
  rule: "#8fb4ff2b",
};

const ALERT = { "--alert": "#ffb454" } as CSSProperties;

const INTRO_LEAD =
  "Orion GECW is a student-led space and technology club at Government Engineering College, Wayanad, consisting of 120 members.";

const INTRO_BODY =
  "The club is built on the vision that engineering is an interconnected system, and it works to bridge the gap between theoretical knowledge and real-world application across electronics, communication, embedded systems, software development, and mechanical design.";

const TICKER_TOP = ["Telemetry", "RF Systems", "FPGA", "PCB Design", "Embedded", "Ground Station"];
const TICKER_BOTTOM = ["QO-100", "ISRO · LPSC", "Gravitational Waves", "Satellite Comms", "Mission Control", "GECW"];

const LOG = [
  {
    label: "Bootcamps",
    body: "Multi-phase electronics bootcamps led by Botz Embedded Solutions, building system-level skills from first principles.",
  },
  {
    label: "Workshops",
    body: "Specialized, hands-on workshops on FPGA architecture and PCB design for members going deeper into hardware.",
  },
  {
    label: "Field Ops",
    body: "An educational visit for 47 students to the ISRO Liquid Propulsion Systems Centre (LPSC), Thiruvananthapuram.",
  },
  {
    label: "Outreach",
    body: "Outreach programmes carried the club's work beyond campus, to local high school students.",
  },
  {
    label: "Knowledge Exchange",
    body: "Peer-to-peer sessions on satellite technology and gravitational waves kept the club's thinking current.",
  },
];

const SYSTEM_ICONS: ReactNode[] = [
  // Ground station: dish tracking an orbit
  <g key="dish">
    <path d="M28 128 L100 60 L172 128 Z" />
    <circle cx="100" cy="60" r="10" fill="currentColor" fillOpacity="0.25" />
    <line x1="100" y1="60" x2="100" y2="18" />
    <circle cx="100" cy="18" r="5" fill="currentColor" />
    <line x1="20" y1="128" x2="180" y2="128" />
    <path d="M60 108 A70 70 0 0 1 140 108" strokeDasharray="5 6" />
    <circle cx="150" cy="40" r="26" strokeDasharray="4 5" />
    <circle cx="150" cy="40" r="3" fill="currentColor" />
  </g>,
  // FM transmitter: tower broadcasting waves
  <g key="tower">
    <line x1="100" y1="18" x2="100" y2="132" />
    <line x1="70" y1="132" x2="130" y2="132" />
    <line x1="78" y1="132" x2="100" y2="30" />
    <line x1="122" y1="132" x2="100" y2="30" />
    <line x1="86" y1="132" x2="100" y2="70" />
    <line x1="114" y1="132" x2="100" y2="70" />
    <circle cx="100" cy="18" r="4" fill="currentColor" />
    <path d="M118 44 A34 34 0 0 1 118 -8" transform="translate(0 44)" strokeDasharray="4 5" />
    <path d="M128 34 A48 48 0 0 1 128 -18" transform="translate(0 44)" strokeDasharray="4 5" />
    <path d="M82 44 A34 34 0 0 0 82 -8" transform="translate(0 44)" strokeDasharray="4 5" />
    <path d="M72 34 A48 48 0 0 0 72 -18" transform="translate(0 44)" strokeDasharray="4 5" />
  </g>,
  // App: device wireframe with UI blocks
  <g key="app">
    <rect x="58" y="14" width="84" height="122" rx="10" />
    <line x1="58" y1="30" x2="142" y2="30" />
    <line x1="58" y1="118" x2="142" y2="118" />
    <circle cx="100" cy="127" r="4" />
    <rect x="68" y="42" width="64" height="20" rx="2" fill="currentColor" fillOpacity="0.18" />
    <line x1="68" y1="74" x2="132" y2="74" />
    <line x1="68" y1="86" x2="112" y2="86" />
    <line x1="68" y1="98" x2="124" y2="98" />
  </g>,
];

const SYSTEMS = [
  {
    id: "SYS-01",
    title: "Ground Station",
    body: "A QO-100 satellite ground station for tracking and communicating with geostationary amateur radio traffic.",
  },
  {
    id: "SYS-02",
    title: "FM Transmitter",
    body: "A small-scale FM transmitter built to explore wireless communication from first principles.",
  },
  {
    id: "SYS-03",
    title: "Club App",
    body: "A digital application to streamline club management and event coordination for Orion's 120 members.",
  },
];

const STATS = [
  { value: "120", label: "Club members" },
  { value: "47", label: "Students · ISRO LPSC visit" },
  { value: "03", label: "Systems in active development" },
  { value: "05", label: "Disciplines bridged" },
];

const SLATE = [
  ["Callsign", "Orion GECW"],
  ["Crew", "120"],
  ["Orbit", "2025/26"],
  ["Base", "GECW · Wayanad"],
] as const;

const CLOSING =
  "Ultimately, Orion GECW serves as a platform that equips students with the multidisciplinary skills necessary to become industry-ready engineers capable of contributing to advanced technological fields.";

const pad = (n: number) => String(n).padStart(2, "0");

/** Mission-elapsed-time readout. Written straight to the DOM and only ticks while visible. */
function MissionClock() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const start = performance.now();
    let timer = 0;
    const tick = () => {
      const totalSeconds = Math.floor((performance.now() - start) / 1000);
      const hours = Math.floor(totalSeconds / 3600) % 100;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const seconds = totalSeconds % 60;
      el.textContent = `T+${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!timer) timer = window.setInterval(tick, 1000);
      } else {
        stop();
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      T+00:00:00
    </span>
  );
}

function SignalBars() {
  return (
    <span aria-hidden className="flex items-end gap-[3px]">
      {[7, 11, 15, 11, 7].map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}px`, "--i": i } as CSSProperties}
          className={`${styles.bar} w-[3px] bg-[color:var(--accent)]`}
        />
      ))}
    </span>
  );
}

function HudFrame() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3 z-20 sm:inset-6">
      <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[color:var(--accent)] sm:h-12 sm:w-12" />
      <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[color:var(--accent)] sm:h-12 sm:w-12" />
      <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[color:var(--accent)] sm:h-12 sm:w-12" />
      <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[color:var(--accent)] sm:h-12 sm:w-12" />

      <div className="absolute left-4 top-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--ink)] sm:left-16 sm:top-5">
        <span className={`${styles.blink} h-2.5 w-2.5 rounded-full bg-[var(--alert)]`} />
        Live Telemetry
      </div>
      <div className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.2em] text-[color:var(--ink)] sm:right-16 sm:top-5">
        <MissionClock />
      </div>
      <div className="absolute bottom-3 left-4 hidden font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:bottom-5 sm:left-16 sm:block">
        Orbit 2025/26 · GECW
      </div>
      <div className="absolute bottom-3 right-4 sm:bottom-5 sm:right-16">
        <SignalBars />
      </div>
    </div>
  );
}

function OrbitDial() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[28rem]">
      <div className={`${styles.sweep} absolute inset-0 rounded-full`} />
      <div className="absolute inset-0 rounded-full border border-[color:var(--rule)]" />
      <div className="absolute inset-[10%] rounded-full border border-[color:var(--rule)]" />
      <div className="absolute inset-[24%] rounded-full border border-[color:var(--rule)]" />
      <div className="absolute inset-[38%] rounded-full border border-[color:var(--rule)]" />

      {/* Compass ticks */}
      <div className={`absolute inset-0 ${reduceMotion ? "" : styles.spinSlow}`}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[46%] w-px origin-top bg-[color:var(--rule)]"
            style={{ transform: `rotate(${i * 15}deg)` }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_24px_var(--accent)]" />
      </motion.div>
      <motion.div
        className="absolute inset-[24%]"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_#fff]" />
      </motion.div>

      <motion.span
        aria-hidden
        className="absolute inset-[6%] border border-dashed border-[color:var(--accent)]/40"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ borderRadius: "38% 62% 55% 45% / 45% 40% 60% 55%" }}
      />

      <div className="absolute inset-[42%] overflow-hidden rounded-full border border-[color:var(--rule)] bg-black">
        <Image
          src={resolveAsset("orion-logo.webp")}
          alt="Orion GECW logo"
          fill
          sizes="140px"
          className="object-cover"
        />
      </div>

      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)] sm:bottom-0">
        Target lock · Orion
      </span>
    </div>
  );
}

function Ticker({
  words,
  reverse = false,
  duration = 34,
}: {
  words: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={`${styles.track} ${reverse ? styles.reverse : ""} flex min-w-full shrink-0 items-center justify-around gap-8 pr-8`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--ink)] sm:text-xs">
            {word}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3">
      {track(false)}
      {track(true)}
    </div>
  );
}

export function Orion() {
  const reduceMotion = useReducedMotion();

  return (
    <ReportSection id="sec-orion" tone={TONE}>
      <div style={ALERT}>
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div aria-hidden className={styles.starsA} />
          <div aria-hidden className={styles.starsB} />
          <div aria-hidden className={styles.scan} />
          <HudFrame />

          <Container className="relative z-10">
            <Rail left="Space & Technology Club" right="Clubs & Activities / 11" />

            <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
              <Reveal>
                <Kicker>Engineering is an interconnected system</Kicker>
                <h2 className="font-heading text-[clamp(6rem,19vw,17rem)] uppercase leading-[0.78] tracking-[0.01em]">
                  Orion
                  <span className="block text-[color:var(--accent)]">GECW</span>
                </h2>
                <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <p className="font-serif text-xl leading-[1.5] sm:text-2xl lg:max-w-md">
                    <span className="bg-[color:var(--accent)] px-2 text-[color:var(--paper)] [box-decoration-break:clone]">
                      Orion GECW
                    </span>
                    {INTRO_LEAD.slice("Orion GECW".length)}
                  </p>
                  <p className="border-l-2 border-[color:var(--accent)] pl-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
                    {INTRO_BODY}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <OrbitDial />
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Telemetry ticker */}
        <div className="border-y border-[color:var(--rule)]">
          <div className="bg-[color:var(--accent)] text-[color:var(--paper)]">
            <Ticker words={TICKER_TOP} duration={38} />
          </div>
          <Ticker words={TICKER_BOTTOM} reverse duration={32} />
        </div>

        <Container>
          {/* Telemetry stats */}
          <div className="grid grid-cols-2 gap-6 border-b border-[color:var(--rule)] py-14 sm:gap-10 sm:py-20 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.05}>
                <div className="border-t border-[color:var(--rule)] pt-4">
                  <p className="font-heading text-5xl leading-none text-[color:var(--accent)] sm:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Flight log */}
          <div className="py-16 sm:py-24">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10 sm:pb-14">
              <h3 className="font-heading text-[clamp(4rem,11vw,8rem)] uppercase leading-[0.82]">
                Flight
                <span className="block text-[color:var(--accent)]">Log</span>
              </h3>
              <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
                Five phases, one orbit around the academic year.
              </p>
            </Reveal>
            <ol className="border-t border-[color:var(--rule)]">
              {LOG.map((entry, index) => (
                <li
                  key={entry.label}
                  className="grid gap-2 border-b border-[color:var(--rule)] py-6 md:grid-cols-[9rem_1fr] md:gap-10 md:py-8"
                >
                  <Reveal y={12}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
                      Phase {pad(index + 1)}
                    </p>
                  </Reveal>
                  <Reveal y={12} delay={0.05}>
                    <h4 className="mb-2 font-heading text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                      {entry.label}
                    </h4>
                    <p className="max-w-3xl text-[15px] leading-[1.8] text-[color:var(--muted)] sm:text-base">
                      {entry.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Systems in development */}
          <div className="py-16 sm:py-24">
            <Reveal>
              <Kicker>Currently in development</Kicker>
              <h3 className="font-heading text-[clamp(3.5rem,9vw,6.5rem)] uppercase leading-[0.85]">
                Systems Online
              </h3>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
              {SYSTEMS.map((system, index) => (
                <Reveal key={system.id} delay={index * 0.08}>
                  <div className="flex h-full flex-col border border-[color:var(--rule)] p-5 sm:p-6">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                      <span>{system.id}</span>
                      <span className="flex items-center gap-2 text-[color:var(--alert)]">
                        <span className={`${styles.blink} h-1.5 w-1.5 rounded-full bg-[var(--alert)]`} />
                        In dev
                      </span>
                    </div>
                    <div className="relative my-5 aspect-[4/3] w-full text-[color:var(--accent)]">
                      <svg
                        viewBox="0 0 200 150"
                        aria-hidden
                        className="h-full w-full"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {SYSTEM_ICONS[index]}
                      </svg>
                    </div>
                    <h4 className="font-heading text-3xl uppercase leading-none sm:text-4xl">{system.title}</h4>
                    <p className="mt-4 border-t border-[color:var(--rule)] pt-4 text-sm leading-[1.7] text-[color:var(--muted)]">
                      {system.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Field captures */}
          <div className="py-16 sm:py-24">
            <Reveal>
              <Kicker>Field captures</Kicker>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:max-w-3xl">
              {[
                { id: "orion-1" as const, ratio: "3/4", alt: "Students working together at an Orion workshop" },
                {
                  id: "orion-2" as const,
                  ratio: "5/4",
                  alt: "Students at lab benches with oscilloscopes during an Orion session",
                },
              ].map((photo, index) => (
                <Reveal key={photo.id} delay={index * 0.08}>
                  <div className="relative border border-[color:var(--rule)] p-2">
                    <span className="absolute left-3 top-3 z-10 font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--ink)] mix-blend-difference">
                      Capture {pad(index + 1)}
                    </span>
                    <ReportPhoto id={photo.id} alt={photo.alt} ratio={photo.ratio} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mission parameters + closing */}
          <div className="grid gap-16 border-t border-[color:var(--rule)] py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <Reveal>
              <div className="border border-[color:var(--rule)]">
                <div className="grid grid-cols-2 divide-x divide-y divide-[color:var(--rule)] sm:grid-cols-4 sm:divide-y-0">
                  {SLATE.map(([label, value]) => (
                    <div key={label} className="p-4 sm:p-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                        {label}
                      </p>
                      <p className="mt-2 font-heading text-xl uppercase leading-none sm:text-2xl">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col justify-center">
              <p className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-[color:var(--accent)]">
                <span className="h-px w-8 bg-[var(--accent)]" />
                Mission statement
              </p>
              <p className="font-serif text-xl italic leading-[1.6] sm:text-2xl">{CLOSING}</p>
            </Reveal>
          </div>
        </Container>

        {/* Sign-off */}
        <div className="relative h-[clamp(8rem,22vw,16rem)] overflow-hidden border-t border-[color:var(--rule)]">
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[clamp(4.5rem,16vw,15rem)] uppercase leading-none text-[color:var(--rule)] [-webkit-text-stroke:1px_var(--accent)] [-webkit-text-fill-color:transparent]"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2 }}
          >
            Signal Locked
          </motion.span>
        </div>
      </div>
    </ReportSection>
  );
}
