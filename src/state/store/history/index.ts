import { Music } from "@prisma/client";
import { create } from "zustand";
import { PickMusic } from "../audio";

type State = {
  historyMusic: Music[];
  onLoadSetHistoryMusic: (listOfMusic: Music[]) => void;
  onPressedSortPlaying: (audioSrc: Music) => void;
};

export const useRecentlyPlayed = create<State>((set) => ({
  historyMusic: [],
  onLoadSetHistoryMusic: (listOfMusic: Music[]) =>
    set(() => ({ historyMusic: listOfMusic })),
  onPressedSortPlaying: (audioSrc: Music) =>
    set((state) => ({
      historyMusic: [
            audioSrc,
        ...state.historyMusic.filter((music) => music.id !== audioSrc.id),
      ],
    })),
}));
