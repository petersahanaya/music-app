import { PickMusic } from "@state/store/audio";
import { Music } from "@prisma/client";

export const trackingMusic = (
  currentMusicSrc: string,
  type: "previous" | "next",
  listOfMusic: Music[]
): PickMusic | null => {
  const currentIndex = listOfMusic.findIndex(
    (music) => music.musicUrl === currentMusicSrc
  );
  const filteredMusic = listOfMusic.filter(
    (music) => music.musicUrl !== currentMusicSrc
  );

  const next = filteredMusic[currentIndex] as PickMusic | null;
  const previous = filteredMusic[currentIndex - 1] as PickMusic | null;

  return type === "next" ? next : previous;
};
