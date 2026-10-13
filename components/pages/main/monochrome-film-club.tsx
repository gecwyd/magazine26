"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Container,
  Kicker,
  Rail,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./monochrome-film-club.module.css";

const TONE: ReportTone = {
  paper: "#0a0a0a",
  ink: "#f1f1ee",
  accent: "#ffffff",
  muted: "#f1f1eeb0",
  rule: "#f1f1ee29",
};

// One spot colour: the red REC lamp. Everything else stays strictly monochrome.
const PALETTE = { "--rec": "#ff3b30", "--panel": "#141414" } as CSSProperties;

const FPS = 24;

// Fill-color (not color) is made transparent so currentColor still paints the stroke.
const OUTLINE = "[-webkit-text-stroke:1.5px_currentColor] [-webkit-text-fill-color:transparent]";

const INTRO_LEAD =
  "Monochrome, the official Film and Creative Arts Club of Government Engineering College Wayanad, provides a creative platform for students to explore cinema, photography, filmmaking and digital storytelling.";

const INTRO_BODY =
  "The club aims to bring together technical skills and artistic expression while encouraging students to discover and develop their creative talents.";

const YEAR =
  "During the academic year 2025–26, Monochrome engaged students through a variety of creative and technical activities. Through these activities, Monochrome contributed to the development of technical skills, teamwork, leadership and communication while providing students with a creative space alongside their academic life.";

const CLOSING =
  "Monochrome continues to work towards creating a vibrant cultural atmosphere on campus and looks forward to expanding its activities through inter-college events and guest lectures.";

const WORDS_TOP = ["Action", "Frame", "Focus", "Light", "Sound", "Cut"];
const WORDS_BOTTOM = ["Story", "Reel", "Shoot", "Edit", "Screen", "Roll"];

/** Simple line-art "stills" for each frame, drawn in currentColor. */
const STILLS: ReactNode[] = [
  // Screenings: projector beam onto a screen, audience below
  <g key="screen">
    <rect x="18" y="52" width="26" height="22" rx="3" />
    <circle cx="31" cy="63" r="6" />
    <path d="M44 58 L150 22 V104 L44 68 Z" fill="currentColor" fillOpacity="0.16" />
    <rect x="150" y="22" width="34" height="82" />
    {[40, 68, 96, 124, 152].map((cx) => (
      <circle key={cx} cx={cx} cy="128" r="7" />
    ))}
  </g>,
  // Sessions: camera aperture
  <g key="aperture">
    <circle cx="100" cy="75" r="56" />
    <circle cx="100" cy="75" r="14" />
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <line key={deg} x1="100" y1="75" x2="100" y2="19" transform={`rotate(${deg} 100 75)`} />
    ))}
    <polygon points="100,61 112,68 112,82 100,89 88,82 88,68" fill="currentColor" fillOpacity="0.2" />
  </g>,
  // Contests: a reel on screen, script lines beneath
  <g key="script">
    <rect x="30" y="16" width="140" height="78" rx="6" />
    <polygon points="90,38 90,72 120,55" fill="currentColor" />
    <line x1="30" y1="112" x2="170" y2="112" />
    <line x1="30" y1="126" x2="130" y2="126" />
    <line x1="30" y1="140" x2="150" y2="140" />
  </g>,
  // Photography: viewfinder with rule-of-thirds grid and a subject
  <g key="viewfinder">
    <rect x="24" y="14" width="152" height="118" />
    <line x1="74.7" y1="14" x2="74.7" y2="132" strokeOpacity="0.45" />
    <line x1="125.3" y1="14" x2="125.3" y2="132" strokeOpacity="0.45" />
    <line x1="24" y1="53.3" x2="176" y2="53.3" strokeOpacity="0.45" />
    <line x1="24" y1="92.7" x2="176" y2="92.7" strokeOpacity="0.45" />
    <circle cx="125.3" cy="53.3" r="16" fill="currentColor" fillOpacity="0.2" />
    <rect x="109" y="37" width="32" height="32" strokeDasharray="6 4" />
  </g>,
  // Community: overlapping circles
  <g key="community">
    <circle cx="76" cy="66" r="44" />
    <circle cx="124" cy="66" r="44" />
    <circle cx="100" cy="106" r="44" />
    <circle cx="100" cy="78" r="5" fill="currentColor" />
  </g>,
];

