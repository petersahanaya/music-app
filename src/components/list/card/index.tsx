"use client";

import { Music } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useAudio } from "@state/store/audio";
import { useAlertUnAuthenticate } from "@state/store/alert";
import { useSession } from "next-auth/react";
import { FaPlay, FaPause } from "react-icons/fa";

type CardProps = {
  music: Music;
  className?: string;
};

const Card = ({ music, className }: CardProps) => {
  const onPressedChangeAudioSrc = useAudio(
    (state) => state.onPressedChangedAudioSrc
  );

  const track = useAudio((state) => state.track);

  const onPressedAlertUnAuthenticate = useAlertUnAuthenticate(
    (state) => state.onPressedChangeAlertUnauthenticate
  );

  const { data: session } = useSession();

  const onPressedSetAudio = () => {
    if (!session || !session.user) {
      onPressedAlertUnAuthenticate(music.coverImage);
    } else {
      onPressedChangeAudioSrc(music);
    }
  };

  return (
    <>
      <article
        className={twMerge(
          `w-[200px] cursor-pointer h-[300px] bg-neutral-900 hover:bg-white/20 transition-colors rounded-md p-2 group ${className}`
        )}
      >
        <div className="w-full h-[70%] relative overflow-hidden rounded-md">
          <Image
            className="object-cover"
            src={music.coverImage}
            alt={music.title}
            fill
          />
          <div
            onClick={onPressedSetAudio}
            className={`absolute bottom-[10px] right-[10px] w-max opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 h-max p-4 rounded-full bg-stone-100 hover:bg-stone-300 ${
              track.audioSrc === music.musicUrl && "translate-y-0 opacity-100"
            } text-stone-950 transition-all`}
          >
            {track.audioSrc === music.musicUrl ? (
              <FaPause size={25} />
            ) : (
              <FaPlay size={25} />
            )}
          </div>
        </div>

        <section className="w-full">
          <h4 className="text-lg font-400">{music.title}</h4>
          <p className="w-full text-stone-300 line-clamp-2 text-ellipsis overflow-hidden">
            {music.description}
          </p>
        </section>
      </article>
    </>
  );
};

export default Card;
