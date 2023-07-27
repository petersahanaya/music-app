import { create } from "zustand";

type State = {
  open: boolean;
  coverImage: string;
  onPressedChangeAlertUnauthenticate: (coverImage : string) => void;
};

export const useAlertUnAuthenticate = create<State>((set) => ({
  open: false,
  coverImage: "",
  onPressedChangeAlertUnauthenticate: (coverImage : string) =>
    set((state) => ({ open: !state.open, coverImage })),
}));
