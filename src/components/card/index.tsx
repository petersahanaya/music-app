"use client";

import { motion } from "framer-motion";
import { FormSchema } from "../dropdown/post/form";
import Image from "next/image";

type CardProps = {
  props: FormSchema;
};

const Card = ({ props }: CardProps) => {
  return (
    <motion.section className="w-[280px] h-[370px] bg-stone-900 p-4 rounded-md flex flex-col justify-start items-start gap-3">
      <div className="w-full h-[80%] relative p-4 rounded-md overflow-hidden">
        <Image
          fill
          className="object-cover"
          src={URL.createObjectURL(props.coverImage!)}
          alt="cover image"
        />
      </div>

      <div>
        <p className="text-stone-200 text-xl font-[600] whitespace-nowrap text-ellipsis overflow-hidden">
          {props.title}
        </p>
        <p className="text-stone-400 text-lg line-clamp-2 text-ellipsis overflow-hidden">
          {props.description}
        </p>
      </div>
    </motion.section>
  );
};

export default Card;
