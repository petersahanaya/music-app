"use client";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiVolumeX, FiVolume2 } from "react-icons/fi";
import { MdLoop } from "react-icons/md";
import { RiSkipLeftFill } from "react-icons/ri";
import Image from "next/image";
import { formatTime } from "@/lib/functions/formater";
import { PiArrowsSplitFill } from "react-icons/pi";

const audioSrc =
  "https://res.cloudinary.com/dlvi65trb/video/asset/v1690204069/music/esx9lvgh0rfs2geawwfy.mp3";

const audioTitle = "Bread";
const coverImage =
  "https://res.cloudinary.com/dlvi65trb/image/asset/v1690204067/music/sh0sjtrtinbvu2m8zc45.jpg";
const audioGenre = "Chill";

const Audio = () => {
  const [state, setState] = useState({
    play: false,
    volume: 1,
    loop: false,
  });

  const [time, setTime] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [currentTrack, setCurrentTrack] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onDragChangeVolume = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const seekValue = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.volume = seekValue;

      setState((prev) => ({ ...prev, volume: seekValue }));
    }
  }, []);

  const onPressedPlayAudio = useCallback(() => {
    if (!state.play) {
      audioRef.current?.play();
      setState((prev) => ({ ...state, play: true }));
    } else {
      audioRef.current?.pause();
      setState((prev) => ({ ...prev, play: false }));
    }
  }, [state]);

  const handleTimeUpdate = useCallback((audio: HTMLAudioElement) => {
    setTime({
      currentTime: audio.currentTime,
      duration: audio.duration,
    });
  }, []);

  const onPressedChangeLoop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      loop: !prev.loop,
    }));
  }, []);

  const handleLoop = useCallback(
    (audio: HTMLAudioElement) => {
      if (state.loop) {
        audio.currentTime = 0;
        audio.play();

        setState((prev) => ({ ...prev, play: true }));
      } else {
        setState((prev) => ({ ...prev, play: false }));
      }
    },
    [state.loop]
  );

  const onDragHandleAudio = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;

      setTime((prev) => ({ ...prev, currentTime: seekTime }));
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Space") {
        onPressedPlayAudio();
      }
    });

    if (audio) {
      audio.addEventListener("timeupdate", () => handleTimeUpdate(audio));
      audio.addEventListener("ended", () => handleLoop(audio));

      return () => {
        audio.removeEventListener("timeupdate", () => handleTimeUpdate(audio));
        audio.removeEventListener("ended", () => handleLoop(audio));
      };
    }
  }, [handleLoop, handleTimeUpdate, onPressedPlayAudio, state.loop]);

  return (
    <main className="w-[80%] h-screen bg-neutral-950 pt-52 ">
      <section className="w-screen h-[120px] fixed bottom-0 right-0 bg-black flex justify-between items-center gap-20 z-[80] px-6">
        <audio autoPlay className="hidden" ref={audioRef} src={audioSrc} />
        {/* IMAGE */}
        <section className="cursor-pointer group flex justify-start items-center gap-3">
          <div className="sm:w-[80px] sm:h-[80px] w-[50px] h-[50px] rounded-md relative overflow-hidden">
            <Image src={coverImage} alt={audioTitle} fill />
          </div>
          <div className="group-hover:opacity-70 transition-opacity">
            <p className="text-lg font-[500] text-white capitalize">
              {audioTitle}
            </p>
            <p className="text-sm font-[500] text-stone-400">{audioGenre}</p>
          </div>
        </section>
        <section className="flex flex-auto flex-col justify-between items-center pb-8">
          {/* PLAYER */}
          <section className="w-full flex justify-center items-center gap-3 my-6">
            <button className="text-white rotate-[-90deg] transition-opacity hover:opacity-70">
              <PiArrowsSplitFill size={20} />
            </button>
            <button className="bg-green-500 text-stone-800 rounded-full p-3 hover:opacity-70 transition-opacity">
              <RiSkipLeftFill size={20} />
            </button>
            <button
              onClick={onPressedPlayAudio}
              className="bg-green-500 text-stone-800 rounded-full p-4 hover:opacity-70 transition-opacity"
            >
              {!state.play ? <FaPlay size={30} /> : <FaPause size={30} />}
            </button>
            <button className="bg-green-500 text-stone-800 rounded-full p-3 rotate-180 hover:opacity-70 transition-opacity">
              <RiSkipLeftFill size={20} />
            </button>
            <button
              onClick={onPressedChangeLoop}
              className={`text-white ${
                state.loop ? "opacity-100" : "opacity-50"
              } transition-opacity hover:opacity-70`}
            >
              <MdLoop size={20} />
            </button>
          </section>

          {/* PROGRESS */}
          <nav className="w-full flex flex-col justify-start items-center gap-2">
            <div className="w-full h-[5px] rounded-full relative group">
              <input
                type="range"
                min={0}
                max={time.duration}
                value={time.currentTime}
                onChange={onDragHandleAudio}
                className="w-full absolute top-0 left-0 cursor-pointer accent-stone-700 h-[4px]"
              />
              <p className="absolute top-[-20px] left-0 text-stone-300 text-sm opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                {formatTime(time.duration - time.currentTime)}
              </p>
            </div>
          </nav>
        </section>

        {/* VOLUME */}
        <section className="hidden sm:inline-block relative gap-3 group ">
          <button className="bg-green-500 text-stone-800 rounded-full p-3 hover:opacity-70 transition-opacity">
            {state.volume === 0 ? (
              <FiVolumeX size={20} />
            ) : (
              <FiVolume2 size={20} />
            )}
          </button>

          <div className="absolute bottom-[30px] right-0 rotate-90 bg-stone-700 p-4 rounded-md flex justify-center items-center translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
            <input
              className="h-[3px]"
              type="range"
              onChange={onDragChangeVolume}
              min={0}
              max={1}
            />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Audio;
