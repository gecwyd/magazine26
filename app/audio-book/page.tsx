import type { Metadata } from "next";
import AudioBookPlayer from "./audio-book-player";

export const metadata: Metadata = {
  title: "Audio Book · അദൃശ്യ സമവാക്യം",
  description:
    "Listen to Adrishya Samavakyam: 66 chapters of stories, poems, reflections and campus voices, with Malayalam hosting and works in their original languages.",
};

export default function AudioBookPage() {
  return <AudioBookPlayer />;
}
