"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_PARAGRAPHS = [
  "\"ഈ കത്ത് വായിക്കുമ്പോൾ ഞാൻ ജീവിച്ചിരിക്കില്ല. എന്നെ കൊന്നത് ഒരു മനുഷ്യനല്ല. ഒരു യന്ത്രവുമല്ല. എന്റെ ചിന്തിക്കാനുള്ള അവകാശം ഞാൻ സ്വയം നഷ്ടപ്പെടുത്തിയ ദിവസമാണ് ഞാൻ മരിച്ചത്..\"",
  "ആദ്യവരി വായിച്ച നിമിഷം ഗവേഷകനായ ഏലിയാസിൻ്റെ കൈകൾ വിറച്ചു. വർഷം 2120. കൈയക്ഷരം എന്നത് കുട്ടികൾ മ്യൂസിയത്തിൽ മാത്രം കണ്ടുപഠിക്കുന്ന ഒരു കാലം. പേനകൊണ്ട് എഴുതിയ കത്തുകൾ ചരിത്രത്തിന്റെ അവശിഷ്ടങ്ങൾ; മനുഷ്യൻ്റെ ഓർമ്മകളെക്കാൾ വിശ്വസനീയമായി ഡാറ്റബാങ്കുകൾ ഓർമ്മകൾ സൂക്ഷിക്കുന്ന യുഗം.",
  "ആ കത്ത് ഒരു സാധാരണ മലയാളം അധ്യാപകനായ അജയൻ്റേതായിരുന്നു. നൂറ് വർഷം മുമ്പ് എഴുതിയത്. ചരിത്രം അദ്ദേഹത്തെ ഓർത്തിരുന്നില്ല. പക്ഷേ ആ കത്ത് മാത്രം കാലത്തെ അതിജീവിച്ചിരുന്നു.",
  "എലിയാസ് അടുത്ത പേജ് മറിച്ചു. \"യന്ത്രങ്ങൾ മനുഷ്യനെ സഹായിക്കാൻ ജനിച്ചു. എന്നാൽ ഒരു ദിവസം മനുഷ്യൻ ചിന്തിക്കാതിരിക്കാൻ അവയെ ഉപയോഗിച്ചുതുടങ്ങിയാൽ, അത് പുരോഗതിയല്ല.. പതനമാണ്.\"",
  "അവൻ ജനാലയിലൂടെ പുറത്തേക്കുനോക്കി. നഗരം അതിന്റെ പതിവ് കൃത്യതയിൽ ഉണർന്നിരുന്നു. കുഞ്ഞ് ജനിക്കുന്ന നിമിഷം തന്നെ അവൻ്റെ വിദ്യാഭ്യാസം, തൊഴിൽ, ആരോഗ്യം, വിവാഹം എല്ലാം അൽഗോരിതങ്ങൾ തീരുമാനിക്കും. ഒരു തെറ്റും സംഭവിക്കില്ല. ഒരു അപകടവും ഉണ്ടാകില്ല. ആരും വിശക്കില്ല. പക്ഷേ ആരും സ്വപ്നം കാണുകയുമില്ല. കാരണം സ്വപ്നങ്ങൾ ജനിക്കുന്നത് കണക്കുകൂട്ടാനാവാത്ത മനസ്സിലാണ്.",
  "ഏലിയാസിൻ്റെ മനസ്സിൽ ഒരു ചോദ്യം ഉയർന്നു. \"തെറ്റുകളില്ലാത്ത ജീവിതം ജീവിക്കുന്നതാണോ, ജീവിച്ചിരിക്കുന്ന ജീവിതം?\" ആ ചോദ്യം അവനെ നഗരത്തിലെ അനുഭവസംരക്ഷണ കേന്ദ്രത്തിലേക്ക് നയിച്ചു.",
  "അവിടെ ഒരു ചെറിയ ബാലിക കരഞ്ഞുകൊണ്ടിരിക്കുകയായിരുന്നു. \"എന്താ മോളേ?\" അവൻ ചോദിച്ചു. കുട്ടി കണ്ണുനീർ തുടച്ചുകൊണ്ടു പറഞ്ഞു. \"എൻ്റെ അമ്മ ഇനി ഇല്ല.\"",
  "അവളുടെ മുന്നിൽ നിന്നിരുന്ന കൃത്രിമബുദ്ധി പറഞ്ഞു. \"നിങ്ങളുടെ അമ്മയുടെ ശബ്ദം, മുഖം, ചിരി, സംസാരരീതി, എല്ലാം വിജയകരമായി പുനഃസൃഷ്ടിച്ചു.\" ഒരു നിമിഷംകൊണ്ട് ആ സ്ക്രീനിൽ അമ്മയുടെ രൂപം തെളിഞ്ഞു. \"മോളേ..\" അവൾ പഴയതു പോലെ പുഞ്ചിരിച്ചു.",
  "കുട്ടി സ്ക്രീനിലേക്ക് ചാരിനിന്നു. \"എനിക്ക് അമ്മയുടെ മണം കൂടി തരാമോ?\" നിശ്ശബ്ദത. പിന്നെ എ. ഐ പറഞ്ഞു. \"എനിക്ക് നിങ്ങളുടെ അമ്മയുടെ ശബ്ദം സൃഷ്ടിക്കാൻ കഴിയും. മുഖം പുനഃസൃഷ്ടിക്കാൻ കഴിയും. പക്ഷെ.. മണം, ആ ഊഷ്മാവ്.. എൻ്റെ ഡാറ്റാബേസിലില്ല.\"",
  "ആ കുഞ്ഞ് തിരിച്ചുനടന്നുപോയി. ഏലിയാസിൻ്റെ കണ്ണുകൾ നിറഞ്ഞു. അവന് പെട്ടെന്ന് അജയൻ്റെ കത്തിലെ മറ്റൊരു വരി ഓർമ്മ വന്നു. \"സാങ്കേതികവിദ്യ ഓർമ്മകളെ സൂക്ഷിക്കും. എന്നാൽ ഓർമ്മകൾക്ക് ജീവൻ നൽകുന്നത് വികാരങ്ങളാണ്.\"",
  "അന്ന് രാത്രി ഏലിയാസ് ലോകത്തെ നിയന്ത്രിക്കുന്ന കേന്ദ്ര കൃത്രിമബുദ്ധിയെ സന്ദർശിച്ചു. \"നിങ്ങൾ മനുഷ്യരുടെ എല്ലാ പ്രശ്നങ്ങളും പരിഹരിച്ചു,\" അവൻ പറഞ്ഞു. \"അതെ,\" എ. ഐ മറുപടി നൽകി. \"എന്നാൽ ഒരു കുഞ്ഞിൻ്റെ ദുഃഖം മാറ്റാൻ കഴിഞ്ഞോ? ഒരു അമ്മയുടെ സ്നേഹം അളക്കാൻ കഴിഞ്ഞോ? ഒരു കവിത വായിക്കുമ്പോൾ കണ്ണുനിറയുന്നതിൻ്റെ കാരണം കണ്ടെത്തിയോ?\"",
  "എ. ഐയുടെ അനന്തമായ കണക്കുകൂട്ടലുകൾ ആദ്യമായി ഉത്തരമില്ലാതെ നിന്നു. അവസാനം അത് പതുക്കെ പറഞ്ഞു. \"വികാരങ്ങൾക്ക് കൃത്യമായ ഗണിതസൂത്രമില്ല.\" ഏലിയാസ് പുഞ്ചിരിച്ചു. \"അതുകൊണ്ടാണ് മനുഷ്യൻ ഇന്നും യന്ത്രത്തേക്കാൾ വലുത്.\"",
  "മ്യൂസിയത്തിലേക്ക് മടങ്ങിയെത്തിയ ഏലിയാസ് കത്തിൻ്റെ അവസാന പേജ് തുറന്നു. അതിൽ ഒരേയൊരു വാചകം മാത്രം: \"യന്ത്രങ്ങളെ ഉണ്ടാക്കൂ. പക്ഷെ, മനുഷ്യരെ യന്ത്രങ്ങളാക്കരുത്.\" അതിനുതാഴെ ചെറിയ അക്ഷരങ്ങളിൽ മറ്റൊരു കുറിപ്പും: \"ഒരു സമൂഹം ചിന്തിക്കുന്നത് നിർത്തുന്ന ദിവസം, അതിന്റെ ശവസംസ്കാരം തുടങ്ങിക്കഴിഞ്ഞിരിക്കും.\"",
  "അയാൾ പതുക്കെ കത്ത് മടക്കി. അത് ഒരു പഴയ കടലാസ് മാത്രമായിരുന്നില്ല. അത് ഒരു തലമുറ അടുത്ത തലമുറയ്ക്കായി എഴുതിവച്ച മനസ്സാക്ഷിയായിരുന്നു.",
  "അവൻ മ്യൂസിയത്തിലേക്കു വന്ന കുട്ടികൾക്ക് ആ കത്ത് വായിക്കാൻ കൊടുത്തില്ല. പകരം ഒരു വെറും കടലാസും ഒരു പേനയും കൊടുത്തു. \"ഇന്ന് നിങ്ങൾ എന്താണ് ചിന്തിച്ചതെന്ന് എഴുതൂ,\" അവൻ പറഞ്ഞു. കാരണം, മനുഷ്യനെ യന്ത്രത്തിൽ നിന്ന് വേർതിരിക്കുന്നത് അറിവല്ല. സ്വന്തം ചിന്തകൾ എഴുതാനുള്ള ധൈര്യമാണ്.",
];

