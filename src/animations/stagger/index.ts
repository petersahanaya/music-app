const easings = [0.6, -0.05, 0.01, 0.99];

export const staggerAnimate = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6,
      duration: 0.4,
      ease: easings,
    },
  },
};
