"use client";

import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const PARAGRAPHS = [
  "കൊച്ചുകുട്ടികളുടെ മനസ്സിൽ ഇരുട്ടിന് എന്നും പേടിയുടെ മുഖമാണ്. അത് അവരിൽ ഉണ്ടാക്കിയെടുത്തതാണോ എന്ന് ചോദിച്ചാൽ അല്ല എന്നാലെങ്കിലും അത് ചിലപ്പോഴൊക്കെ ഉണ്ടായിതീരാൻ അവരുടെ ചുറ്റുമുള്ള മുതിർന്നവരും ഒരു കാരണമാക്കാറുണ്ട്. ഞാനടക്കമുള്ള പലരും കുട്ടിക്കാലത്തു വീട്ടിൽ കറന്റ് പോകുമ്പോൾ ഓടികളിക്കുന്നത് നിർത്തി കത്തിച്ചുവച്ച മെഴുകുതിരി വെട്ടത്തിന്റെ അടുത്തു നില്കുകയല്ലാതെ ഇരുട്ടത് എവിടേക്കും പോക്കില്ല കാരണം. ആ പ്രായത്തിന്റെ ഇരുട്ട് അമ്മമാരും മുത്തശ്ശനും മുത്തശ്ശിയുമെല്ലാം കുട്ടികൾക്ക് പറഞ്ഞുകൊടുത്ത പേടിപ്പിക്കുന്ന കഥകളില്ലെല്ലാം ഉള്ള പേടിയുടെ രൂപമായിരുന്നു.",
  "വർഷങ്ങൾക്ക് ശേഷം കുട്ടികൾ വളർന്നു, ഇന്ന് അവർക്ക് അതെ പേടിയാണോ ഇരുട്ടിനോടുള്ളത്, ചിലർക്ക് ആയിരിക്കാം മറ്റുചിലർക്ക് അങ്ങനെ ആയിരിക്കില്ല. ശരിക്കും ഇരുട്ടിന് ഒരു രൂപമുണ്ടോ?.... ഉണ്ട്, നമ്മുക്ക് ഇരുട്ടിനെ എങ്ങനെ കാണാൻ കഴിയുന്നവോ അതാണ് ഇരുട്ടിന്റെ രൂപം. കുഞ്ഞുനാളിൽ അതിന് പേടിയുടെ രൂപം കണ്ടവരിൽ ചിലർക്ക് അതിന്റെ രൂപം മാറാൻ തുടങ്ങിയിരിക്കും. അതിനു കാരണം അവർ ഇരുട്ടിനേക്കാൾ പേടിച്ചിരുന്നതിനെയെല്ലാം നേരിട്ട് കടന്നുവന്നതുകൊണ്ടാവാം അല്ലെങ്കിൽ വലിയ ഭയം ഉള്ളവർക്ക് ഇരുട്ടിനോടുള്ള ഭയം മാറി പറഞ്ഞുതരാൻ കഴിയാത്ത ഒരു തരം അടുപ്പം അവരുടെ ജീവിതത്തിൽ അവർ ഉണ്ടാക്കിയെടുത്തതാവാം.",
  "ഇത് വായിക്കുന്ന നിനക്കും ഇത് എഴുതിയ എനിക്കും ഇരുട്ട് ഇങ്ങനെ തന്നെയായിരിക്കും ഒരു സുഹൃത്തിനെപ്പോലെ എപ്പോൾ വേണമെങ്കിലും കേറിചെല്ലാവുന്ന ഒരിടം അല്ലെങ്കിൽ ജീവിതത്തിന്റെ നിലക്കാത്ത ഓട്ടത്തിൽ ഒരു നിമിഷമെങ്കിലും നിൽക്കാനുള്ള ഒരിടം, കുറച്ചു സമാധാനം കിട്ടുന്ന ഒരിടം അതുമല്ലെങ്കിൽ ചുറ്റും നിറഞ്ഞുനിൽക്കുന്ന ഇരുട്ടിലും എന്നെങ്കിലും ഒരുതരി വെട്ടം അവിടെ പ്രകാശിക്കും എന്ന പ്രതീക്ഷയുടെ ഒരു രൂപം.",
];

function P({ children }: { children: string }) {
  return (
    <p
      className="mb-12 font-serif text-[1.15rem] font-light leading-[2.2] tracking-wide text-[#d4d4d4] md:text-[1.25rem] md:leading-[2.4]"
      lang="ml"
    >
      {children}
    </p>
  );
}

export function Iruttu() {
  return (
    <section 
      id="sec-iruttu" 
      className="relative w-full bg-[#050505] text-[#d4d4d4]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 bg-[#fef08a]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#050505]/60 lg:to-[#050505]" />
            <Image
              src={resolveAsset("iruttu-candle.webp")}
              alt="A person sitting beside a candle in a quiet dark room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fef08a]/70">
              Reflection · 11
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#fef08a] opacity-90 uppercase xl:text-7xl" lang="ml">
              ഇരുട്ട്
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#d4d4d4]/70">
              A journey through shadows.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Article */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-2xl">
            <P>{PARAGRAPHS[0]}</P>
            <P>{PARAGRAPHS[1]}</P>

            <div className="my-16 border-l-2 border-[#fef08a]/50 bg-gradient-to-r from-[#fef08a]/5 to-transparent py-10 pl-8 md:my-24 md:pl-12">
              <p className="font-serif text-2xl font-light italic leading-relaxed text-[#fef08a]/90 md:text-3xl lg:text-4xl" lang="ml">
                &ldquo;ഇരുട്ടിന് അവർ കണ്ടെത്തിയ രൂപം ഒരു സുഹൃത്തിന്റെയാവാം സമാധാനത്തിന്റെയായിരിക്കാം. അതുമല്ലെങ്കിൽ ഒരു പ്രതീക്ഷയുടെതും ആയിരിക്കാം.&rdquo;
              </p>
            </div>

            <P>{PARAGRAPHS[2]}</P>
          </article>
        </div>
      </div>

      {/* Finale & Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#fef08a]/10 bg-[#050505] px-6 py-32 text-center md:py-48">
        
        <div className="mb-32 max-w-4xl">
          <p className="mb-10 font-serif text-3xl font-light leading-[1.7] text-[#fef08a]/90 md:text-5xl" lang="ml">
            ഒരിക്കൽ ഇരുട്ടിനെ ഭയന്ന് തിരിഞ്ഞ് നടന്നവർ ഇന്ന് അതെ ഇരുട്ടിൽ വെളിച്ചം തേടുന്നു.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-[#fef08a]/10 pt-24 w-full">
          <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#fef08a]/30 bg-[#fef08a]/10 p-1 md:h-32 md:w-32">
            <div className="h-full w-full overflow-hidden rounded-full">
              <Image 
                src={resolveAsset("anirudh.webp")} 
                alt="അനിരുദ്ധ് പി. ഡി" 
                width={128} 
                height={128} 
                className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
                unoptimized
              />
            </div>
          </div>
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fef08a]/70">
            Written by
          </span>
          <h3 className="font-serif text-2xl text-[#d4d4d4] md:text-4xl" lang="ml">
            അനിരുദ്ധ് പി. ഡി
          </h3>
          <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#d4d4d4]/50 md:text-base" lang="ml">
            മൂന്നാം വർഷം, ഇലക്ട്രോണിക്സ് &amp; കമ്യൂണികേഷൻ
          </p>
        </div>
      </div>
    </section>
  );
}
