"use client";

import { ReactChild } from "@/types/types";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  className?: string;
  types?: "fill" | "outline";
  type?: "button" | "submit";
  loader?: boolean;
  onClick: () => void;
} & ReactChild;

const Button = ({
  className,
  children,
  types = "fill",
  loader = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `p-2 rounded-sm ${
          types === "outline"
            ? "border-[2px] border-stone-300"
            : "bg-stone-700 text-stone-100"
        } ${className}`
      )}
    >
      {!loader ? (
        children
      ) : (
        <p className="text-sm uppercase animate-pulse">loading..</p>
      )}
    </button>
  );
};

export default Button;