const FRAMES = [
  {
    label: "Screenings",
    text: "Monthly movie screenings were conducted based on student voting, followed by discussions on cinematography and film themes.",
  },
  {
    label: "Sessions",
    text: "The club also organised technical sessions on video editing, camera handling, lighting and sound design.",
  },
  {
    label: "Contests",
    text: "Students were encouraged to participate in Reel and short-content competitions, movie recreation challenges, scriptwriting and storytelling competitions.",
  },
  {
    label: "Photography",
    text: "Photography walks and theme-based contests provided opportunities for students interested in visual arts to improve their photography and composition skills.",
  },
  {
    label: "Community",
    text: "The club maintained a student community where senior members and peers shared tutorials, provided feedback, helped solve software-related issues and guided students in using filmmaking equipment.",
  },
];

const SLATE_CELLS = [
  ["Prod.", "Monochrome"],
  ["Roll", "2025/26"],
  ["Scene", "GECW"],
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Running timecode. Text is written straight to the DOM (no React re-render) and the
 * timer only runs while the element is on screen.
 */
function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const start = performance.now();
    let timer = 0;
    const tick = () => {
      const total = Math.floor(((performance.now() - start) / 1000) * FPS);
      const frames = total % FPS;
      const seconds = Math.floor(total / FPS) % 60;
      const minutes = Math.floor(total / (FPS * 60)) % 60;
      el.textContent = `01:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!timer) timer = window.setInterval(tick, 1000 / FPS);
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
      01:00:00:00
    </span>
  );
}

/** Film countdown leader. Rings are static; the sweep and the 5-4-3-2-1 are pure CSS animations. */
function Leader({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative aspect-square ${className}`}>
      <div className={`${styles.sweep} absolute inset-[2.5%] rounded-full`} />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="146" />
        <circle cx="200" cy="200" r="60" strokeOpacity="0.5" />
        <line x1="0" y1="200" x2="400" y2="200" />
        <line x1="200" y1="0" x2="200" y2="400" />
      </svg>
      {[5, 4, 3, 2, 1].map((n, i) => (
        <span
          key={n}
          className={`${styles.count} absolute inset-0 flex items-center justify-center font-heading text-[32vmin] leading-none`}
          style={{ "--i": i } as CSSProperties}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

/** Viewfinder corner bracket; `pos` picks the corner. */
function Bracket({ pos }: { pos: string }) {
  return <span aria-hidden className={`absolute h-8 w-8 border-[color:var(--ink)] sm:h-12 sm:w-12 ${pos}`} />;
}

/** Scrolling word tape framed by sprocket holes. */
function Reel({
  words,
  reverse = false,
  duration = 36,
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
            className={`font-heading text-[clamp(3.5rem,8vw,7rem)] uppercase leading-none ${outline ? OUTLINE : ""}`}
          >
            {word}
          </span>
          <span aria-hidden className="h-3 w-3 rounded-full bg-current sm:h-4 sm:w-4" />
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

/**
 * The five activities as frames on a film strip. Below xl it is a native swipeable, snapping
 * scroller (no scripting); from xl up all five frames fit and it lays out as a static grid.
 */
function FilmStrip() {
  return (
    <div className="bg-[color:var(--panel)]">
      <div className={styles.perf} aria-hidden />
      <ol
        className={`${styles.strip} flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 py-6 sm:scroll-px-10 sm:gap-4 sm:px-10 sm:py-8 lg:scroll-px-16 lg:px-16 xl:grid xl:grid-cols-5 xl:overflow-visible`}
      >
        {FRAMES.map((frame, index) => {
            const inverted = index % 2 === 0;
            return (
              <li
                key={frame.label}
                className={`relative flex w-[78vw] max-w-[27rem] shrink-0 flex-col overflow-hidden border-2 border-[color:var(--ink)] p-5 snap-start sm:w-[46vw] sm:p-6 lg:w-[34vw] xl:w-auto xl:max-w-none ${
                  inverted ? "bg-[color:var(--ink)] text-[color:var(--paper)]" : "bg-[color:var(--paper)] text-[color:var(--ink)]"
                }`}
              >
                <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.3em]">
                  <span>Frame {pad(index + 1)}</span>
                  <span>▶ {pad(index * 4 + 8)}s</span>
                </div>

                <div className="relative my-4 aspect-[4/3] w-full">
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
                    {STILLS[index]}
                  </svg>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-3 right-0 font-heading text-[7rem] leading-none [-webkit-text-stroke:1.5px_currentColor] [-webkit-text-fill-color:transparent] sm:text-[8rem]"
                  >
                    {pad(index + 1)}
                  </span>
                </div>

                <h3 className="font-heading text-5xl uppercase leading-none sm:text-6xl">{frame.label}</h3>
                <p className="mt-4 border-t border-current pt-4 text-sm leading-[1.7] opacity-80">{frame.text}</p>
              </li>
            );
          })}
        </ol>
      <div className={styles.perf} aria-hidden />
    </div>
  );
}

export function MonochromeFilmClub() {
  const reduceMotion = useReducedMotion();

  return (
    <ReportSection id="sec-monochrome" tone={TONE}>
      <div style={PALETTE}>
        <Container>
          <Rail left="Film & Creative Arts Club" right="Clubs & Activities / 04" />
        </Container>

        {/* Hero: seen through a camera viewfinder */}
        <div className="relative overflow-hidden">
          <div aria-hidden className={styles.grain} />
          <div aria-hidden className={styles.scan} />



          <div aria-hidden className="pointer-events-none absolute inset-3 z-20 sm:inset-6">
            <Bracket pos="left-0 top-0 border-l-2 border-t-2" />
            <Bracket pos="right-0 top-0 border-r-2 border-t-2" />
            <Bracket pos="bottom-0 left-0 border-b-2 border-l-2" />
            <Bracket pos="bottom-0 right-0 border-b-2 border-r-2" />
            <div className="absolute left-4 top-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] sm:left-16 sm:top-5">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--rec)]" />
              Rec
            </div>
            <div className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.2em] sm:right-16 sm:top-5">
              <Timecode />
            </div>
            <div className="absolute bottom-3 left-4 hidden font-mono text-[10px] uppercase tracking-[0.24em] sm:bottom-5 sm:left-16 sm:block">
              {FPS} fps · 16:9 · B&amp;W
            </div>
            <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.24em] sm:bottom-5 sm:right-16">
              Bat ▮▮▮▯
            </div>
            <span className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 sm:block">
              <span className="absolute left-0 top-1/2 h-px w-full bg-[color:var(--ink)] opacity-40" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-[color:var(--ink)] opacity-40" />
            </span>
          </div>

          <Container className="relative z-10">
            <div className="pb-24 pt-20 sm:pb-32 sm:pt-28">
              <Reveal>
                <Kicker>Academic Year 2025–26</Kicker>
                <h2 className="font-heading uppercase tracking-[0.005em]">
                  <span
                    className={`${styles.driftRight} block text-[clamp(6rem,34vw,9rem)] leading-[0.78] sm:text-[clamp(9rem,26vw,20rem)] lg:text-[clamp(10rem,24vw,24rem)]`}
                  >
                    Mono
                  </span>
                  <span
                    className={`${styles.driftLeft} block text-[clamp(6rem,34vw,9rem)] leading-[0.78] sm:text-[clamp(9rem,26vw,20rem)] lg:text-[clamp(10rem,24vw,24rem)] ${OUTLINE}`}
                  >
                    chrome
                  </span>
                </h2>
                <p className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
                  <span className="h-px w-10 bg-[color:var(--ink)]" />
                  Film &amp; Creative Arts Club · GECW
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
                <p className="font-serif text-2xl leading-[1.5] sm:text-3xl lg:text-[2.6rem]">
                  <span className="bg-[color:var(--ink)] px-2 text-[color:var(--paper)] [box-decoration-break:clone]">
                    Monochrome
                  </span>
                  {INTRO_LEAD.slice("Monochrome".length)}
                </p>
                <p className="border-l-2 border-[color:var(--ink)] pl-5 text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
                  {INTRO_BODY}
                </p>
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Word tape */}
        <div className="border-y-2 border-[color:var(--ink)]">
          <div className="bg-[color:var(--ink)] text-[color:var(--paper)]">
            <Reel words={WORDS_TOP} duration={40} />
          </div>
          <div className="text-[color:var(--ink)]">
            <Reel words={WORDS_BOTTOM} reverse duration={34} outline />
          </div>
        </div>

        {/* Five frames */}
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10 pt-20 sm:pb-14 sm:pt-28">
            <h3 className="font-heading text-[clamp(4rem,12vw,10rem)] uppercase leading-[0.82]">
              Five
              <span className={`block ${OUTLINE}`}>Frames</span>
            </h3>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
              The year on one reel.
              <span className="xl:hidden"> Swipe to roll the film →</span>
            </p>
          </Reveal>
        </Container>
        <FilmStrip />

        {/* Slate + end credits */}
        <Container>
          <div className="grid gap-16 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <Reveal>
              <motion.div
                initial={reduceMotion ? false : { rotate: -14 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ type: "spring", stiffness: 520, damping: 16, delay: 0.35 }}
                style={{ transformOrigin: "0% 100%" }}
                className={`${styles.stripes} h-12 border-2 border-[color:var(--ink)] sm:h-14`}
              />
              <div className="border-2 border-t-0 border-[color:var(--ink)]">
                <div className={`${styles.stripes} h-10 border-b-2 border-[color:var(--ink)] sm:h-12`} />
                <div className="grid grid-cols-3 divide-x-2 divide-[color:var(--ink)] border-b-2 border-[color:var(--ink)]">
                  {SLATE_CELLS.map(([label, value]) => (
                    <div key={label} className="p-3 sm:p-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">{label}</p>
                      <p className="mt-2 font-heading text-2xl uppercase leading-none sm:text-4xl">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[1fr_auto] divide-x-2 divide-[color:var(--ink)] border-b-2 border-[color:var(--ink)]">
                  <div className="p-3 sm:p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">Club</p>
                    <p className="mt-2 font-heading text-2xl uppercase leading-none sm:text-4xl">
                      Film &amp; Creative Arts
                    </p>
                  </div>
                  <div className="p-3 sm:p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">Take</p>
                    <p className="mt-2 font-heading text-2xl leading-none sm:text-4xl">01</p>
                  </div>
                </div>
                <div className="p-5 sm:p-8">
                  <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                    Notes from the year
                  </p>
                  <p className="font-serif text-lg leading-[1.75] sm:text-xl">{YEAR}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col justify-center">
              <p className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em]">
                <span className="h-px w-8 bg-[color:var(--ink)]" />
                End credits
              </p>
              <p className="font-serif text-2xl italic leading-[1.45] sm:text-3xl lg:text-4xl">{CLOSING}</p>
              <div className="mt-10">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Next reel
                </p>
                <ul className="flex flex-wrap gap-3">
                  {["Inter-college events", "Guest lectures"].map((item) => (
                    <li
                      key={item}
                      className="border-2 border-[color:var(--ink)] px-4 py-2 font-heading text-2xl uppercase leading-none tracking-wide"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Fin */}
        <div className="relative h-[clamp(9rem,26vw,20rem)] overflow-hidden border-t-2 border-[color:var(--ink)]">
          <span
            aria-hidden
            className={`absolute left-1/2 top-0 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(10rem,36vw,38rem)] uppercase leading-[0.85] ${OUTLINE}`}
          >
            The End
          </span>
        </div>
      </div>
    </ReportSection>
  );
}
