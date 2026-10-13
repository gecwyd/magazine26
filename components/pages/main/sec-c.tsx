"use client"

import { motion, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { cn } from "@/lib/utils"

interface DignitaryItem {
  id: string
  name: string
  title: string
  message: string
  image: string
  initials: string
  category?: string
}

const DIGNITARIES: DignitaryItem[] = [
  {
    id: "vds",
    name: "Shri. V. D. Satheesan",
    title: "Chief Minister, Kerala",
    message: "Technical education empowers our youth to innovate and lead. The vibrant energy and creative spirit of Government Engineering College Wayanad are truly commendable.",
    image: resolveAsset("vds.webp"),
    initials: "VDS",
  },
  {
    id: "pg",
    name: "Smt. Priyanka Gandhi",
    title: "Member of Parliament, Wayanad",
    message: "The youth of Wayanad possess immense potential and passion. This magazine beautifully captures their dynamic energy, dedication, and aspirations for a brighter future.",
    image: resolveAsset("pyg.webp"),
    initials: "PG",
  },
  {
    id: "siddique",
    name: "Shri. T. Siddique",
    title: "MLA, Kalpetta",
    message: "It brings great pride to see the technical excellence of our students taking a creative form. This initiative is a testament to the vibrant community at GECW.",
    image: resolveAsset("siddique.webp"),
    initials: "TS",
  },
  {
    id: "usha",
    name: "Smt. Usha Vijayan",
    title: "MLA, Mananthavady",
    message: "Education and creative expression are the foundations of true progress. It is inspiring to see the students of Government Engineering College Wayanad channeling their talents into this wonderful magazine.",
    image: resolveAsset("usha.webp"),
    initials: "UV",
  },
  {
    id: "principal",
    name: "Dr. V. R. Rajeev",
    title: "Principal, GEC Wayanad",
    category: "Principal's Note",
    message: "True education extends beyond classrooms and laboratories into boundless imagination. This magazine stands as a powerful mirror to our students' intellect, artistic voice, and academic excellence.",
    image: resolveAsset("rajeev.webp"),
    initials: "VRR",
  },
  {
    id: "former_principal",
    name: "Dr. Pradeep V",
    title: "Former Principal, GEC Wayanad",
    category: "Former Principal's Note",
    message: "This magazine truly represents the technical and creative minds of a vibrant campus. I congratulate SATHVA , the students’ union, the faculty & staff advisors and the entire editorial board for this felicitous initiative.",
    image: resolveAsset("pradeep.webp"),
    initials: "PV",
  },
  {
    id: "anas_editorial",
    name: "Anas M. M.",
    title: "Staff Magazine Editor",
    category: "Staff Editor's Note",
    message: "‘Adrishya Samavakyam’ is an intuitive journey into the mysteries of the universe and time, making concepts like time dilation, quantum entanglement, and wormholes accessible alongside student creativity and shared memories. May it inspire curiosity and wonder in every reader.",
    image: resolveAsset("anas.webp"),
    initials: "AMM",
  },
  {
    id: "staff_advisor",
    name: "Dr. Brijmohan K",
    title: "Staff Advisor, Sathva College Union",
    category: "Staff Advisor's Note",
    message: "Guiding this creative pursuit has been an enriching experience. The depth of expression, critical thought, and passion poured into this magazine reflect the vibrant spirit of our students.",
    image: resolveAsset("brijmohan.webp"),
    initials: "BK",
  },
  {
    id: "editor",
    name: "Adhil Muhammed K",
    title: "Magazine Editor, Sathva College Union",
    category: "Editor's Note",
    message: "This magazine is a canvas of our collective stories, unyielding voices, and shared dreams. It stands as a testament to the creative resilience and vibrant spirit of every student at GEC Wayanad.",
    image: resolveAsset("adhil.webp"),
    initials: "AMK",
  },
]

function FeaturedCard({ item, index }: { item: DignitaryItem; index: number }) {
  const [imgError, setImgError] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative w-full flex flex-col md:flex-row overflow-hidden border-b border-black/10 last:border-b-0",
        index % 2 === 1 && "md:flex-row-reverse"
      )}
    >
      <div className="relative w-full md:w-[38%] lg:w-[35%] shrink-0 overflow-hidden bg-neutral-900" style={{ minHeight: "340px" }}>
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
            <span className="font-heading text-[5rem] text-white/10 tracking-widest uppercase select-none">{item.initials}</span>
          </div>
        )}
        <div className={cn(
          "absolute inset-0 pointer-events-none",
          index % 2 === 0
            ? "bg-gradient-to-r from-transparent from-[70%] to-[#d9d4c7] hidden md:block"
            : "bg-gradient-to-l from-transparent from-[70%] to-[#d9d4c7] hidden md:block"
        )} />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden bg-gradient-to-t from-black/60 to-transparent">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/70">
            {item.category ?? "Voices of Support"}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="hidden md:flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-black/40" />
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-black/50">
            {item.category ?? "Voices of Support"}
          </span>
        </div>

        <div
          aria-hidden
          className="font-serif text-[5rem] md:text-[7rem] leading-none text-black/10 -mb-4 md:-mb-6 select-none"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1 }}
        >
          &ldquo;
        </div>

        <blockquote
          className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] leading-[1.6] text-black/80 font-serif tracking-normal"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {item.message}
        </blockquote>

        <div className="flex items-center gap-4 my-8">
          <div className="w-12 h-[1.5px] bg-black/25" />
        </div>

        <div>
          <p className="font-heading text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest text-black leading-tight">
            {item.name}
          </p>
          <p className="text-[11px] md:text-xs font-mono uppercase tracking-[0.22em] text-black/50 mt-2">
            {item.title}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function SecC() {
  useEffect(() => {
    DIGNITARIES.forEach((item) => {
      preload(item.image, "image")
    })
  }, [])

  return (
    <section
      id="sec-c"
      className="relative w-full bg-[#d9d4c7] text-black z-20 overflow-hidden"
    >
      <motion.div
        className="relative z-10 w-full"
      >
        <div className="w-full px-6 md:px-16 pt-20 pb-12 md:pt-28 md:pb-16 border-b border-black/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end gap-4 md:gap-0 md:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-black/40 mb-3">Section II</p>
              <h2 className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black uppercase tracking-tight leading-[0.9] text-black">
                Voices &amp;<br />
                <span className="text-black/30">Greetings</span>
              </h2>
            </div>
            <p className="text-sm md:text-base font-serif text-black/55 max-w-xs leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
              Words of encouragement from those who believe in the power of young voices.
            </p>
          </div>
        </div>

        <div className="w-full">
          {DIGNITARIES.map((item, i) => (
            <FeaturedCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default SecC
