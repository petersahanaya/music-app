"use client";

import { Music } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type PreviewProps = {
  listOfMusic: Music[];
  className?: string;
};

const PreviewCarousel = ({ listOfMusic, className }: PreviewProps) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => {
        if (selected !== listOfMusic.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [listOfMusic.length, selected]);

  return (
    <nav
      className={twMerge(
        `w-full md:h-[250px] h-[400px] rounded-md overflow-hidden ${className}`
      )}
    >
      <section
        style={{ flex: "0 0 100%" }}
        className="w-full h-[90%] rounded-md overflow-hidden flex justify-start items-start"
      >
        {listOfMusic.map((music, idx) => (
          <motion.div
            animate={{
              translateX: `${1 - 100 * selected + (idx - selected) * 100}%`,
            }}
            transition={{
              duration: 0.4,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{ flex: "0 0 100%" }}
            className="relative h-full w-full rounded-md "
            onClick={() => {}}
            key={idx}
          >
            <Image
              className="object-cover"
              fill
              src={music.largeImage}
              alt={music.title}
            />
            <div className="absolute top-0 left-0 z-40 w-full h-full rounded-sm bg-gradient-to-t from-stone-800/60 to-transparent"></div>

            {/* <div className="absolute p-4 md:top-[50%] top-[65%] left-0 z-40 w-full h-full rounded-sm">
              <h4 className="text-3xl font-[700]">{music.title}</h4>
              <p className="line-clamp-2 overflow-hidden text-ellipsis w-[80%]">
                {music.description}
              </p>
            </div> */}
          </motion.div>
        ))}
      </section>
      <section className="w-full  flex justify-center items-center gap-3 mt-4">
        {Array(listOfMusic.length)
          .fill(1)
          .map((_, idx) => (
            <div
              onClick={() => setSelected(idx)}
              className={twMerge(
                `w-[8px] h-[8px] rounded-full ${
                  selected === idx ? "bg-white scale-150" : "bg-stone-400"
                } transition-all`
              )}
              role="button"
              key={idx}
            ></div>
          ))}
      </section>
    </nav>
  );
};

export default PreviewCarousel;
