"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const CHIP_PARTS = [
  {
    title: "The Odyssey Begins",
    text: "India is achieving revolutionary achievements in the field of semiconductor research and manufacturing day by day. We are going to witness our indigenous chip revolution, which is developed and backed by our prestigious initiative, the India Semiconductor Mission – ISM.",
    image: resolveAsset("chip-1.png")
  },
  {
    title: "Monumental Facilities",
    text: "Prime Minister Shri Narendra Modi has been highly involved in accelerating this transition, actively launching projects to position India as a trusted partner in the global supply chain. The Prime Minister has personally inaugurated monumental facilities, including Micron Technology's Semiconductor Assembly, Test and Packaging (ATMP) facility, and the Kaynes Semicon Plant in Sanand, Gujarat.",
    image: resolveAsset("chip-2.png")
  },
  {
    title: "The Progress",
    text: "It all began with the realisation that silicon is the new oil. The development of modern society will boost only by electronic and tech self-reliance. At the infant stage, India was heavily reliant on imports. But today, the nation is steadily emerging as a global semiconductor hub, with the domestic market expected to reach $100–110 billion by 2030.",
    image: resolveAsset("chip-3.png")
  },
  {
    title: "Era of Giants",
    text: "Before acquiring massive fabrication capabilities, India initially specialized in chip design and verification. But then the era of giants and precise manufacturing came. Under the India Semiconductor Mission, the government has recently approved 12 massive semiconductor manufacturing projects, carrying an investment pipeline of nearly Rs 1.64 lakh crore. These include silicon fabrication units, compound semiconductor fabs, and advanced packaging units across multiple states.",
    image: resolveAsset("chip-4.png")
  },
  {
    title: "ISM 2.0",
    text: "Following the initial phase, we are now entering ISM 2.0. The Expenditure Finance Committee (EFC) has approved a massive outlay of approximately Rs 1.20 lakh crore to expand the mission. This updated version is more powerful, focusing not just on fabrication but on the entire ecosystem: producing semiconductor equipment, raw materials, and developing full-stack Indian intellectual property. The Union Budget 2026–27 has made a provision of Rs. 1,000 crore specifically for ISM 2.0, emphasizing industry-led research and training.",
    image: resolveAsset("chip-5.png")
  },
  {
    title: "Opportunities",
    text: "For engineering aspirants looking to contribute to this booming industry, several organisations and government portals offer hands-on training:\n\n• Semi-Conductor Laboratory (SCL): Located in Punjab, SCL offers project work and internships to engineering students in fields like Microelectronics and Semiconductor Physics.\n\n• NMOS Systems & Semiconductors Ltd: Accepts final-semester engineering interns for specialized training in Semiconductor/Embedded design and ASIC Verification.\n\n• ISM UNIV: Provides 45-hour free internship training programs focusing on practical, project-based Embedded System Development.",
    image: resolveAsset("chip-1.png")
  },
  {
    title: "Conclusion",
    text: "In concluding this article, it is important to remember the profound impact this tiny technology holds. As engineering aspirants, we should stay focused and inspired by this journey, and work towards contributing to the future of India's semiconductor self-reliance.",
    image: resolveAsset("chip-2.png")
  }
];

const QUOTES = [
  { text: "Hardware is the bone... semiconductor is the brain... software is the wisdom... data is the knowledge.", author: "Masayoshi Son" },
  { text: "No product is more central to international trade than semiconductors.", author: "Chris Miller" },
  { text: "Real men have fabs.", author: "Jerry Sanders" }
];

export function ChipHappens() {
  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      ref={containerRef}
      id="sec-chip-happens"
      className="relative w-full bg-[#050505] text-[#fafafa] font-sans selection:bg-white selection:text-black"
    >
      {/* Editorial Intro */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 pt-32 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase mb-12">
            Editorial / Industry
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-medium tracking-tighter leading-[0.9] text-white mb-16">
            CHIP<br/>HAPPENS
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            <div>
              <p className="text-2xl md:text-3xl font-light leading-snug text-white/90">
                The evolution of India's semiconductor odyssey and the monumental shift towards technological self-reliance.
              </p>
            </div>
            <div className="flex items-end md:justify-end gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden grayscale relative">
                <Image src={resolveAsset("chip-author.png")} alt="Muhammed Mashhood K" fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Muhammed Mashhood K</p>
                <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase mt-1">
                  1st Year · ECE
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sections */}
      <div className="w-full">
        {CHIP_PARTS.map((part, index) => (
          <div key={index} className={`min-h-screen flex flex-col lg:flex-row items-center ${index === 0 ? '-mt-20' : ''}`}>
            {/* Left: Text Content */}
            <div className={`w-full lg:w-1/2 px-6 md:px-16 lg:px-32 ${index === 0 ? 'pt-0 pb-12' : 'py-12'} lg:py-0`}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-sm tracking-[0.2em] text-white/20 mb-8 block">
                  0{index + 1}
                </span>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                  {part.title}
                </h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-white/60 whitespace-pre-line">
                  {part.text}
                </p>
              </motion.div>
            </div>
            
            {/* Right: Minimal Image Reveal */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden bg-[#0a0a0a]">
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image 
                  src={part.image} 
                  alt={part.title} 
                  fill 
                  className="object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" 
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Quotes Section */}
      <div className="px-6 md:px-16 lg:px-32 py-32 md:py-48 bg-[#020202]">
        <div className="max-w-4xl mx-auto space-y-32">
          {QUOTES.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h4 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-snug text-white/90 italic mb-8">
                "{quote.text}"
              </h4>
              <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
                {quote.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
