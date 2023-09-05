"use client";

import FloatingButton from "@component/button/floating";

import { Music } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

type CardProps = {
  music: Music;
  listOfMusic: Music[];
  className?: string;
};

const Card = ({ listOfMusic, music, className }: CardProps) => {
  const router = useRouter();

  const onPressedRedirectToTrack = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    router.push(`/track/${music.id}`);
  };

  return (
    <>
      <article
        onClick={onPressedRedirectToTrack}
        className={twMerge(
          `w-full xs:h-[300px] h-[230px] cursor-pointer bg-[#232323] hover:bg-white/20 transition-colors rounded-md p-3 group ${className} flex flex-col justify-start items-center gap-4`
        )}
      >
        <div className="w-full h-[70%] relative overflow-hidden rounded-md">
          <Image
            className="object-cover "
            src={music.largeImage}
            alt={music.title}
            fill
          />

          <FloatingButton music={music} listOfMusic={listOfMusic} />
        </div>

        <section className="w-full flex flex-col justify-start items-start gap-2">
          <h4 className="w-full text-lg xs:text-xl font-[700] text-stone-200 capitalize lg:text-xl font-400 whitespace-nowrap text-ellipsis overflow-hidden">
            {music.title}
          </h4>
          <p className="w-full text-sm xs:text-lg lg:text-lg text-stone-400 line-clamp-2 text-ellipsis overflow-hidden">
            {music.description}
          </p>
        </section>
      </article>
    </>
  );
};

export default Card;
