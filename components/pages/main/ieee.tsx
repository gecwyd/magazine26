"use client";

import { type CSSProperties } from "react";
import {
  Container,
  Kicker,
  Rail,
  ReportPhoto,
  ReportSection,
  Reveal,
  type ReportTone,
  type TimelineItem,
} from "@/components/ui/report-kit";
import styles from "./ieee.module.css";

const TONE: ReportTone = {
  paper: "#04141f",
  ink: "#e8f4fb",
  accent: "#4db8ff",
  muted: "#e8f4fbb0",
  rule: "#4db8ff30",
};

const PALETTE = { "--led": "#4dff9a", "--panel": "#071f2e" } as CSSProperties;

// Fill-color (not color) is made transparent so currentColor still paints the stroke.
const OUTLINE = "[-webkit-text-stroke:1.5px_currentColor] [-webkit-text-fill-color:transparent]";

const INTRO =
  "The IEEE Student Branch of Government Engineering College Wayanad (GECW) conducted and participated in various technical, creative, professional development, and student engagement activities during 2025, providing students with opportunities for technical learning, creativity, leadership, networking, and exposure to current industry trends.";

const CLOSING =
  "Through these diverse activities, the IEEE Student Branch of Government Engineering College Wayanad provided students with valuable opportunities for technical learning, creative expression, professional development, leadership, teamwork, networking, and practical exposure. The branch continued to encourage students to explore emerging technologies and participate actively in professional activities, contributing to their overall technical and professional growth.";

const NEXT_SIGNALS = ["Tinkering lab", "STEM programme", "MAPCON"];

const TICKER = [
  "SIGNAL",
  "CIRCUIT",
  "PROTOCOL",
  "FREQUENCY",
  "VOLTAGE",
  "NETWORK",
  "MODULATE",
  "TRANSMIT",
];

