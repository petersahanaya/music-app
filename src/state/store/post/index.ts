import { create } from "zustand";

export enum PostStep {
  INITIAL = "INITIAL",
  SECOND = "SECOND",
}

type State = {
  open: boolean;
  step: PostStep;

  onPressedChangeStep: (step: PostStep) => void;
  onPressedOpenPost: () => void;
};

export const usePostDropDown = create<State>((set) => ({
  open: false,
  step: PostStep.INITIAL,
  onPressedOpenPost: () => set((state) => ({ open: !state.open })),
  onPressedChangeStep: (step: PostStep) => set((state) => ({ step })),
}));
