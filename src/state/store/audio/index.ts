import { Music } from "@prisma/client";
import { create } from "zustand";

export enum TrackType {
  "SetCurrentMusic" = "SETCURRENTMUSIC",
  "Default" = "DEFAULT",
}

type Track = {
  currentAudioSrc: string;
  listOfMusic: Music[];
  type: TrackType;
};

export type PickMusic = Pick<
  Music,
  "title" | "coverImage" | "musicUrl" | "id" | "genre"
>;

type State = {
  audioSrc: PickMusic | null;
  onPressedChangedAudioSrc: (audioSrc: PickMusic) => void;
  track: {
    currentAudioSrc: string;
    listOfMusic: Music[];
  };
  onPressedChangeTrack: (props: Track) => void;
};

export const useAudio = create<State>((set) => ({
  audioSrc: null,
  track: {
    currentAudioSrc: "",
    listOfMusic: [],
  },
  onPressedChangeTrack: (track: Track) =>
    set((state) => {
      switch (track.type) {
        case TrackType.SetCurrentMusic:
          return {
            ...state,
            track: { ...state.track, currentAudioSrc: track.currentAudioSrc },
          };
        case TrackType.Default:
          return { ...state, track };
        default:
          return { ...state };
      }
    }),
  onPressedChangedAudioSrc: (
    audioSrc: Pick<Music, "title" | "coverImage" | "musicUrl" | "id" | "genre">
  ) =>
    set((state) => ({
      ...state,
      audioSrc,
    })),
}));
