"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportPhotoItem,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./gbot.module.css";

const TONE: ReportTone = {
  paper: "#08120e",
  ink: "#e6f5ec",
  accent: "#5dffa8",
  muted: "#e6f5ecb0",
  rule: "#5dffa82e",
};

const EASE = [0.16, 1, 0.3, 1] as const;

const INTRO =
  "The GBot Robotics Club of Government Engineering College Wayanad conducted and participated in various workshops, exhibitions, competitions and technical programmes during 2024–26, with the aim of promoting practical learning and interest in robotics and technology.";

const CLOSING =
  "Through these diverse initiatives, GBot Robotics Club provided students with opportunities for hands-on learning, project development, mentoring, teamwork and technical communication while encouraging curiosity, creativity and greater interest in robotics, engineering and technological innovation.";

const BOOT_LINES = [
  { label: "init gbot_robotics_club.sys", status: "OK" },
  { label: "mount /arduino /sensors /motor_drivers /pcb", status: "OK" },
  { label: "load events.log: 11 entries, 2024–26", status: "OK" },
];

const TAPE_WORDS = ["Build", "Debug", "Deploy", "Calibrate", "Iterate", "Automate", "Prototype", "Ship"];

const EVENTS = [
  {
    date: "20 Mar 2024",
    title: "Workshop at GPTC Meppadi",
    body: "A team of 12 GBot members conducted a hands-on robotics workshop at GPTC Meppadi, covering robotics fundamentals, microcontrollers, Embedded C, sensors, motor drivers and a rover project.",
  },
  {
    date: "20–27 Mar 2024",
    title: "Exhibition at Valliyoorkavu",
    body: "The club organised an exhibition at Valliyoorkavu Exhibition Hall, showcasing projects such as Human Follower, Line Follower, Robotic Arm and an Interactive Game.",
  },
  {
    date: "8 Apr 2024",
    title: "Senior farewell",
    body: "A farewell programme for seniors was conducted at the CSE Seminar Hall, featuring speeches, certificate distribution, cake cutting and interactive games.",
  },
  {
    date: "5 Oct 2024",
    title: "IEEE Malabar Hub Meet 2024",
    body: "GBot conducted a Line Follower Robotics Workshop, where participants built and tested robots and took part in a small competition.",
  },
  {
    date: "19–20 Oct 2024",
    title: "Spark 2.0",
    body: "A two-day robotics and technology workshop that introduced 89 first-year students to Arduino programming, sensors, simulation, rover design and robotics through hands-on activities and a Robomaze challenge.",
  },
  {
    date: "11 Jan 2025",
    title: "Robo Olympics 2025",
    body: "GBot members participated in the Robo Football Competition at Robo Olympics 2025 held at College of Engineering Trivandrum, gaining valuable experience in robotics design, control and teamwork.",
  },
  {
    date: "14 Jul 2025",
    title: "Little Kites workshop",
    body: "A one-day robotics workshop was conducted for around 40 Little Kites students at GVHSS Mananthavady, introducing them to robotics, electronic components and basic robot-building concepts.",
  },
  {
    date: "From 15 Jul 2025",
    title: "GBot Robo Series",
    body: "Evening classes were conducted for around 90 club members in two batches, covering programming, robotics project development, PCB designing and other technical fundamentals.",
  },
  {
    date: "25 Aug 2025",
    title: "Robopulse",
    body: "A session on Image Processing with OpenCV was conducted, introducing participants to image processing, computer vision datasets and robotics applications.",
  },
  {
    date: "13–14 Sep 2025",
    title: "Spark 3.0",
    body: "The camp welcomed first-year and lateral-entry students to the robotics community, with 86 participants and 12 mentors/executive members. It covered Arduino, Embedded C, sensors and motor drivers and concluded with a Line Follower Competition.",
  },
  {
    date: "Exhibitions",
    title: "Expos",
    body: "The club also participated in exhibitions including EXPO Bathery, Ente Keralam Expo and the GVHSS Mananthavady Expo, showcasing projects such as Spider Bot, Robotic Hand and other innovative prototypes while promoting awareness of robotics among the public and school students.",
  },
  {
    date: "5 Dec 2025",
    title: "Workshop at Vijaya HSS Pulpally",
    body: "GBot conducted a robotics workshop for +1 and +2 Computer Science students, introducing microcontrollers, sensors and their applications through interactive demonstrations and a Human Following Rover activity.",
  },
];