const EVENTS: TimelineItem[] = [
  {
    date: "8–9 Feb 2025",
    title: "TINK-HER-HACK 3.0",
    body: "On 8–9 February 2025, IEEE SB GECW and IEEE WIE GECW organised TINK-HER-HACK 3.0, an all-Kerala, beginner-friendly 20-hour women-focused hackathon at Government Engineering College Wayanad. The event provided participants with an opportunity to collaborate, develop innovative solutions, and gain hands-on experience in problem-solving and technology. More than 30 teams participated and developed 10+ projects addressing areas such as healthcare, sustainability, and education.",
  },
  {
    date: "18 Mar 2025",
    title: "WIE Logo Designing Competition",
    body: "The IEEE Women in Engineering (WIE) Affinity Group of GECW organised a Logo Designing Competition as part of IEEE WIE Week 2025 on the theme “Equality for All: Promoting Gender Equality and Inclusivity.” The online competition encouraged students to express their creativity while creating awareness about gender equality and inclusivity. The first, second, and third positions were secured by Linda Philomina, Bhavana Manoj, and Sreelakshmi P S, respectively.",
  },
  {
    date: "28 Mar 2025",
    title: "Meet the Leaders",
    body: "IEEE WIE GECW organised the “Meet the Leaders” programme as part of IEEE WIE Week 2025. The programme provided participants with an opportunity to interact with women leaders from IEEE, GBOT, SHE, and NSS and gain valuable insights into leadership and teamwork. The guest leaders shared their experiences and engaged with participants through an interactive panel discussion.",
  },
  {
    date: "30 Mar 2025",
    title: "Circuitry Unleashed 2.0",
    body: "IEEE SB GEC Barton Hill, in collaboration with IEEE AP-S and MTT-S SBCs GEC Wayanad, organised “Circuitry Unleashed 2.0”, an online workshop on LTSpice through Google Meet. The session, led by Anamika K Kamath, focused on analog circuit simulation and covered basic electronics concepts, LTSpice tools, AC and transient analysis, and practical simulations of integrator, amplifier, and oscillator circuits.",
  },
  {
    date: "23–28 Jun 2025",
    title: "Essay Writing Competition",
    body: "The WIE Affinity Group conducted an Essay Writing Competition as part of International Women in Engineering Day celebrations on the topic “Pioneering Safe Cyberspace: Bridging Technology and Light for Security.” The programme encouraged students to explore cybersecurity, safer technology, and the future of cyberspace. Adil Abu, a fourth-year ECE student of GECW, secured the first position.",
  },
  {
    date: "28 Jun 2025",
    title: "Placement Prep",
    body: "The IEEE Student Branch COET, in collaboration with IEEE Student Branch GEC Wayanad, organised an online placement-oriented session titled “Placement Prep: From Paper to Placement.” The session was handled by Cerin Sara Santhosh, Software Developer at IBM, and focused on resume building, aptitude preparation, interview skills, and the importance of community involvement, helping students improve their placement readiness.",
  },
  {
    date: "3 Aug 2025",
    title: "BATTLEGROUND",
    body: "IEEE Student Branch GEC Wayanad, in collaboration with Xora Studios, organised “BATTLEGROUND: Game Development Workshop” at Government Engineering College Wayanad. Led by Ujwel C, the workshop introduced students to the fundamentals of game development, coding, creativity, and game design, with active participation from students.",
  },
  {
    date: "9 Aug 2025",
    title: "UI & UX Design Workshop",
    body: "The branch conducted a UI & UX Design Workshop, introducing students to the fundamentals of user interface and user experience design and their importance in developing user-friendly digital products. Nafih Hassan and Lulu Naas led the session and shared insights on design principles, user research, wireframing, prototyping, industry practices, and career opportunities in UI/UX design.",
  },
  {
    date: "12 Aug 2025",
    title: "Member meeting",
    body: "An IEEE-related member meeting was conducted with the participation of both Chairs, Chapter Advisor Anu Mohamad, and 17 members. The meeting focused on ongoing activities and upcoming programmes, including the STEM programme, establishment of a tinkering lab, future online sessions, MAPCON participation, and the introduction of new MTT-S members.",
  },
  {
    date: "31 Aug 2025",
    title: "Cognitive Insights: Season 3",
    body: "The IEEE Malabar Subsection, in collaboration with IEEE Student Branch GEC Wayanad, organised the fifth episode of “Cognitive Insights: Season 3”, titled “ML Driven Digital Twin Framework for Signalized Intersection.” The session was delivered by Dr. Munavar Fairooz, Assistant Professor at NIT Calicut, and covered the use of machine learning and digital twin technology for studying traffic patterns and improving signalized intersections.",
  },
  {
    date: "18 Oct 2025",
    title: "RF and Microwave Opportunities",
    body: "IEEE AP-S & MTT-S SBCs GEC Wayanad, in collaboration with IEEE AP-S and IEEE MTT-S GEC Barton Hill, organised “Shaping the Future with RF and Microwave Opportunities” through Google Meet. The session was led by Dr. Apren T J, former RF & Avionics Division Head at VSSC ISRO and President of SFO Tech, RF Division, and was attended by 52 students. The session covered RF and Microwave engineering, industry opportunities, testing and certification, AI applications, chip-level technologies, and Design for Testing.",
  },
  {
    date: "18 Oct 2025",
    title: "ALPHA 25",
    body: "The IEEE Student Branch GEC Wayanad organised ALPHA 25: “Invoke: Begin Your IEEE Journey,” led by Farshan Yoosuf, IEEE LINK Team Member (2023). The session introduced students to IEEE, its opportunities, technical growth, networking, and leadership, motivating students to actively participate in IEEE activities.",
  },
  {
    date: "2 Dec 2025",
    title: "Member meeting",
    body: "An IEEE member meeting was conducted with both Chairs, Advisor Sinith Sir, and 16 members. The meeting included an interaction session for new members and discussions on upcoming events, including a programme on Audio Processing Using Artificial Intelligence and preparations for the MAPCON event.",
  },
  {
    date: "5 Dec 2025",
    title: "Emotional Intelligence",
    body: "MTT-S GEC Wayanad organised “Engineering the Brain of Engineers: An Emotional Intelligence Approach” through Google Meet. The session was led by Dr. Sujatha Gupta Kedar, Associate Professor and Head of the Department of Human Development, Mount Carmel College, Bangalore, and was attended by 41 participants. The session focused on emotional intelligence, communication, teamwork, leadership, adaptability, self-awareness, self-regulation, decision-making, and relationship management.",
  },
  {
    date: "9 Dec 2025",
    title: "Story of Radiation",
    body: "IEEE AP-S & MTT-S GEC Wayanad organised a lecture titled “Story of Radiation” through Google Meet. The session was led by Dr. Deepti Das Krishna, Associate Professor at CUSAT, and was attended by 43 students. The lecture covered electromagnetic theory, Maxwell’s equations, electromagnetic waves, radiation principles, wireless communication, and antenna technology, followed by an interactive doubt-clearing session.",
  },
  {
    date: "19–21 Dec 2025",
    title: "AKCSSC 2025",
    body: "The IEEE Computer Society Kerala Chapter organised AKCSSC 2025 (All Kerala Computer Society Student Convention) at Government Engineering College Wayanad. The three-day convention featured technical workshops on Generative AI, DevOps, and Cybersecurity, along with leadership sessions, an industry visit, trekking, cultural night, fireside chat, and various activities, providing students with opportunities for technical learning, networking, leadership, and community engagement.",
  },
  {
    date: "11 Mar 2026",
    title: "Applied Field Theory",
    body: "IEEE AP-S & MTT-S SBC GEC Wayanad, in collaboration with IEEE AP-S & MTT-S SBC GEC Barton Hill and the IEEE AP-S, IEEE EMC & IEEE MTT-S Kerala Section, organised a lecture titled “Simulation-Driven Analysis in Applied Field Theory: Methods and Applications” through Google Meet. The session was led by Swapnil Gaul, Founder of NUMEREGION (TaraNG) and Quest EdTech, and introduced participants to modern electromagnetic simulation techniques, solver methods, optimization approaches, and applications in antenna design, RFIC/MMIC design, and GPR systems.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Oscilloscope trace: a marching-dash sine path, drawn once in currentColor. */
function Waveform({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path
        className={styles.wave}
        d="M0 100 Q 40 20, 80 100 T 160 100 T 240 100 Q 280 180, 320 100 T 400 100 T 480 100 Q 520 20, 560 100 T 640 100 T 720 100 Q 760 180, 800 100"
      />
    </svg>
  );
}

/** HUD corner bracket, matching the viewfinder motif used across club sections. */
function Bracket({ pos }: { pos: string }) {
  return <span aria-hidden className={`absolute h-8 w-8 border-[color:var(--accent)] sm:h-12 sm:w-12 ${pos}`} />;
}

/** Scrolling technical-term ticker framed by signal nodes. */
function Ticker({ words, reverse = false, duration = 30 }: { words: string[]; reverse?: boolean; duration?: number }) {
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={`${styles.track} ${reverse ? styles.reverse : ""} flex min-w-full shrink-0 items-center justify-around gap-8 pr-8`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-8 font-mono text-sm uppercase tracking-[0.4em] sm:text-base">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
          {word}
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4">
      {track(false)}
      {track(true)}
    </div>
  );
}

/** A single node on the signal log: pulsing dot connected to the vertical trace. */
function Node({ active = false }: { active?: boolean }) {
  return (
    <span aria-hidden className="relative flex h-3 w-3 shrink-0 items-center justify-center">
      {active && <span className={`${styles.ping} absolute h-3 w-3 rounded-full bg-[color:var(--led)]`} />}
      <span
        className={`relative h-2 w-2 rounded-full ${active ? "bg-[color:var(--led)]" : "bg-[color:var(--accent)]"}`}
      />
    </span>
  );
}

/** Event timeline styled as a live signal / commit log running down a circuit trace. */
function SignalLog({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l-2 border-[color:var(--rule)] pl-8 sm:pl-12">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.date}-${index}`} className="relative pb-10 last:pb-0 sm:pb-14">
            <span className="absolute -left-[calc(2rem+1px)] top-1.5 sm:-left-[calc(3rem+1px)]">
              <Node active={isLast} />
            </span>
            <Reveal y={14}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
                <span>EVT-{pad(index + 1)}</span>
                <span className="text-[color:var(--muted)]">{item.date}</span>
              </div>
              {item.title && (
                <h4 className="mb-2 mt-2 font-heading text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                  {item.title}
                </h4>
              )}
              <p className="max-w-3xl text-[15px] leading-[1.8] text-[color:var(--muted)] sm:text-base">
                {item.body}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

/** Photo mounted like a PCB module: silkscreen corners + a component-style caption. */
function Module({
  id,
  alt,
  caption,
  designator,
  delay = 0,
}: {
  id: Parameters<typeof ReportPhoto>[0]["id"];
  alt: string;
  caption: string;
  designator: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative border border-[color:var(--rule)] bg-[color:var(--panel)] p-2">
        <span aria-hidden className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] opacity-60" />
        <span aria-hidden className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] opacity-60" />
        <span aria-hidden className="absolute bottom-1 left-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] opacity-60" />
        <span aria-hidden className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] opacity-60" />
        <ReportPhoto id={id} alt={alt} sizes="(max-width: 768px) 50vw, 25vw" />
        <div className="mt-2 flex items-baseline justify-between gap-2 px-1 pb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
          <span className="text-[color:var(--accent)]">{designator}</span>
          <span className="truncate text-right">{caption}</span>
        </div>
      </div>
    </Reveal>
  );
}

const MODULES: { id: Parameters<typeof ReportPhoto>[0]["id"]; alt: string; caption: string; designator: string }[] = [
  { id: "ieee-alpha25", alt: "ALPHA 25 poster with Farshan Yoosuf", caption: "ALPHA’25", designator: "U1" },
  {
    id: "ieee-akcssc-workshop",
    alt: "AKCSSC 2025 workshop poster on workflows and agentic AI",
    caption: "AKCSSC · Workshop",
    designator: "U2",
  },
  {
    id: "ieee-akcssc-complete",
    alt: "AKCSSC 2025 successfully completed poster",
    caption: "AKCSSC 2025",
    designator: "U3",
  },
  {
    id: "ieee-tinkerhack",
    alt: "Participants of Tink-Her-Hack 3.0 gathered behind an IEEE banner",
    caption: "Tink-Her-Hack 3.0",
    designator: "U4",
  },
];

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-[color:var(--rule)] pt-4">
      <p className="font-heading text-5xl leading-none text-[color:var(--accent)] sm:text-6xl">{value}</p>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{label}</p>
    </div>
  );
}

