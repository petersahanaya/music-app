import { create } from "zustand";

type State = {
  open: boolean;
  onPressedToggleSidebar: () => void;
};

export const useSidebar = create<State>((set) => ({
  open: false,
  onPressedToggleSidebar: () => set((state) => ({ open: !state.open })),
}));