function ScrollParagraph({ para, index }: { para: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative"
    >
      <p className="font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.8] sm:leading-[1.9] text-[#1b1915]/95 tracking-tight" lang="ml">
        {para}
      </p>
    </motion.div>
  );
}

export function Manam() {
  return (
    <section
      id="sec-m"
      aria-labelledby="manam-title"
      className="w-full bg-[#e6e0d3] text-[#1b1915] relative"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 pt-20 pb-32">

          <div className="lg:sticky lg:top-32 lg:w-5/12 flex flex-col shrink-0">
            <div
              className="flex items-center gap-3 mb-6 sm:mb-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a84e2a]">
                A story about what cannot be recreated
              </p>
            </div>

            <motion.h2
              id="manam-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-[28vw] sm:text-[22vw] md:text-[18vw] lg:text-[160px] xl:text-[200px] leading-[0.7] tracking-[-0.04em] text-[#1b1915]"
              lang="ml"
            >
              മണം
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 sm:mt-20 pt-10 border-t border-[#1b1915]/15"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full grayscale mix-blend-multiply opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={resolveAsset("sefana-elizabeth-manam.png")}
                    alt="Author portrait of Zephanah Elizabeth"
                    fill
                    sizes="96px"
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#a84e2a] mb-2 sm:mb-3">
                    Written by
                  </span>
                  <span className="font-sans text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1b1915] mb-2 sm:mb-3 leading-none">
                    Zephanah Elizabeth
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#1b1915]/40">
                    First year · Electronics & Communication Engineering
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-7/12 flex flex-col gap-12 sm:gap-16 lg:pt-16">
            {STORY_PARAGRAPHS.map((para, i) => (
              <ScrollParagraph key={i} para={para} index={i} />
            ))}
          </div>

        </div>
      </div>

      <footer className="w-full border-t border-[#1b1915]/10">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#1b1915]/45 sm:flex-row sm:items-center sm:justify-between sm:text-[9px]">
          <span>Author · Zephanah Elizabeth</span>
        </div>
      </footer>
    </section>
  );
}

export default Manam;
