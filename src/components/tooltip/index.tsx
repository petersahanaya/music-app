"use client";

import { twMerge } from "tailwind-merge";

type TooltipProps = {
  className?: string;
  value: string;
};

const Tooltip = ({ value, className }: TooltipProps) => {
  return (
    <p
      className={twMerge(
        `absolute opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 top-[-70px] right-[-5%] bg-stone-700 text-white font-[400] p-3 rounded-md ${className}`
      )}
    >
      {value}
    </p>
  );
};

export default Tooltip;
