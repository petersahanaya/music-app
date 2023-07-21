"use client";
import { ReactClassName } from "@/types/types";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type ListTileProps = {
  onClick?: () => void;
} & ReactClassName;

const ListTile = ({
  children,
  className,
  onClick ,
}: ListTileProps) => {
  return (
    <motion.div
      onClick={onClick}
      role="button"
      className={twMerge(
        `p-2 flex w-full rounded-full justify-start items-center gap-3 ${className}`
      )}
    >
      {children}
    </motion.div>
  );
};

export default ListTile;