export function Ieee() {
  const span = `${EVENTS[0].date.split(" ").slice(-2).join(" ")} to ${EVENTS[EVENTS.length - 1].date.split(" ").slice(-2).join(" ")}`;

  return (
    <ReportSection id="sec-ieee" tone={TONE}>
      <div style={PALETTE}>
        {/* Faint circuit grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#4db8ff 1px, transparent 1px), linear-gradient(90deg, #4db8ff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div aria-hidden className={styles.grain} />

        <Container className="relative">
          <Rail left="IEEE Student Branch" right="Clubs & Activities / 06" />
        </Container>

        {/* Hero: an oscilloscope readout */}
        <div className="relative overflow-hidden">
          <div aria-hidden className={styles.scan} />

          <Waveform className="pointer-events-none absolute inset-x-0 top-8 h-40 w-full text-[color:var(--accent)] opacity-[0.14] sm:top-4 sm:h-56" />

          <div aria-hidden className="pointer-events-none absolute inset-3 z-20 sm:inset-6">
            <Bracket pos="left-0 top-0 border-l-2 border-t-2" />
            <Bracket pos="right-0 top-0 border-r-2 border-t-2" />
            <Bracket pos="bottom-0 left-0 border-b-2 border-l-2" />
            <Bracket pos="bottom-0 right-0 border-b-2 border-r-2" />
            <div className="absolute left-4 top-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)] sm:left-16 sm:top-5">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--led)]" />
              Signal locked
            </div>
            <div className="absolute right-4 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:right-16 sm:top-5">
              GECW · Kerala Section
            </div>
            <div className="absolute bottom-3 left-4 hidden font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:bottom-5 sm:left-16 sm:block">
              CH 06 · Student Branch
            </div>
            <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:bottom-5 sm:right-16">
              {EVENTS.length} events logged
            </div>
          </div>

          <Container className="relative z-10">
            <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-24">
              <Reveal>
                <Kicker>Student Branch · GECW</Kicker>
                <h2 className="font-heading uppercase leading-[0.75] tracking-[-0.01em]">
                  <span className="block text-[clamp(7rem,22vw,19rem)]">
                    IE<span className={OUTLINE}>EE</span>
                  </span>
                </h2>
                <p className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
                  <span className="h-px w-10 bg-[color:var(--accent)]" />
                  {span} · Technical &amp; Professional Activities
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[15px] leading-[1.85] text-[color:var(--muted)] sm:text-lg">{INTRO}</p>
              </Reveal>
            </div>
          </Container>
        </div>

        {/* Ticker */}
        <div className="border-y border-[color:var(--rule)] bg-[color:var(--panel)] text-[color:var(--accent)]">
          <Ticker words={TICKER} duration={32} />
        </div>

        {/* Stat readout */}
        <Container>
          <div className="grid grid-cols-2 gap-6 py-16 sm:py-20 md:grid-cols-4">
            <StatBlock value={String(EVENTS.length)} label="Programmes logged" />
            <StatBlock value="2025–26" label="Reporting cycle" />
            <StatBlock value="WIE · AP-S · MTT-S" label="Affinity groups & chapters" />
            <StatBlock value="GECW" label="Home node" />
          </div>
        </Container>

        {/* PCB module grid */}
        <Container>
          <div className="grid grid-cols-2 items-start gap-3 pb-16 sm:gap-5 md:grid-cols-4 sm:pb-24">
            {MODULES.map((mod, index) => (
              <Module key={mod.id} {...mod} delay={index * 0.07} />
            ))}
          </div>
        </Container>

        {/* Signal log */}
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10">
            <h3 className="font-heading text-[clamp(3.5rem,10vw,7rem)] uppercase leading-[0.85]">
              Signal<span className={`block ${OUTLINE}`}>Log</span>
            </h3>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[color:var(--muted)]">
              Every transmission the branch sent out this cycle, timestamped.
            </p>
          </Reveal>
          <SignalLog items={EVENTS} />
        </Container>

        {/* Closing transmission panel */}
        <Container>
          <div className="grid gap-16 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <Reveal>
              <div className="border border-[color:var(--rule)] bg-[color:var(--panel)]">
                <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--muted)] sm:px-8">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--led)]" />
                    Transmission
                  </span>
                  <span>
                    End<span className={`${styles.cursor} ml-1`}>_</span>
                  </span>
                </div>
                <div className="p-5 sm:p-8">
                  <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                    Closing notes
                  </p>
                  <p className="font-serif text-xl leading-[1.75] sm:text-2xl">{CLOSING}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col justify-center">
              <p className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-[color:var(--accent)]">
                <span className="h-px w-8 bg-[color:var(--accent)]" />
                Next signals
              </p>
              <ul className="flex flex-wrap gap-3">
                {NEXT_SIGNALS.map((item) => (
                  <li
                    key={item}
                    className="border border-[color:var(--rule)] px-4 py-2 font-heading text-xl uppercase leading-none tracking-wide sm:text-2xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>

        {/* End of transmission */}
        <div className="relative h-[clamp(7rem,20vw,14rem)] overflow-hidden border-t border-[color:var(--rule)]">
          <span
            aria-hidden
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.85] ${OUTLINE}`}
          >
            End of Transmission
          </span>
        </div>
      </div>
    </ReportSection>
  );
}
