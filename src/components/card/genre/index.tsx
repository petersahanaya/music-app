"use client";

import { parsedUrl } from "@lib/functions/parsedUrl";
import { ReactClass } from "@/types/types";
import { useRouter } from "next/navigation";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type GenreCardProps = {
  title: string;
  href: string;
} & ReactClass;

const GenreCard = ({ className, title, href }: GenreCardProps) => {
  const router = useRouter();

  const onPressedChangeParams = () => {
    console.log(window.location.href);

    const url = parsedUrl({
      path: "/genres",
      searchParams: [{ key: "genre", value: href }],
    });

    router.replace(url, { scroll: true });
  };

  return (
    <button
      className={twMerge(
        `w-full h-[200px] cursor-pointer hover:opacity-75 transition-colors rounded-xl p-3 group relative flex flex-col justify-start items-center gap-4 ${className}`
      )}
      onClick={onPressedChangeParams}
    >
      <h4 className="text-3xl absolute top-[10px] left-[10px] capitalize text-white font-[700]">
        {title}
      </h4>
      <BsMusicNoteBeamed size={80} className="text-stone-800" />
    </button>
  );
};

export default GenreCard;