const STATS = [
  { id: "01", value: "89", label: "Spark 2.0 · first-years" },
  { id: "02", value: "86", label: "Spark 3.0 · participants" },
  { id: "03", value: "90", label: "Robo Series · members" },
];

const CAMERAS: (ReportPhotoItem & { tag: string })[] = [
  {
    id: "gbot-1",
    alt: "GBot line follower workshop at the IEEE Malabar Hub Meet 2024",
    caption: "IEEE Malabar Hub Meet 2024",
    tag: "CAM_01",
  },
  {
    id: "gbot-2",
    alt: "A GBot member demonstrating robotics on a display screen",
    tag: "CAM_02",
  },
  {
    id: "gbot-3",
    alt: "GBot members in club T-shirts standing together",
    tag: "CAM_03",
  },
  {
    id: "gbot-expo",
    alt: "GBot projects on display at the expo in Sulthan Bathery",
    caption: "Expo at Sulthan Bathery",
    tag: "CAM_04",
  },
];

function Led({ i, tone = "accent" }: { i: number; tone?: "accent" | "paper" }) {
  return (
    <span
      aria-hidden
      className={`${styles.blink} h-1.5 w-1.5 shrink-0 rounded-full ${
        tone === "accent" ? "bg-[color:var(--accent)]" : "bg-[color:var(--paper)]"
      }`}
      style={{ "--i": i } as CSSProperties}
    />
  );
}

function LedRow({ count = 8, tone = "accent" }: { count?: number; tone?: "accent" | "paper" }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <Led key={i} i={i} tone={tone} />
      ))}
    </div>
  );
}

/** Terminal titlebar with three status dots and a command line. */
function TerminalBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[color:var(--rule)] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:px-5">
      <span className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]/45" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]/25" />
      </span>
      <span className="ml-2 truncate normal-case tracking-[0.08em]">{label}</span>
    </div>
  );
}

