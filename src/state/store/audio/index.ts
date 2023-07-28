import { Music } from "@prisma/client";
import { create } from "zustand";

type Track = {
  audioSrc?: string;
  playing?: boolean;
};

type State = {
  audioSrc: Pick<
    Music,
    "title" | "coverImage" | "musicUrl" | "id" | "genre"
  > | null;
  onPressedChangedAudioSrc: (
    audioSrc: Pick<Music, "title" | "coverImage" | "musicUrl" | "id" | "genre">
  ) => void;
  track: {
    audioSrc: string;
    playing: boolean;
  };
  onPressedChangeTrack: (props: Track) => void;
};

export const useAudio = create<State>((set) => ({
  audioSrc: null,
  track: {
    audioSrc: "",
    playing: true,
  },
  onPressedChangeTrack: ({ audioSrc, playing }: Track) =>
    set((state) => {
      if (audioSrc) {
        return { ...state, track: { ...state.track, audioSrc } };
      } else if (playing) {
        return { ...state, track: { ...state.track, playing } };
      } else {
        return { ...state };
      }
    }),
  onPressedChangedAudioSrc: (
    audioSrc: Pick<Music, "title" | "coverImage" | "musicUrl" | "id" | "genre">
  ) =>
    set((state) => ({
      ...state,
      track: { ...state.track, audioSrc: audioSrc.musicUrl },
      audioSrc,
    })),
}));
