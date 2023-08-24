import { create } from "zustand";

type State = {
  loading: boolean;
  onPressedToggleLoader: () => void;
};

export const useLoaderUI = create<State>((set) => ({
  loading: false,
  onPressedToggleLoader: () => set((state) => ({ loading: !state.loading })),
}));