/** Radar dish: concentric rings, deterministic "signal" blips, and a spinning sweep. */
function Radar({ count, className = "" }: { count: number; className?: string }) {
  const blips = Array.from({ length: count }, (_, i) => {
    const angle = ((i * 137.508) % 360) * (Math.PI / 180);
    const radius = 20 + ((i * 53) % 62);
    return { x: 100 + radius * Math.cos(angle), y: 100 + radius * Math.sin(angle) };
  });

  return (
    <div aria-hidden className={`relative aspect-square overflow-hidden rounded-full ${className}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="100" cy="100" r="98" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="70" strokeOpacity="0.32" />
        <circle cx="100" cy="100" r="40" strokeOpacity="0.26" />
        <line x1="100" y1="2" x2="100" y2="198" strokeOpacity="0.18" />
        <line x1="2" y1="100" x2="198" y2="100" strokeOpacity="0.18" />
        {blips.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="2.6" fill="currentColor" stroke="none" />
        ))}
      </svg>
      <div className={`${styles.radarSweep} absolute inset-0`} />
    </div>
  );
}

/** Boot log: a stack of "system" lines each resolving to a status, cursor blinking at the end. */
function BootLog({ lines }: { lines: { label: string; status: string }[] }) {
  return (
    <ul className="space-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)] sm:text-[11px]">
      {lines.map((line) => (
        <li key={line.label} className="flex items-baseline justify-between gap-3">
          <span className="truncate">
            <span className="text-[color:var(--accent)]">&gt; </span>
            {line.label}
          </span>
          <span className="shrink-0 text-[color:var(--accent)]">{line.status}</span>
        </li>
      ))}
      <li className="flex items-center gap-1.5 pt-1 text-[color:var(--accent)]">
        <span>&gt; _</span>
        <span className="h-3 w-1.5 animate-pulse bg-[color:var(--accent)]" />
      </li>
    </ul>
  );
}

/** HUD readout card for a single stat: corner brackets, a status LED, the number. */
function HudStat({ id, value, label }: { id: string; value: string; label: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="relative border border-[color:var(--rule)] p-5"
    >
      <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[color:var(--accent)]" />
      <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[color:var(--accent)]" />
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
        <span>Sensor/{id}</span>
        <Led i={Number(id)} />
      </div>
      <p className="mt-4 font-heading text-5xl leading-none text-[color:var(--accent)] sm:text-6xl">{value}</p>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{label}</p>
    </motion.div>
  );
}

/** Word tape framed as scrolling console output. */
function Marquee({
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
      className={`${styles.track} ${reverse ? styles.reverse : ""} flex min-w-full shrink-0 items-center gap-10 pr-10`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.32em] sm:text-base">
          {word}
          <span aria-hidden>◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3.5 sm:py-4">
      {track(false)}
      {track(true)}
    </div>
  );
}

/** Events rendered as terminal log lines: an index, a timestamp, a command and its comment. */
function SystemLog({ items }: { items: typeof EVENTS }) {
  return (
    <ol className="border-t border-[color:var(--rule)]">
      {items.map((item, index) => (
        <li
          key={`${item.date}-${index}`}
          className="grid gap-2 border-b border-[color:var(--rule)] py-6 md:grid-cols-[4rem_10rem_1fr] md:gap-8 md:py-7"
        >
          <Reveal y={12}>
            <span className="font-mono text-[10px] text-[color:var(--muted)]">
              [{String(index + 1).padStart(2, "0")}]
            </span>
          </Reveal>
          <Reveal y={12} delay={0.03}>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
              {item.date}
            </span>
          </Reveal>
          <Reveal y={12} delay={0.06}>
            <h4 className="font-heading text-xl uppercase leading-tight tracking-wide sm:text-2xl">
              <span className="text-[color:var(--accent)]">$ </span>
              {item.title}
            </h4>
            <p className="mt-2 max-w-3xl text-[13px] leading-[1.8] text-[color:var(--muted)] sm:text-sm">
              <span className="text-[color:var(--accent)]/70">{"// "}</span>
              {item.body}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** A photo framed as a live sensor feed: corner brackets, scanlines, a REC dot and a camera tag. */
function SensorFrame({ photo }: { photo: ReportPhotoItem & { tag: string } }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="border border-[color:var(--rule)] p-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ReportPhoto id={photo.id} alt={photo.alt} ratio="4 / 3" sizes="(max-width: 768px) 50vw, 25vw" />
        <div aria-hidden className={`${styles.scan} pointer-events-none absolute inset-0`} />
        <span aria-hidden className="absolute left-1.5 top-1.5 h-3 w-3 border-l border-t border-[color:var(--accent)]" />
        <span aria-hidden className="absolute right-1.5 top-1.5 h-3 w-3 border-r border-t border-[color:var(--accent)]" />
        <span aria-hidden className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b border-l border-[color:var(--accent)]" />
        <span aria-hidden className="absolute bottom-1.5 right-1.5 h-3 w-3 border-b border-r border-[color:var(--accent)]" />
        <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
          <Led i={0} />
          Live
        </div>
        <div className="pointer-events-none absolute right-2 top-2 font-mono text-[8px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
          {photo.tag}
        </div>
      </div>
      <p className="mt-2 px-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-[color:var(--muted)]">
        {photo.caption ?? "Unlabelled frame"}
      </p>
    </motion.div>
  );
}

export function Gbot() {
  return (
    <ReportSection id="sec-gbot" tone={TONE}>
      <Container className="relative">
        <Rail left="GBot Robotics Club" right="Clubs & Activities / 10" />

        <div className={`${styles.circuit} relative`}>
          <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal className="relative">
              <Radar
                count={EVENTS.length}
                className="pointer-events-none absolute -right-6 -top-10 w-40 text-[color:var(--accent)] opacity-[0.16] sm:-right-4 sm:-top-16 sm:w-56 lg:w-64"
              />
              <Kicker>Robotics · 2024–26</Kicker>
              <h2 className={`${styles.flicker} font-heading text-[clamp(6rem,20vw,18rem)] uppercase leading-[0.78] tracking-[-0.01em]`}>
                G<span className="text-[color:var(--accent)]">-</span>BOT
              </h2>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
                &gt; robotics_club.gecw <span className="animate-pulse text-[color:var(--accent)]">_</span>
              </p>
            </Reveal>

            <Reveal delay={0.1} className="self-end">
              <div className="border border-[color:var(--rule)]">
                <TerminalBar label="root@gbot:~$ cat report_2024-26.log" />
                <div className="p-5 sm:p-6">
                  <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">{INTRO}</p>
                  <div className="mt-6 border-t border-[color:var(--rule)] pt-5">
                    <BootLog lines={BOOT_LINES} />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                {STATS.map((stat) => (
                  <HudStat key={stat.id} {...stat} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Console tape */}
        <div className="relative z-10 py-8 sm:py-14">
          <div className="-mx-[5%] -rotate-1 border-y border-[color:var(--rule)] bg-[color:var(--accent)] text-[color:var(--paper)]">
            <Marquee words={TAPE_WORDS} duration={42} />
          </div>
          <div className="-mx-[5%] -mt-3 rotate-1 border-y border-[color:var(--rule)] text-[color:var(--accent)]">
            <Marquee words={TAPE_WORDS} reverse duration={36} />
          </div>
        </div>

        {/* Event log */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10 pt-16 sm:pb-14 sm:pt-24">
          <div>
            <Kicker>System Log</Kicker>
            <h3 className="font-heading text-[clamp(3.5rem,11vw,8rem)] uppercase leading-[0.82]">
              Events<span className="text-[color:var(--accent)]">.log</span>
            </h3>
          </div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
            {EVENTS.length} entries · 2024–2026
          </p>
        </Reveal>
        <SystemLog items={EVENTS} />

        {/* Sensor feed */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10 pt-16 sm:pb-14 sm:pt-24">
          <div>
            <Kicker>Sensor Feed</Kicker>
            <h3 className="font-heading text-[clamp(3.5rem,11vw,8rem)] uppercase leading-[0.82]">
              Camera<span className="text-[color:var(--accent)]">.feed</span>
            </h3>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 pb-16 sm:gap-4 lg:grid-cols-4 sm:pb-24">
          {CAMERAS.map((cam, index) => (
            <Reveal key={cam.id} delay={(index % 4) * 0.06} y={18}>
              <SensorFrame photo={cam} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* System status / closing */}
      <div className={`${styles.circuit} relative overflow-hidden bg-[color:var(--accent)] text-[color:var(--paper)]`}>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(8rem,30vw,30rem)] uppercase leading-none opacity-[0.14]"
        >
          GBOT
        </span>

        <Container className="relative">
          <div className="flex flex-col gap-10 pb-20 pt-16 sm:pb-28 sm:pt-20">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
              <LedRow count={8} tone="paper" />
              <span>System Status: Operational</span>
            </div>

            <Reveal className="mx-auto max-w-3xl border-t border-[color:var(--paper)]/25 pt-10">
              <p className="font-mono text-sm leading-[1.9]">{CLOSING}</p>
              <p className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em]">
                <span className="h-px w-10 bg-[color:var(--paper)]" />
                GBot Robotics Club · GECW
              </p>
            </Reveal>
          </div>
        </Container>
      </div>
    </ReportSection>
  );
}
