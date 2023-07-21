import { create } from "zustand";

type State = {
  open: boolean;
  onPressedToggleAuth: () => void;
};

export const useToggleAuth = create<State>((set) => ({
  open: false,
  onPressedToggleAuth: () => set((state) => ({ open: !state.open })),
}));

type StateProfile = {
  open: boolean;
  onPressedToggleProfile: () => void;
};

export const useToggleProfile = create<StateProfile>((set) => ({
  open: false,
  onPressedToggleProfile: () => set((state) => ({ open: !state.open })),
}));
