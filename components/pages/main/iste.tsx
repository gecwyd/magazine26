"use client";

import { useId, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";
import styles from "./iste.module.css";

const TONE: ReportTone = {
  paper: "#f6f1e6",
  ink: "#17282a",
  accent: "#dd5a2a",
  muted: "#17282aac",
  rule: "#17282a26",
};

const ACTIVITIES = [
  {
    title: "Orientation camps",
    body: "Help first-years settle in, make friends, and understand college life.",
  },
  {
    title: "Remedial classes",
    body: "In subjects like Analog Circuits and Python, run by faculty and senior students before exams.",
  },
  {
    title: "Skill workshops",
    body: "On things your syllabus doesn't always cover, such as UX design, functional programming, product design.",
  },
  {
    title: "Industrial visits",
    body: "Show you how what you're studying actually works in the real world.",
  },
  {
    title: "Idea pitching & expos",
    body: "Project expos where you can showcase what you're building.",
  },
  {
    title: "Placement awareness",
    body: "Academic and placement awareness sessions to help you plan ahead.",
  },
  {
    title: "State-level meets",
    body: "A chance to represent your college at state-level conventions and competitions.",
  },
];

const TAPE_WORDS = ["Build", "Solder", "Pitch", "Code", "Design", "Lead", "Present", "Iterate"];

const MODULES = [
  {
    tag: "Why it's worth joining",
    body: "Being part of ISTE isn't just a line on your resume. It's where you pick up the things engineering courses don't always teach directly: how to work in a team, speak in front of a crowd, pitch an idea, or lead a project. Members get access to hands-on sessions, guidance from alumni and faculty advisors, and a network of peers across departments and even other colleges. It's also a place to lead, not just attend. Every year, students step into roles like Forum Head, Design Lead, Media Lead, or Documentation Lead, running real events from planning to execution.",
  },
  {
    tag: "Who can join",
    body: "Anyone. ISTE welcomes students from all departments and all years. Membership drives are held at the start of the year, and interested students can also apply for department forum or execom positions when calls are announced.",
  },
  {
    tag: "Get involved",
    body: "Keep an eye out for the next membership drive and follow @istegecw for updates on upcoming workshops, competitions, and events. ISTE is what you make of it: come for a single workshop, or stay to help run the chapter.",
  },
];

/** Rotating circular sticker; text runs along the rim, chapter code sits centred. */
function Chip({ text, center }: { text: string; center: string }) {
  const pathId = `iste-chip-${useId().replace(/:/g, "")}`;
  return (
    <div className="relative aspect-square w-24 shrink-0 sm:w-28">
      <svg viewBox="0 0 200 200" aria-hidden className={`${styles.spin} absolute inset-0 h-full w-full`}>
        <defs>
          <path id={pathId} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text
          fontSize="15"
          className="font-mono uppercase"
          fill="currentColor"
          textLength="490"
          lengthAdjust="spacing"
        >
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-heading text-lg leading-[0.9] sm:text-xl">
        {center}
      </span>
    </div>
  );
}

/** Scrolling word tape, silkscreen-style. */
function Marquee({ words, duration = 34 }: { words: string[]; duration?: number }) {
  const reduceMotion = useReducedMotion();
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={`${reduceMotion ? "" : styles.track} flex min-w-full shrink-0 items-center justify-around gap-8 pr-8`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-none">{word}</span>
          <span aria-hidden className="h-2 w-2 rounded-full bg-current" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4 sm:py-5">
      {track(false)}
      {track(true)}
    </div>
  );
}

export function Iste() {
  return (
    <ReportSection id="sec-iste" tone={TONE}>
      <Container>
        <Rail left="ISTE Student Chapter · KE 091" right="Clubs & Activities / 07" />
      </Container>

      {/* Hero */}
      <div className={`${styles.blueprint} relative`}>
        <Container>
          <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <Reveal>
              <Kicker>Beyond the syllabus</Kicker>
              <h2 className="font-heading text-[clamp(6.5rem,24vw,20rem)] uppercase leading-[0.72] tracking-[-0.02em]">
                ISTE
              </h2>
              <p className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-[color:var(--accent)] sm:text-3xl">
                If you’ve heard “ISTE” mentioned around campus but aren’t quite sure what it is, here’s your answer.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="lg:pb-2">
              <div className="border-2 border-[color:var(--ink)] bg-[color:var(--paper)]">
                <div aria-hidden className={styles.pins} />
                <div className="space-y-4 px-6 py-6">
                  <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-base">
                    The Indian Society for Technical Education (ISTE) Student Chapter at GEC Wayanad is a
                    student-run platform that exists for one simple reason: to help you grow beyond the syllabus.
                  </p>
                  <dl className="grid grid-cols-2 gap-4 border-t border-[color:var(--rule)] pt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                    {[
                      ["Chapter code", "KE 091"],
                      ["Host", "GEC Wayanad"],
                      ["Open to", "All depts, all years"],
                      ["Runs on", "Members, year-round"],
                    ].map(([term, detail]) => (
                      <div key={term}>
                        <dt className="text-[color:var(--muted)]">{term}</dt>
                        <dd className="mt-1 text-[13px] normal-case tracking-normal text-[color:var(--ink)]">
                          {detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div aria-hidden className={styles.pins} />
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Silkscreen tape */}
      <div className="-mx-[5%] -rotate-1 bg-[color:var(--ink)] text-[color:var(--accent)]">
        <Marquee words={TAPE_WORDS} duration={36} />
      </div>

      {/* Activities as a circuit trace */}
      <Container>
        <div className="grid gap-12 border-b border-[color:var(--rule)] py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-16 lg:self-start">
            <h3 className="font-heading text-5xl uppercase leading-[0.9] sm:text-6xl">
              What ISTE
              <span className="block text-[color:var(--accent)]">actually does</span>
            </h3>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[color:var(--muted)]">
              ISTE isn’t a one-off event or a single workshop; it’s a year-round chapter that organises a mix of
              activities designed to build real, usable skills alongside your regular classes.
            </p>
          </Reveal>

          <ol className={`${styles.trace} text-[color:var(--accent)]`}>
            {ACTIVITIES.map((activity, index) => (
              <Reveal key={activity.title} y={12} delay={index * 0.04}>
                <li className="group relative flex items-start gap-4 pb-9 sm:gap-6">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-current bg-[color:var(--paper)] font-mono text-[11px] text-[color:var(--ink)] transition-colors duration-300 group-hover:bg-[color:var(--accent)] group-hover:text-[color:var(--paper)] sm:h-14 sm:w-14 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 pt-1.5 sm:pt-2.5">
                    <h4 className="font-heading text-2xl uppercase leading-none tracking-wide text-[color:var(--ink)] sm:text-3xl">
                      {activity.title}
                    </h4>
                    <p className="mt-2 max-w-xl text-base leading-[1.65] text-[color:var(--muted)] sm:text-lg">
                      {activity.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Photos as a datasheet spread */}
        <div className="grid gap-4 py-16 sm:grid-cols-2 sm:gap-6 sm:py-24">
          <Reveal>
            <ReportPhoto
              id="iste-1"
              alt="Students attending an ISTE session in a lecture hall"
              caption="Fig. 01: Session in progress"
              ratio="4 / 3"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ReportPhoto
              id="iste-2"
              alt="Students working at computers during an ISTE workshop"
              caption="Fig. 02: Hands-on workshop"
              ratio="4 / 3"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </Reveal>
        </div>

        {/* Module cards */}
        <div className="grid gap-8 border-t border-[color:var(--rule)] py-16 md:grid-cols-3 md:gap-6 md:py-24">
          {MODULES.map((module, index) => (
            <Reveal key={module.tag} delay={index * 0.08}>
              <div className="h-full border-2 border-[color:var(--ink)] bg-[color:var(--paper)]">
                <div aria-hidden className={styles.pins} />
                <div className="flex h-full flex-col px-6 py-7">
                  <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                    {module.tag}
                  </h4>
                  <p className="text-[15px] leading-[1.85] text-[color:var(--muted)]">{module.body}</p>
                </div>
                <div aria-hidden className={styles.pins} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Closing */}
      <div className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--paper)]">
        <Container className="relative">
          <div className="flex flex-col items-start gap-10 py-20 sm:flex-row sm:items-end sm:justify-between sm:py-28">
            <Reveal>
              <p className="max-w-xl font-serif text-2xl italic leading-[1.4] sm:text-3xl">
                Come for a single workshop, or stay to help run the chapter. ISTE is what you make of it.
              </p>
              <p className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[color:var(--accent)]">
                <span className="h-px w-10 bg-[color:var(--accent)]" />
                ISTE Student Chapter · GEC Wayanad
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Chip text="Build ✦ Learn ✦ Lead ✦ " center="KE 091" />
            </Reveal>
          </div>
        </Container>
      </div>
    </ReportSection>
  );
}
