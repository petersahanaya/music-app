import { Music } from "@prisma/client";
import { create } from "zustand";

type State = {
  audioSrc: Pick<
    Music,
    "title" | "coverImage" | "musicUrl" | "id" | "genre"
  > | null;
  onPressedChangedAudioSrc: (
    audioSrc: Pick<Music, "title" | "coverImage" | "musicUrl" | "id" | "genre">
  ) => void;
};

export const useAudio = create<State>((set) => ({
  audioSrc: null,
  onPressedChangedAudioSrc: (
    audioSrc: Pick<Music, "title" | "coverImage" | "musicUrl" | "id" | "genre">
  ) => set((state) => ({ audioSrc })),
}));
