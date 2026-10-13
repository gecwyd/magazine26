"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { YouTubePlayer, type YTPlayerInstance } from "@/components/ui/youtube-player"
import { preload } from "@/lib/preload"
import { Volume2, VolumeX } from "lucide-react"

const AD_VIDEO_URL = "https://youtu.be/x4_ahwTAS-I?si=Bql57JpEvL-rmQ84"

export function SecD() {
  const sectionRef = useRef<HTMLElement>(null)
  const playerRef = useRef<YTPlayerInstance | null>(null)
  const hasEnteredRef = useRef(false)
  const [isUserMuted, setIsUserMuted] = useState(false)

  useEffect(() => {
    preload(AD_VIDEO_URL, "youtube")
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  const isInView = useInView(sectionRef, { amount: "some", margin: "150px 0px" })
  const isMuted = !isInView || isUserMuted

  useEffect(() => {
    if (isInView) {
      hasEnteredRef.current = true
      if (playerRef.current) {
        try {
          if (!isUserMuted) {
            playerRef.current.unMute()
            playerRef.current.setVolume(100)
            playerRef.current.playVideo()
          }
        } catch {}
      }
    } else if (hasEnteredRef.current) {
      if (playerRef.current) {
        try {
          playerRef.current.mute()
        } catch {}
      }
    }
  }, [isInView, isUserMuted])

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  const bgScale = useTransform(smooth, [0, 1], [1.06, 1])

  const contentOpacity = useTransform(smooth, [0, 0.16, 0.86, 0.98], [0.3, 1, 1, 0.15])
  const contentScale = useTransform(smooth, [0, 0.16, 0.86, 0.98], [0.95, 1, 1, 0.97])

  const line1Y = useTransform(smooth, [0, 0.18], [40, 0])
  const line1Opacity = useTransform(smooth, [0, 0.16], [0, 1])

  const line2Y = useTransform(smooth, [0.06, 0.24], [35, 0])
  const line2Opacity = useTransform(smooth, [0.06, 0.22], [0, 1])

  const badgeY = useTransform(smooth, [0.12, 0.3], [30, 0])
  const badgeOpacity = useTransform(smooth, [0.12, 0.28], [0, 1])

  const handleToggleMute = () => {
    setIsUserMuted((prev) => {
      const next = !prev
      if (!next) {
        try {
          playerRef.current?.unMute()
          playerRef.current?.setVolume(100)
          playerRef.current?.playVideo()
        } catch {}
      } else {
        try {
          playerRef.current?.mute()
        } catch {}
      }
      return next
    })
  }

  return (
    <section
      ref={sectionRef}
      id="sec-d"
      className="relative h-[280vh] w-full bg-black snap-start scroll-mt-0 z-30"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-screen min-w-[177.78vh]">
            <YouTubePlayer
              url={AD_VIDEO_URL}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              hideControls
              showFloatingMute={false}
              cropYouTubeHeader
              onReady={(e) => {
                playerRef.current = e.target
                if (isInView) {
                  try {
                    e.target.unMute()
                    e.target.setVolume(100)
                    e.target.playVideo()
                  } catch {}
                }
              }}
              className="w-full h-full"
            />
          </div>

          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,_rgba(0,0,0,0.35)_0%,_#000000_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
          />

          <svg
            className="absolute inset-0 w-full h-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="ad-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d4c89a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ad-grid)" />
          </svg>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center w-full max-w-4xl mx-auto"
        >
          <motion.div
            style={{ y: line1Y, opacity: line1Opacity }}
            className="mb-6"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#d4c89a]/60">
              Advertisement Space
            </span>
          </motion.div>

          <motion.div
            style={{ y: line1Y, opacity: line1Opacity }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-[#d4c89a]/30 to-transparent mb-8 mx-auto"
          />

          <motion.div
            style={{ y: line1Y, opacity: line1Opacity }}
            className="relative mb-4"
          >
            <h2
              className="font-heading text-[18vw] sm:text-[14vw] md:text-[10rem] lg:text-[11rem] xl:text-[13rem] leading-[0.85] uppercase text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #d4c89a 0%, #f5e8b0 30%, #b8a870 60%, #d4c89a 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              YOUR
            </h2>
            <h2 className="font-heading text-[18vw] sm:text-[14vw] md:text-[10rem] lg:text-[11rem] xl:text-[13rem] leading-[0.85] uppercase text-[#d4c89a]/20">
              AD HERE
            </h2>
          </motion.div>

          <motion.div
            style={{ y: line2Y, opacity: line2Opacity }}
            className="mt-6 mb-10 max-w-xl"
          >
            <p className="text-[#d4c89a]/75 font-mono text-xs md:text-sm tracking-[0.15em] uppercase leading-relaxed">
              Reach thousands of students, faculty & alumni of Government Engineering College Wayanad through Adrishya Samavakyam
            </p>
          </motion.div>

          <motion.div
            style={{ y: badgeY, opacity: badgeOpacity }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="https://collegeunion.gecwyd.ac.in/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-3.5 border border-[#d4c89a]/30 hover:border-[#d4c89a]/70 bg-[#d4c89a]/10 hover:bg-[#d4c89a]/20 text-[#d4c89a] font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4c89a]/60 group-hover:bg-[#d4c89a] animate-pulse transition-colors duration-300" />
              Contact Us
            </a>

            <div className="flex items-center gap-3 text-[#d4c89a]/40 font-mono text-[10px] tracking-[0.25em] uppercase">
              <div className="w-8 h-px bg-[#d4c89a]/20" />
              <span>Limited Slots Available</span>
              <div className="w-8 h-px bg-[#d4c89a]/20" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: badgeY, opacity: badgeOpacity }}
            className="mt-10 flex items-center gap-6"
          >
            {["Full Page", "Half Page", "Banner"].map((slot, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-2 h-2 rounded-full border border-[#d4c89a]/40" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#d4c89a]/50">{slot}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute ad audio" : "Mute ad audio"}
          className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#d4c89a]/30 bg-black/70 hover:bg-black/90 text-[#d4c89a] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
        >
          {isMuted ? (
            <>
              <VolumeX className="size-3.5" />
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="size-3.5 animate-pulse text-[#f5e8b0]" />
              <span className="text-[#f5e8b0]">Sound On</span>
            </>
          )}
        </button>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4c89a]/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4c89a]/20 to-transparent" />
      </div>
    </section>
  )
}

export default SecD
