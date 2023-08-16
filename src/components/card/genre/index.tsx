"use client";

import { ReactClass } from "@/types/types";
import Link from "next/link";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type GenreCardProps = {
  title: string;
  href: string;
} & ReactClass;

const GenreCard = ({ className, title, href }: GenreCardProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `w-full h-[200px] cursor-pointer hover:opacity-75 transition-colors rounded-xl p-3 group relative flex flex-col justify-start items-center gap-4 ${className}`
      )}
    >
      <h4 className="text-3xl absolute top-[10px] left-[10px] capitalize text-white font-[700]">
        {title}
      </h4>
      <BsMusicNoteBeamed size={80} className="text-stone-800" />
    </Link>
  );
};

export default GenreCard;
