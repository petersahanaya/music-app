"use client";

import { useAudio } from "@/state/store/audio";
import { AnimatePresence } from "framer-motion";
import AudioPlayer from "..";

const AudioProvider = () => {
  const audioSrc = useAudio((state) => state.audioSrc);

  return (
    <>
      <AnimatePresence>
        {audioSrc && <AudioPlayer key={audioSrc.musicUrl} {...audioSrc} />}
      </AnimatePresence>
    </>
  );
};

export default AudioProvider;
