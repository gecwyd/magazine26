"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Search,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  audioBookDownloadUrl,
  audioBookUrl,
  audioBookFallbackUrl,
  audioChapters,
  audioDuration,
  audioTime,
  chapterAt,
} from "@/lib/audio-book";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./audio-book.module.css";

const STORAGE_KEY = "adrishya-audio-book-v2";
const FILTERS = ["All", "Stories", "Poetry", "Ideas", "Campus"] as const;
const SPEEDS = [0.75, 1, 1.15, 1.25, 1.5, 1.75, 2];

export default function AudioBookPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const pendingPlay = useRef(false);
  const lastSaved = useRef(0);
  const playRequest = useRef(0);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [error, setError] = useState("");
  const [hasSavedPlace, setHasSavedPlace] = useState(false);
  const chapter = chapterAt(position);
  const chapterProgress = Math.max(
    0,
    Math.min(1, (position - chapter.start) / chapter.duration),
  );
  const totalProgress = Math.min(100, (position / audioDuration) * 100);
  const filteredChapters = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return audioChapters.filter(
      (item) =>
        (filter === "All" || item.category === filter) &&
        (!search ||
          `${item.title} ${item.author} ${item.category}`
            .toLocaleLowerCase()
            .includes(search)),
    );
  }, [query, filter]);

  const persist = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.readyState === 0) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          time: audio.ended ? 0 : audio.currentTime,
          speed: audio.playbackRate,
        }),
      );
    } catch {
      /* Listening continues when browser storage is unavailable. */
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (
          !saved ||
          typeof saved.time !== "number" ||
          !Number.isFinite(saved.time)
        )
          return;
        const time =
          saved.time >= audioDuration - 2
            ? 0
            : Math.max(0, Math.min(audioDuration, saved.time));
        const rate = SPEEDS.includes(saved.speed) ? saved.speed : 1;
        pendingSeek.current = time;
        setPosition(time);
        setSpeed(rate);
        setHasSavedPlace(time > 5);
        const audio = audioRef.current;
        if (audio) {
          audio.playbackRate = rate;
          if (audio.readyState >= 1) {
            audio.currentTime = time;
            pendingSeek.current = null;
          }
        }
      } catch {
        /* A new listening session starts normally. */
      }
    }, 0);
    window.addEventListener("pagehide", persist);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pagehide", persist);
      persist();
    };
  }, [persist]);

  const seek = useCallback((time: number) => {
    const target = Math.max(0, Math.min(audioDuration, time));
    setPosition(target);
    const audio = audioRef.current;
    if (audio && audio.readyState >= 1) {
      audio.currentTime = target;
      pendingSeek.current = null;
    } else pendingSeek.current = target;
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    if (audio.ended || audio.currentTime >= audioDuration - 0.1) seek(0);
    if (pendingSeek.current !== null && audio.readyState >= 1) {
      audio.currentTime = pendingSeek.current;
      pendingSeek.current = null;
    }
    pendingPlay.current = true;
    setBuffering(true);
    const request = ++playRequest.current;
    audio.play().catch((reason: unknown) => {
      if (request !== playRequest.current) return;
      pendingPlay.current = false;
      setBuffering(false);
      if (!(reason instanceof DOMException && reason.name === "AbortError"))
        setError(
          "The audio couldn't start. Try again, or download it to listen offline.",
        );
    });
  }, [seek]);

  const pause = useCallback(() => {
    playRequest.current++;
    pendingPlay.current = false;
    audioRef.current?.pause();
    setBuffering(false);
    persist();
  }, [persist]);

  const toggle = () => {
    if (playing || pendingPlay.current) pause();
    else start();
  };
  const chooseChapter = useCallback(
    (id: number) => {
      const target = audioChapters.find((item) => item.id === id);
      if (!target) return;
      seek(target.start);
      start();
    },
    [seek, start],
  );

  const previous = useCallback(() => {
    const audio = audioRef.current;
    const time = pendingSeek.current ?? audio?.currentTime ?? 0;
    const current = chapterAt(time);
    seek(
      time - current.start > 3
        ? current.start
        : audioChapters[Math.max(0, current.id - 2)].start,
    );
  }, [seek]);
  const next = useCallback(() => {
    const time = pendingSeek.current ?? audioRef.current?.currentTime ?? 0;
    const current = chapterAt(time);
    const target = audioChapters[current.id];
    if (target) seek(target.start);
  }, [seek]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined")
      return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: chapter.title,
      artist: chapter.author || "Sathva · GEC Wayanad",
      album: "അദൃശ്യ സമവാക്യം",
      artwork: [
        {
          src: resolveAsset("adrishya-bhasha-hero.webp"),
          sizes: "512x512",
          type: "image/webp",
        },
      ],
    });
  }, [chapter]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const actions: [MediaSessionAction, MediaSessionActionHandler][] = [
      ["play", start],
      ["pause", pause],
      ["previoustrack", previous],
      ["nexttrack", next],
      [
        "seekbackward",
        (details) =>
          seek(
            (audioRef.current?.currentTime || 0) - (details.seekOffset || 15),
          ),
      ],
      [
        "seekforward",
        (details) =>
          seek(
            (audioRef.current?.currentTime || 0) + (details.seekOffset || 15),
          ),
      ],
      [
        "seekto",
        (details) => {
          if (details.seekTime !== undefined) seek(details.seekTime);
        },
      ],
    ];
    for (const [action, handler] of actions) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        /* Some devices support a subset of controls. */
      }
    }
    return () => {
      for (const [action] of actions) {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {
          /* No handler to remove. */
        }
      }
    };
  }, [next, pause, previous, seek, start]);

  function updatePosition() {
    const audio = audioRef.current;
    if (!audio) return;
    setPosition(audio.currentTime);
    if (Date.now() - lastSaved.current > 5000) {
      persist();
      lastSaved.current = Date.now();
    }
    if (
      "mediaSession" in navigator &&
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      try {
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          playbackRate: audio.playbackRate,
          position: Math.min(audio.currentTime, audio.duration),
        });
      } catch {
        /* Playback remains available. */
      }
    }
  }

  function changeSpeed(rate: number) {
    setSpeed(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
    persist();
  }

  function loaded() {
    const audio = audioRef.current;
    if (!audio) return;
    if (pendingSeek.current !== null) {
      audio.currentTime = pendingSeek.current;
      pendingSeek.current = null;
    }
    audio.playbackRate = speed;
  }

  const playIcon = buffering ? (
    <LoaderCircle className={styles.spinner} aria-hidden="true" />
  ) : playing ? (
    <Pause fill="currentColor" aria-hidden="true" />
  ) : (
    <Play fill="currentColor" aria-hidden="true" />
  );

  return (
    <main className={styles.page}>
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={loaded}
        onTimeUpdate={updatePosition}
        onPlay={() => {
          pendingPlay.current = false;
          setPlaying(true);
        }}
        onPlaying={() => setBuffering(false)}
        onPause={() => {
          setPlaying(false);
          persist();
        }}
        onWaiting={() => {
          if (!audioRef.current?.paused) setBuffering(true);
        }}
        onCanPlay={() => setBuffering(false)}
        onEnded={() => {
          setPlaying(false);
          setBuffering(false);
          setHasSavedPlace(false);
          persist();
        }}
        onError={() => {
          pendingPlay.current = false;
          setPlaying(false);
          setBuffering(false);
          setError(
            "The audio is taking longer to reach you. Retry, or keep a download for offline listening.",
          );
        }}
      >
        <source src={audioBookUrl} type='audio/mp4; codecs="mp4a.40.2"' />
        <source src={audioBookFallbackUrl} type="audio/mpeg" />
      </audio>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.back}>
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back</span>
          </Link>
          <span className={styles.edition}>Sathva · 2025–26</span>
        </header>

        <section className={styles.hero} aria-labelledby="audio-book-title">
          <h1 id="audio-book-title" className={styles.title} lang="ml">
            അദൃശ്യ സമവാക്യം
          </h1>
          <p className={styles.subtitle}>
            66 chapters · 3h 54m · Malayalam + English
          </p>
        </section>

        <div className={styles.layout}>
          <section
            className={styles.library}
            id="chapters"
            aria-labelledby="chapters-title"
          >
            <div className={styles.libraryHeading}>
              <h2 id="chapters-title">Chapters</h2>
              <span className={styles.chapterCount}>
                {filteredChapters.length} / 66
              </span>
            </div>
            <label className={styles.search}>
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or author"
                aria-label="Search chapters by title or author"
              />
            </label>
            <div className={styles.filters} aria-label="Filter chapters">
              {FILTERS.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={filter === item}
                  className={filter === item ? styles.filterActive : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.listHeader}>
              <span>#</span>
              <span>Title</span>
              <span>Duration</span>
            </div>
            <ol className={styles.chapterList}>
              {filteredChapters.map((item) => {
                const active = item.id === chapter.id;
                return (
                  <li
                    key={item.id}
                    className={`${styles.chapterRow} ${active ? styles.chapterActive : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.chapterButton}
                      onClick={() => chooseChapter(item.id)}
                      aria-current={active ? "true" : undefined}
                      aria-label={`Play chapter ${item.id}: ${item.title}`}
                    >
                      <span className={styles.chapterNumber}>
                        {active && playing ? (
                          <span
                            className={styles.miniWave}
                            aria-hidden="true"
                          >
                            <i />
                            <i />
                            <i />
                          </span>
                        ) : (
                          String(item.id).padStart(2, "0")
                        )}
                      </span>
                      <span className={styles.chapterText}>
                        <span className={styles.chapterTitle}>
                          {item.title}
                        </span>
                        <span className={styles.chapterAuthor}>
                          {item.author || item.category}
                        </span>
                      </span>
                      <span className={styles.chapterLength}>
                        {audioTime(item.duration)}
                      </span>
                    </button>
                    <a
                      className={styles.chapterDownload}
                      href={resolveAsset(item.asset)}
                      aria-label={`Download chapter ${item.id}: ${item.title}`}
                      title="Download chapter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={14} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ol>
            {filteredChapters.length === 0 && (
              <div className={styles.empty}>
                <Search aria-hidden="true" />
                <p>No chapters found.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                >
                  Show all
                </button>
              </div>
            )}
          </section>

          <aside
            className={`${styles.player} ${playing ? styles.isPlaying : ""}`}
            aria-label="Audio player"
          >
            <div className={styles.nowPlaying} aria-live="polite">
              <span className={styles.playerKicker}>
                {String(chapter.id).padStart(2, "0")} / 66
              </span>
              <h2>{chapter.title}</h2>
              <p>{chapter.author || "Sathva · GEC Wayanad"}</p>
            </div>
            <div className={styles.transport}>
              <button
                type="button"
                onClick={previous}
                aria-label="Previous chapter"
              >
                <SkipBack size={17} fill="currentColor" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.skipSeconds}
                onClick={() => seek(position - 15)}
                aria-label="Rewind 15 seconds"
              >
                <RotateCcw size={22} aria-hidden="true" />
                <span>15</span>
              </button>
              <button
                type="button"
                className={styles.playButton}
                onClick={toggle}
                aria-label={
                  playing || buffering
                    ? "Pause audio"
                    : hasSavedPlace
                      ? "Resume audio"
                      : "Play audio"
                }
              >
                {playIcon}
              </button>
              <button
                type="button"
                className={styles.skipSeconds}
                onClick={() => seek(position + 15)}
                aria-label="Forward 15 seconds"
              >
                <RotateCw size={22} aria-hidden="true" />
                <span>15</span>
              </button>
              <button
                type="button"
                onClick={next}
                disabled={chapter.id === audioChapters.length}
                aria-label="Next chapter"
              >
                <SkipForward size={17} fill="currentColor" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.timeline}>
              <input
                type="range"
                min={0}
                max={audioDuration}
                step={1}
                value={position}
                onChange={(event) => seek(Number(event.target.value))}
                aria-label="Seek through the audio book"
                aria-valuetext={`${audioTime(position, true)} of ${audioTime(audioDuration, true)}`}
                style={{
                  background: `linear-gradient(to right, var(--accent) ${totalProgress}%, var(--rule) ${totalProgress}%)`,
                }}
              />
              <div>
                <span>{audioTime(position, true)}</span>
                <span>{audioTime(audioDuration, true)}</span>
              </div>
            </div>
            <div className={styles.playerOptions}>
              <button
                type="button"
                aria-label={muted ? "Unmute audio" : "Mute audio"}
                aria-pressed={muted}
                onClick={() => {
                  const audio = audioRef.current;
                  if (audio) {
                    audio.muted = !muted;
                    setMuted(!muted);
                  }
                }}
              >
                {muted ? (
                  <VolumeX size={17} aria-hidden="true" />
                ) : (
                  <Volume2 size={17} aria-hidden="true" />
                )}
              </button>
              <label>
                <span className={styles.srOnly}>Playback speed</span>
                <select
                  value={speed}
                  onChange={(event) => changeSpeed(Number(event.target.value))}
                >
                  {SPEEDS.map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}×
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.chapterProgress}>
              <span style={{ width: `${chapterProgress * 100}%` }} />
            </div>
            {error && (
              <div className={styles.error} role="alert">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    pendingSeek.current = position;
                    audioRef.current?.load();
                    start();
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            <div className={styles.downloads}>
              <a href={audioBookUrl} target="_blank" rel="noopener noreferrer">
                Stream <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href={audioBookDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download <Download size={13} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>

        <footer className={styles.footer}>
          <p>Sathva · Govt. Engineering College, Wayanad · 2025–26</p>
          <Link href="/">
            Magazine <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </footer>
      </div>
      <div className={styles.mobilePlayer}>
        <div>
          <span>{String(chapter.id).padStart(2, "0")} / 66</span>
          <strong>{chapter.title}</strong>
        </div>
        <button
          type="button"
          onClick={() => seek(position - 15)}
          aria-label="Rewind 15 seconds"
        >
          <RotateCcw size={19} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.mobilePlay}
          onClick={toggle}
          aria-label={playing || buffering ? "Pause audio" : "Play audio"}
        >
          {playIcon}
        </button>
      </div>
    </main>
  );
}
