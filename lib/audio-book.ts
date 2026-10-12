import data from "./audio-book-data.json";
import { resolveAsset } from "./asset-registry";

export type AudioCategory =
  "Opening" | "Stories" | "Poetry" | "Ideas" | "Campus";
export type AudioChapter = {
  id: number;
  title: string;
  author: string;
  category: AudioCategory;
  start: number;
  end: number;
  duration: number;
  asset: string;
};

export const audioChapters = data.chapters as AudioChapter[];
export const audioDuration = data.duration;
export const audioBookUrl = resolveAsset("adrishya-samavakyam-complete.m4a");
export const audioBookFallbackUrl = resolveAsset(
  "adrishya-samavakyam-complete.mp3",
);
export const audioBookDownloadUrl = resolveAsset(
  "adrishya-samavakyam-audiobook.m4b",
);

export function audioTime(seconds: number, showHours = false): string {
  const whole = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const rest = String(whole % 60).padStart(2, "0");
  return hours || showHours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${rest}`
    : `${minutes}:${rest}`;
}

export function chapterAt(seconds: number): AudioChapter {
  for (let i = audioChapters.length - 1; i >= 0; i--) {
    if (seconds >= audioChapters[i].start) return audioChapters[i];
  }
  return audioChapters[0];
}
