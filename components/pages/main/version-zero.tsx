"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const DIARY_SENTENCES = [
  "ജീവിതം എന്നെ പേഴ്സണെലി അറിയുന്നുണ്ടെന്ന് എനിക്ക് സംശയമുണ്ട്.",
  "ഇങ്ങനെ പറഞ്ഞുകൊണ്ടാണ് അവൾ ഡയറി എഴുതാൻ ആരംഭിച്ചത്.",
  "രാവിലെ എഴുന്നേറ്റപ്പോൾ ഒന്നു പ്രാഡക്ടീവ് ആവാമെന്ന് കരുതിയതാണ്.",
  "എതിർ ദിശയിൽ അതു മുടങ്ങാനുള്ള പണിവരുമെന്ന് കരുതിയില്ല.",
  "ചായകുടിക്കാൻ പോയപ്പോൾ ചായ തണുത്തിരുന്നു.",
  "മൊബൈൽ ചാർജ് ചെയ്യാൻ വച്ചപ്പോൾ കറണ്ട് പോയി.",
  "പഠിക്കാൻ ഇരുന്നപ്പോൾ ഉറക്കം വന്നു.",
  "ഉറങ്ങാൻ കിടന്നപ്പോൾ ചിന്തകൾ വന്നു.",
  "എല്ലാവർക്കും ഇങ്ങനെ തന്നെ ആവുമല്ലേ.",
  "എഴുന്നേറ്റശേഷം എന്തോ ചെയ്യാനുണ്ടെന്ന് തോന്നി.",
  "എന്താണെന്ന് ഓർക്കാൻ ശ്രമിച്ചപ്പോൾ അതും മറന്നു.",
  "മൊബൈൽ എടുത്തു.",
  "അഞ്ചു മിനുട്ട് മാത്രം നോക്കാമെന്ന് വിചാരിച്ചതാണ്.",
  "അടുത്ത് സമയം നോക്കിയപ്പോൾ ഒരു മണിക്കൂർ കഴിഞ്ഞിരുന്നു.",
  "സമയം പോകുന്ന വേഗം കണ്ടാൽ തോന്നും, എൻ്റെ ജീവിതം മുന്നോട്ട് പോകുന്നത് ഒഴിച്ചാൽ ബാക്കിയുള്ളതെല്ലാം 'ഫാസ്റ്റ് ഫോർവേഡ് ' ആണെന്ന്.",
  "എല്ലാവരുടേയും ജീവിതം ഓടുന്നുണ്ട്, ശരിയായ ട്രാക്കിൽ.",
  "എന്നാൽ എൻ്റെ ട്രാക്ക് പ്രത്യക്ഷമാകുന്നതു വരെ കാത്തിരിക്കണമെന്നാവും മുകളിൽനിന്ന് മുപ്പരുടെ നിശ്ചയം.",
  "അങ്ങനെ അതും ഒരു വശത്ത്.",
  "മറ്റുള്ളവരുടെ ജീവിതം നോക്കുമ്പോൾ എല്ലാം പെർഫക്ട് ആയി പോകുന്നതുപോലെ തോന്നും.",
  "സ്വന്തം ജീവിതം നോക്കുമ്പോൾ മാത്രം 'ബിഹൈൻഡ് ദി സീൻസ് വെർഷൻ' കാണാൻ കിട്ടും.",
  "അങ്ങനെ ചിന്തിച്ചു കൂട്ടി ഈ ദിവസവും കടന്നുപോയി എഴുത്തുനിർത്തി അവൾ എഴുന്നേറ്റു 'ഹലോ? കെ. എസ്. സി. ബി അല്ലേ?'"
];

export function VersionZero() {
  return (
    <section
      id="sec-k"
      aria-labelledby="version-zero-title"
      className="w-full bg-[#d9d4c7] text-[#191713] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
        <article className="mt-16 sm:mt-24 lg:mt-32 max-w-5xl mx-auto pb-24 sm:pb-32">
          <header className="mb-20 md:mb-28">
            <h2
              id="version-zero-title"
              className="font-heading text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9.5vw] leading-[0.8] tracking-[-0.02em] text-[#191713]"
            >
              VERSION
              <br />
              <span className="relative inline-block text-[#a84e2a]">
                ZERO.
                <div
                  className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[3px] md:h-1 bg-[#a84e2a] origin-left rounded-full"
                />
              </span>
            </h2>

            <div
              className="mt-16 sm:mt-24 border-t border-[#191713]/20 pt-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full grayscale mix-blend-multiply opacity-80">
                    <Image
                      src={resolveAsset("sefana-elizabeth.png")}
                      alt="Author portrait of Zephanah Elizabeth"
                      fill
                      sizes="128px"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a84e2a] mb-3">
                      Written by
                    </span>
                    <span className="font-sans text-3xl sm:text-5xl tracking-tight text-[#191713] leading-none mb-4">
                      Zephanah Elizabeth
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-[#191713]/50">
                      ECE · First year
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Artwork */}
            <div
              className="mt-16 mb-16 relative w-full max-w-lg mx-auto aspect-[912/988] overflow-hidden"
            >
              <Image
                src={resolveAsset("version-zero-art.webp")}
                alt="Illustration of student at desk"
                fill
                className="object-cover object-top mix-blend-multiply opacity-90"
                unoptimized
              />
            </div>
          </header>

          <div className="relative pl-6 md:pl-10">
             <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#191713]/0 via-[#191713]/15 to-[#191713]/0" />
             
             <p className="font-sans text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] leading-[1.6] md:leading-[1.7] tracking-tight text-[#191713]" lang="ml">
                {DIARY_SENTENCES.map((sentence, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0.18 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-20% 0px -20% 0px", once: false, amount: "all" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {sentence}{" "}
                  </motion.span>
                ))}
             </p>
          </div>
        </article>
      </div>

      <footer className="w-full border-t border-[#191713]/10">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#191713]/40 sm:flex-row sm:items-center sm:justify-between sm:text-[9px]">
          <span>Author · Zephanah Elizabeth</span>
        </div>
      </footer>
    </section>
  );
}

export default VersionZero;
