const easings = [0.6, -0.05, 0.01, 0.99];

export const fadeUpAnimate = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings,
    },
  },
  exit: {
    y: 0,
    opacity: 0,
    scale: 0,
  },
};

const easings2 = [0.25, 1, 0.5, 1];

export const fadeOutRight = {
  hidden: {
    x: -30,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings,
    },
  },
  exit: {
    x: 30,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easings,
    },
  },
};
