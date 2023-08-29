"use client";

import { ReactClassName } from "@/types/types";
import { twMerge } from "tailwind-merge";

const ListView = ({ children, className }: ReactClassName) => {
  return (
    <section
      className={twMerge(
        `w-full grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-3  grid-rows-3 xl:grid-rows-2 justify-items-center gap-4 ${className}`
      )}
    >
      {children}
    </section>
  );
};

export default ListView;
