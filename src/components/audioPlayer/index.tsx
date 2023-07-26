"use client";

import { useAudio } from "@state/store/audio";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";

const AudioPlayer = () => {
  const state = useAudio();

  return (
    <Fragment key={state.audioSrc}>
      <AnimatePresence>
        {state.audioSrc && (
          <motion.footer>
            <audio src={state.audioSrc}></audio>
          </motion.footer>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default AudioPlayer;
