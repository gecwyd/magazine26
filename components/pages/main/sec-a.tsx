"use client"

import * as React from "react"
import Link from "next/link"
import { Headphones } from "lucide-react"
import { DriveImage } from "@/components/ui/drive-image"
import { cn } from "@/lib/utils"
import { preload } from "@/lib/preload"
import { Sparks } from "@/components/ui/sparks"

const LOGO_URL = "https://github.com/gecwyd/magazine26/releases/download/v0.1-assets/logo.webp"
const BACKGROUND_URL = "https://github.com/gecwyd/magazine26/releases/download/v0.1-assets/college-draw.webp"
const COLLEGE_NAME = "GOVERNMENT ENGINEERING COLLEGE"
const LOCATION = "WAYANAD"
const TAGLINE = "GECW  /  KERALA"
const ESTABLISHED_YEAR = "EST. 1999"

export type SecAProps = React.HTMLAttributes<HTMLElement>

export function SecA({ className, ...props }: SecAProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
      className={cn(
        "relative h-screen w-full bg-primary overflow-x-hidden font-sans",
        className
      )}
      {...props}
    >
      <meta itemProp="name" content="Government Engineering College Wayanad" />
      <meta itemProp="alternateName" content="GECW" />
      <meta itemProp="foundingDate" content="1999" />
      <meta itemProp="address" content="Wayanad, Kerala, India" />

      <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <DriveImage
              src={preload(BACKGROUND_URL)}
              alt="Government Engineering College Wayanad Campus Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center grayscale contrast-[1.1] brightness-[0.4]"
            />
          </div>

          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
          <Sparks />
        </div>

        <header className="absolute top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center text-white/60">
          <span className="font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase">{TAGLINE}</span>
          <div className="flex items-center gap-5 sm:gap-8">
            <Link href="/audio-book" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/20 px-4 py-2.5 text-[10px] font-medium tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
              Audio Book
            </Link>
            <span className="hidden sm:inline font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase">{ESTABLISHED_YEAR}</span>
          </div>
        </header>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="w-24 sm:w-28 md:w-36 lg:w-40 h-auto mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] relative aspect-square">
            <DriveImage
              src={preload(LOGO_URL)}
              alt="Government Engineering College Wayanad (GECW) Official Emblem Logo"
              itemProp="logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading uppercase tracking-[-0.02em] leading-[1.1] text-white drop-shadow-2xl text-center"
            >
              <span className="block">{COLLEGE_NAME}</span>
              <span className="block text-white/90">{LOCATION}</span>
            </h1>
            <p className="sr-only">
              Government Engineering College Wayanad (GECW), Kerala. Established in 1999.
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-12 md:h-24 bg-[#d9d4c7] z-30 pointer-events-none"
        aria-hidden="true"
        style={{
          clipPath:
            "polygon(0% 100%, 100% 100%, 100% 20%, 95% 40%, 90% 25%, 85% 45%, 80% 30%, 75% 50%, 70% 35%, 65% 55%, 60% 40%, 55% 60%, 50% 45%, 45% 65%, 40% 50%, 35% 70%, 30% 55%, 25% 75%, 20% 60%, 15% 80%, 10% 65%, 5% 85%, 0% 70%)",
        }}
      />
    </section>
  )
}

export default SecA
