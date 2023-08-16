"use client";
import { ReactClassName } from "@/types/types";
import { twMerge } from "tailwind-merge";

const Center = ({ className, children }: ReactClassName) => {
  return (
    <section
      className={twMerge(
        `w-full h-full flex justify-center items-center flex-col gap-3 ${className}`
      )}
    >
      {children}
    </section>
  );
};

export default Center;
