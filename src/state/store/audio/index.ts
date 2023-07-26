import { create } from "zustand";

type State = {
  audioSrc: string;
  volume: number;
  paused: boolean;
  onPressedChangedAudio: (audioSrc: string) => void;
  onPressedStartMusic: () => void;
  onPressedPauseMusic: () => void;
  onDragChangeVolume: (value: number) => void;
};

export const useAudio = create<State>((set) => ({
  audioSrc: "",
  volume: 1,
  paused: false,
  onPressedChangedAudio: (audioSrc: string) =>
    set((state) => ({ ...state, audioSrc })),
  onPressedStartMusic: () => set((state) => ({ ...state, paused: false })),
  onPressedPauseMusic: () => set((state) => ({ ...state, paused: true })),
  onDragChangeVolume: (value: number) =>
    set((state) => ({ ...state, volume: value })),
}));
