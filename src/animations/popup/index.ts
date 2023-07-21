import { easeOut } from "framer-motion";

const ease = [0.6, -0.05, 0.01, 0.99];

export const popUpAnimate = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      ease: easeOut,
      bounce: 0.4,
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};
