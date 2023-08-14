"use client";

import { twMerge } from "tailwind-merge";

type CardLoadingProps = {
  className?: string;
};

const CardLoading = ({ className }: CardLoadingProps) => {
  return (
    <article
      className={twMerge(
        `w-full h-[300px] bg-stone-600 rounded-md p-3 group flex flex-col justify-start items-center animate-pulse gap-4 ${className}`
      )}
    >
      <div className="w-full h-[70%] overflow-hidden rounded-md bg-stone-700"></div>

      <section className="w-full flex flex-col justify-start items-start gap-2">
        <div
          style={{ animationDelay: "100ms" }}
          className="w-[40%] p-4 rounded-xl bg-stone-700 overflow-hidden animate-pulse"
        ></div>
        <div
          style={{ animationDelay: "150ms" }}
          className="w-full p-3 rounded-xl bg-stone-700 overflow-hidden animate-pulse"
        ></div>
      </section>
    </article>
  );
};

export default CardLoading;
