"use client";

import { Music } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { VscDebugStart } from "react-icons/vsc";
import { useAudio } from "@/state/store/audio";

type CardProps = {
  music: Music;
  className?: string;
};

const Card = ({ music, className }: CardProps) => {
  const onPressedChangeAudioSrc = useAudio((state) => state.onPressedChangedAudio)

  return (
    <article
      className={twMerge(
        `w-[200px] cursor-pointer h-[300px] group ${className}`
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
          onClick={() => onPressedChangeAudioSrc(music.musicUrl)}
          className="absolute bottom-[10px] right-[10px] w-max opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 h-max p-2 rounded-full bg-green-500 hover:bg-green-600 text-stone-950 transition-all"
        >
          <VscDebugStart size={30} />
        </div>
      </div>

      <section className="w-full">
        <h4 className="text-lg font-400">{music.title}</h4>
        <p className="w-full text-stone-300 line-clamp-2 text-ellipsis overflow-hidden">
          {music.description}
        </p>
      </section>
    </article>
  );
};

export default Card;
