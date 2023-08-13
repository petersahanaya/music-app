"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatTime } from "@lib/functions/formater";

import { FaPlay, FaPause } from "react-icons/fa";
import { FiVolumeX, FiVolume2 } from "react-icons/fi";
import { MdLoop } from "react-icons/md";
import { BsShuffle } from "react-icons/bs";
import { RiSkipLeftFill } from "react-icons/ri";
import Tooltip from "../tooltip";
import { TrackType, useAudio } from "@state/store/audio";
import { trackingMusic } from "@lib/functions/trackingMusic";

type AudioProps = {
  title: string;
  genre: string;
  musicUrl: string;
  coverImage: string;
};

const AudioPlayer = ({ coverImage, genre, musicUrl, title }: AudioProps) => {
  const [state, setState] = useState({
    play: true,
    volume: 1,
    loop: false,
    shuffle: false,
  });

  const [time, setTime] = useState({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const listOfMusic = useAudio((state) => state.track.listOfMusic);

  const onPressedChangeAudio = useAudio(
    (state) => state.onPressedChangedAudioSrc
  );

  const onPressedChangeTrack = useAudio((state) => state.onPressedChangeTrack);

  const onPressedChangeToPrevious = useCallback(() => {
    const prevMusic = trackingMusic(musicUrl, "previous", listOfMusic);

    if (prevMusic) {
      onPressedChangeAudio(prevMusic);
      onPressedChangeTrack({
        currentAudioSrc: prevMusic.musicUrl,
        listOfMusic: [],
        type: TrackType.SetCurrentMusic,
      });
    }
  }, [listOfMusic, musicUrl, onPressedChangeAudio, onPressedChangeTrack]);

  const onPressedChangeToNext = useCallback(() => {
    const nextMusic = trackingMusic(musicUrl, "next", listOfMusic);

    if (nextMusic) {
      onPressedChangeAudio(nextMusic);

      onPressedChangeTrack({
        currentAudioSrc: nextMusic.musicUrl,
        listOfMusic: [],
        type: TrackType.SetCurrentMusic,
      });
    }
  }, [listOfMusic, musicUrl, onPressedChangeAudio, onPressedChangeTrack]);

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
      setState((prev) => ({ ...prev, play: true }));
    } else {
      audioRef.current?.pause();
      setState((prev) => ({ ...prev, play: false }));
    }
  }, [state.play]);

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
      shuffle: !prev.loop ? false : prev.shuffle,
    }));
  }, []);

  const handleEnded = useCallback(
    (audio: HTMLAudioElement) => {
      if (state.loop) {
        audio.currentTime = 0;
        audio.play();

        setState((prev) => ({ ...prev, play: true }));
      } else {
        setState((prev) => ({ ...prev, play: false }));
      }

      if (state.shuffle) {
        const nextMusic = trackingMusic(musicUrl, "next", listOfMusic);

        if (nextMusic) {
          onPressedChangeAudio(nextMusic);

          onPressedChangeTrack({
            currentAudioSrc: nextMusic.musicUrl,
            listOfMusic: [],
            type: TrackType.SetCurrentMusic,
          });
        } else {
          setState((prev) => ({ ...prev, play: false }));
        }
      }
    },
    [
      listOfMusic,
      musicUrl,
      onPressedChangeAudio,
      onPressedChangeTrack,
      state.loop,
      state.shuffle,
    ]
  );

  const onDragHandleAudio = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;

      setTime((prev) => ({ ...prev, currentTime: seekTime }));
    }
  }, []);

  const onPressedChangeShuffle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      shuffle: !prev.shuffle,
      loop: !prev.shuffle ? false : prev.loop,
    }));
  }, []);

  const onPressedChangeVolume = useCallback(() => {
    if (audioRef.current) {
      const newVolume = state.volume > 0 ? 0 : 1;
      audioRef.current.volume = newVolume;
      setState((prev) => ({ ...prev, volume: newVolume }));
    }
  }, [state.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Space") {
        onPressedPlayAudio();
      }
    });

    if (audio) {
      audio.addEventListener("timeupdate", () => handleTimeUpdate(audio));
      audio.addEventListener("ended", () => handleEnded(audio));

      return () => {
        audio.removeEventListener("timeupdate", () => handleTimeUpdate(audio));
        audio.removeEventListener("ended", () => {});
      };
    }
  }, [handleEnded, handleTimeUpdate, onPressedPlayAudio, state.loop]);

  return (
    <>
      <section className="w-screen h-[120px] fixed bottom-0 right-0 bg-black flex justify-between items-center gap-20 z-[80] px-6">
        <audio
          autoPlay={state.play}
          className="hidden"
          ref={audioRef}
          src={musicUrl}
        />
        {/* IMAGE */}
        <section className="cursor-pointer group hidden sm:flex justify-start items-center gap-3">
          <div className="sm:w-[80px] sm:h-[80px] w-[50px] h-[50px] rounded-md relative overflow-hidden">
            <Image className="object-cover" src={coverImage} alt={title} fill />
          </div>
          <div className="group-hover:opacity-70 transition-opacity">
            <p className="text-lg font-[500] text-white capitalize">{title}</p>
            <p className="text-sm font-[500] text-stone-400">{genre}</p>
          </div>
        </section>
        <section className="flex flex-auto flex-col justify-between items-center pb-8">
          {/* PLAYER */}
          <section className="w-full flex justify-center items-center gap-3 my-6">
            <button
              onClick={onPressedChangeShuffle}
              className={`text-white group relative transition-opacity  ${
                !state.shuffle ? "opacity-50" : ""
              }`}
            >
              <BsShuffle size={20} />
              <Tooltip value="Shuffle" />
            </button>
            <button
              onClick={onPressedChangeToPrevious}
              className={`bg-stone-200 group relative text-stone-800 rounded-full p-3 transition-opacity ${
                trackingMusic(musicUrl, "previous", listOfMusic)
                  ? ""
                  : "opacity-50"
              }`}
            >
              <RiSkipLeftFill size={20} />

              <Tooltip value="Previous" />
            </button>
            <button
              onClick={onPressedPlayAudio}
              className="bg-stone-100 group relative text-stone-800 rounded-full p-4 transition-opacity"
            >
              {!state.play ? <FaPlay size={30} /> : <FaPause size={30} />}
              <Tooltip
                value={state.play ? "Pause" : "Play"}
                className="left-[5%]"
              />
            </button>
            <button
              onClick={onPressedChangeToNext}
              className={`bg-stone-200 group relative text-stone-800 rounded-full p-3 rotate-180 transition-opacity ${
                trackingMusic(musicUrl, "next", listOfMusic) ? "" : "opacity-50"
              }`}
            >
              <RiSkipLeftFill size={20} />
              <Tooltip value="Next" className="top-[70px] rotate-180" />
            </button>
            <button
              onClick={onPressedChangeLoop}
              className={`text-white ${
                state.loop ? "opacity-100" : "opacity-50"
              } transition-opacity group relative `}
            >
              <MdLoop size={20} />

              <Tooltip value="Loop" className="right-[-30px]" />
            </button>
          </section>

          {/* PROGRESS */}
          <nav className="w-full md:max-w-[600px] flex flex-col justify-start items-center gap-2">
            <div className="w-full h-[8px] rounded-full group flex justify-between items-center gap-3">
              <p className="w-[70px] md:w-[85px] text-stone-300  xs:text-sm text-[.7rem] ">
                {formatTime(time.currentTime)}
              </p>
              <input
                type="range"
                min={0}
                max={time.duration}
                value={time.currentTime}
                onChange={onDragHandleAudio}
                className="w-full cursor-pointer accent-stone-700 h-[4px]"
              />
              <p className="w-[70px] md:w-[85px] text-stone-400   xs:text-sm text-[.7rem]">
                {formatTime(time.duration)}
              </p>
            </div>
          </nav>
        </section>

        {/* VOLUME */}
        <section className="md:inline-block hidden relative gap-3 group ">
          <button
            onClick={onPressedChangeVolume}
            className={`bg-stone-200 text-stone-800 rounded-full p-3 hover:opacity-70 transition-opacity ${
              state.volume > 0 ? "opacity-100" : "opacity-50"
            } transition-opacity`}
          >
            {state.volume > 0 ? (
              <FiVolume2 size={20} />
            ) : (
              <FiVolumeX size={20} />
            )}
          </button>

          <div className="absolute bottom-[30px] right-0 rotate-90 bg-stone-700 p-4 rounded-md flex justify-center items-center translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
            <input
              className="h-[3px]"
              type="range"
              onChange={onDragChangeVolume}
              min={0}
              value={state.volume}
              max={1}
            />
          </div>
        </section>
      </section>
    </>
  );
};

//w-[50px] md:w-[80px]
export default AudioPlayer;
