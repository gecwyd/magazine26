"use client";

import { useId, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Container,
  Kicker,
  PhotoMasonry,
  Rail,
  ReportSection,
  Reveal,
  Stat,
  type ReportPhotoItem,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./exorque.module.css";

const TONE: ReportTone = {
  paper: "#101113",
  ink: "#f2efe9",
  accent: "#ff6a1a",
  muted: "#f2efe9b0",
  rule: "#f2efe92b",
};

const PALETTE = {
  "--steel": "#9aa1a8",
  "--caution": "#ffcc00",
} as CSSProperties;

const OUTLINE = "[-webkit-text-stroke:2px_currentColor] [-webkit-text-fill-color:transparent]";

const INTRO =
  "At Government Engineering College Wayanad, EXORQUE, the Automotive Club of the Mechanical Engineering Department, provides students with opportunities to explore the world of automobiles beyond the classroom. Through exhibitions, technical workshops, hands-on training and knowledge-based competitions, the club encourages students to connect theoretical concepts with practical experience. From understanding engine mechanisms and modern manufacturing technologies to testing their knowledge through competitions, EXORQUE continues to create a platform for technical learning, innovation and active student participation.";

const CHAPTERS: {
  code: string;
  title: string;
  date: string;
  venue: string;
  body: string;
  photos: ReportPhotoItem[];
}[] = [
  {
    code: "EXH",
    title: "Exhibition: All Kerala Technology Fair",
    date: "5–6 Jan 2024",
    venue: "Govt. Technical High School, Sulthanbathery",
    body: "EXORQUE participated in the Science Fair held on January 5 and 6, 2024, at Government Technical High School, Sulthanbathery. The exhibition showcased automotive technology, sustainability and engineering principles through various displays and demonstrations. A working model of an internal combustion engine helped visitors understand components such as pistons, crankshafts and camshafts. Interactive sessions also gave students an opportunity to assemble and disassemble small engine parts. The exhibition received positive feedback and encouraged students to explore automotive engineering and mechanics.",
    photos: [
      { id: "exorque-engine", alt: "Working model of an internal combustion engine on display" },
      { id: "exorque-fair-group", alt: "EXORQUE team and visitors gathered at the exhibition" },
      { id: "exorque-fair-demo", alt: "Students examining an engine part at the exhibition" },
    ],
  },
  {
    code: "WRK",
    title: "3-D Printing Workshop",
    date: "6 Aug 2025",
    venue: "ASAP Hall",
    body: "A one-day 3D Printing Workshop was organised on August 6, 2025, at ASAP Hall. The workshop introduced students to additive manufacturing, different 3D printing technologies, materials and real-world applications. Participants learned the complete process from CAD modelling and slicing to actual printing and post-processing. Using SolidWorks and Creality Slicer, students created simple models and experienced the complete workflow through a live demonstration. With 38 students participating, the workshop provided an engaging blend of theory and hands-on learning.",
    photos: [
      { id: "exorque-3d-1", alt: "Students listening to the 3D printing workshop session" },
      { id: "exorque-3d-2", alt: "Trainer explaining the 3D printing workflow at a display screen" },
      { id: "exorque-3d-group", alt: "Participants of the 3D printing workshop seated in the hall" },
    ],
  },
  {
    code: "OVH",
    title: "Engine Overhauling Workshop",
    date: "11 Oct 2025",
    venue: "with SAE GECW Student Chapter",
    body: "In association with the SAE GECW Student Chapter, EXORQUE conducted a Honda Engine Overhauling Workshop on October 11, 2025, for SAE registered students. The workshop offered practical exposure to the construction and working of the Honda Splendor engine. After a theory session, participants worked in groups to dismantle and reassemble engines under the guidance of student trainers. A quiz on engine components and automobile engineering was also conducted. The workshop strengthened students' practical knowledge and promoted interdisciplinary learning between Mechanical and Electronics students.",
    photos: [
      { id: "exorque-overhaul-1", alt: "Students dismantling an engine during the overhauling workshop" },
      { id: "exorque-overhaul-2", alt: "Trainer presenting to participants at a laptop" },
      { id: "exorque-overhaul-3", alt: "Groups working on engine parts at the overhauling workshop" },
      { id: "exorque-overhaul-4", alt: "Participants of the overhauling workshop posing together" },
      { id: "exorque-overhaul-5", alt: "Workshop trainers and participants in the workshop hall" },
    ],
  },
  {
    code: "QIZ",
    title: "Quiz Competition",
    date: "AY 2025–26",
    venue: "Knowledge-based competition",
    body: "EXORQUE also conducted a quiz competition focusing on Mechanical Science, Technology, Automobiles and Current Affairs. Students from different departments participated enthusiastically, making the event both informative and competitive. The quiz encouraged students to test their knowledge, improve their awareness and learn beyond the classroom. The active participation and positive response highlighted the club's efforts to promote technical learning through engaging activities.",
    photos: [
      { id: "exorque-quiz-1", alt: "Quiz participants gathered around the quiz master" },
      { id: "exorque-quiz-2", alt: "Students assembled outdoors for the quiz competition" },
      { id: "exorque-quiz-3", alt: "Crowd of students taking part in the quiz" },
    ],
  },
];

const STATS = [
  { value: "04", label: "Programmes conducted" },
  { value: "38", label: "3-D printing workshop participants" },
  { value: "24/25", label: "Seasons across the fair, print lab & garage" },
];

const TAPE_TOP = ["Torque", "Ignition", "Horsepower", "Chassis", "Piston", "Velocity"];
const TAPE_BOTTOM = ["Overhaul", "Calibrate", "Assemble", "Diagnose", "Rebuild", "Drive"];

const GAUGE_TICKS = Array.from({ length: 13 }, (_, i) => {
  const angle = -120 + (i * 240) / 12;
  const rad = (angle * Math.PI) / 180;
  const outer = 92;
  const inner = i % 3 === 0 ? 74 : 83;
  return {
    key: i,
    x1: 100 + outer * Math.sin(rad),
    y1: 100 - outer * Math.cos(rad),
    x2: 100 + inner * Math.sin(rad),
    y2: 100 - inner * Math.cos(rad),
    redline: i >= 10,
  };
});

/** Scrolling word tape. Two identical tracks translate by their own width for a seamless loop. */
function Marquee({
  words,
  reverse = false,
  duration = 40,
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
          <span className="font-heading text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none">{word}</span>
          <span aria-hidden className="text-[clamp(1.2rem,2.4vw,2rem)] leading-none">
            ✦
          </span>
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

/** Rotating circular sticker; text runs on a path around the rim. */
function Badge({ text, center, className = "" }: { text: string; center: string; className?: string }) {
  const pathId = `exorque-badge-${useId().replace(/:/g, "")}`;
  return (
    <div className={`relative aspect-square rounded-full ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className={`${styles.spin} absolute inset-0 h-full w-full`}>
        <defs>
          <path id={pathId} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fontSize="20" className="font-mono uppercase" fill="currentColor" textLength="470" lengthAdjust="spacing">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-heading text-xl leading-[0.85] sm:text-2xl">
        {center}
      </span>
    </div>
  );
}

/** Tachometer dial. The needle sweeps toward the redline as the hero scrolls by. */
function Tachometer({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-118, 30]);

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full text-[color:var(--steel)]">
        <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        {GAUGE_TICKS.map((tick) => (
          <line
            key={tick.key}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.redline ? "var(--accent)" : "currentColor"}
            strokeWidth={tick.key % 3 === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        ))}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="34"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          style={reduceMotion ? undefined : { rotate, originX: 0.5, originY: 1 }}
        />
        <circle cx="100" cy="100" r="7" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2.5" />
      </svg>
      <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
        RPM ×1000
      </p>
    </div>
  );
}

export function Exorque() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const skew = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);

  return (
    <ReportSection id="sec-exorque" tone={TONE}>
      <div style={PALETTE}>
        <Container>
          <Rail left="Automotive Club · Mechanical Engineering" right="Clubs & Activities / 08" />
        </Container>

        {/* Hero: blueprint grid, oversized wordmark, and a live tachometer */}
        <div ref={heroRef} className={`${styles.grid} relative`}>
          <Container>
            <div className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-10">
              <div>
                <Reveal>
                  <Kicker>Driving curiosity through automotive learning</Kicker>
                  <h2 className="font-heading uppercase leading-[0.8] tracking-[-0.01em]">
                    <span className="block text-[clamp(5rem,17vw,13rem)]">Exor</span>
                    <motion.span
                      style={reduceMotion ? undefined : { x: skew }}
                      className={`block text-[clamp(5rem,17vw,13rem)] text-[color:var(--accent)] ${OUTLINE}`}
                    >
                      que
                    </motion.span>
                  </h2>
                </Reveal>

                <Reveal delay={0.1} className="mt-10 max-w-2xl">
                  <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">{INTRO}</p>
                </Reveal>

                <Reveal delay={0.18} className="mt-12 grid max-w-xl grid-cols-3 gap-6">
                  {STATS.map((stat) => (
                    <Stat key={stat.label} {...stat} />
                  ))}
                </Reveal>
              </div>

              <Reveal delay={0.12} className="relative mx-auto w-full max-w-[16rem] sm:max-w-[20rem]">
                <Tachometer />
                <Badge
                  text="Exorque ✦ Automotive Club ✦ "
                  center="GECW Mech."
                  className="absolute -bottom-6 -left-8 w-24 bg-[color:var(--paper)] text-[color:var(--accent)] ring-1 ring-[color:var(--rule)] sm:w-32"
                />
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Checker + tape bands */}
        <div className="relative z-10">
          <div className={`${styles.flag} h-3 sm:h-4`} />
          <div className="-rotate-1 bg-[color:var(--accent)] text-[color:var(--paper)]">
            <Marquee words={TAPE_TOP} duration={42} />
          </div>
          <div className="rotate-1 bg-[color:var(--ink)] text-[color:var(--paper)]">
            <Marquee words={TAPE_BOTTOM} reverse duration={36} />
          </div>
          <div className={`${styles.flag} h-3 sm:h-4`} />
        </div>

        {/* Chapters: each programme logged as a workshop job card */}
        <Container>
          <div className="py-20 sm:py-28">
            {CHAPTERS.map((chapter, index) => (
              <article
                key={chapter.title}
                className={`${styles.ticket} relative mb-10 grid gap-8 p-6 last:mb-0 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-14`}
              >
                <span className={`${styles.bolt} left-3 top-3`} aria-hidden />
                <span className={`${styles.bolt} right-3 top-3`} aria-hidden />
                <span className={`${styles.bolt} bottom-3 left-3`} aria-hidden />
                <span className={`${styles.bolt} bottom-3 right-3`} aria-hidden />

                <Reveal className="lg:sticky lg:top-16 lg:self-start">
                  <div className="flex items-center justify-between border-b border-[color:var(--rule)] pb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    <span>Work Order · {chapter.code}</span>
                    <span className="text-[color:var(--accent)]">{chapter.date}</span>
                  </div>
                  <div className="relative mt-6">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-2 -top-8 select-none font-heading text-[7rem] leading-none text-[color:var(--ink)] opacity-[0.06] sm:text-[9rem]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative font-heading text-4xl uppercase leading-[0.95] sm:text-5xl">
                      {chapter.title}
                    </h3>
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    {chapter.venue}
                  </p>
                  <p className="mt-6 text-[15px] leading-[1.85] text-[color:var(--muted)]">{chapter.body}</p>
                </Reveal>

                <PhotoMasonry photos={chapter.photos} className="columns-2 gap-3 lg:gap-4" />
              </article>
            ))}
          </div>
        </Container>

        {/* Closing statement, framed by a caution strip */}
        <div className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--paper)]">
          <div
            aria-hidden
            className="h-2.5 w-full sm:h-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--caution) 0 14px, #101113 14px 28px)",
            }}
          />
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(8rem,26vw,24rem)] uppercase leading-none opacity-10 ${OUTLINE}`}
          >
            Exorque
          </span>

          <Container className="relative">
            <div className="grid items-end gap-14 pb-28 pt-24 sm:pb-40 sm:pt-32 lg:grid-cols-[1fr_auto] lg:gap-20">
              <Reveal>
                <Kicker>From the workshop floor</Kicker>
                <p className="max-w-3xl font-heading text-3xl uppercase leading-[1.05] sm:text-4xl lg:text-5xl">
                  Every teardown, every rebuild, every quiz answered. {" "}
                  <span className="text-[color:var(--accent)]">a lesson learned beyond the syllabus.</span>
                </p>
              </Reveal>
              <Badge
                text="Torque ✦ Power ✦ Precision ✦ "
                center="Est. GECW"
                className="w-32 bg-[color:var(--accent)] text-[color:var(--paper)] sm:w-40 lg:w-48"
              />
            </div>
          </Container>
          <div
            aria-hidden
            className="h-2.5 w-full sm:h-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--caution) 0 14px, #101113 14px 28px)",
            }}
          />
        </div>
      </div>
    </ReportSection>
  );
}
