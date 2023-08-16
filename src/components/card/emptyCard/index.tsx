"use client";

import { ReactClass } from "@/types/types";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const EmptyCard = ({ className }: ReactClass) => {
  return (
    <section
      className={twMerge(
        `w-full h-[300px] cursor-pointer bg-[#232323] hover:opacity-80 transition-opacity rounded-md p-3 group gap-4 flex flex-col justify-center items-center ${className}`
      )}
    >
      <BsMusicNoteBeamed size={90} className="text-stone-700" />
    </section>
  );
};

export default EmptyCard;
