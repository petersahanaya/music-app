"use client";

import { Music } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import Card from "../card";
import Link from "next/link";
import ListView from "@component/listView";
import RecentlyPlay from "@/components/recentlyPlay";

type CardsProps = {
  listOfMusic: Music[];
  className?: string;
  heading: string;
  link: "/music" | "/history" | "/favorite";
  type?: "history";
};

const Cards = ({ listOfMusic, heading, className, type, link }: CardsProps) => {
  return (
    <main
      className={twMerge(
        `w-full h-full flex flex-col justify-start items-start gap-6 ${className}`
      )}
    >
      <section className="w-full flex justify-between items-center">
        <h3 className="text-3xl capitalize text-white font-[700]">{heading}</h3>

        <Link href={link}>
          <p className="text-stone-400 hover:underline text-sm md:text-xl pr-3">
            see all
          </p>
        </Link>
      </section>

      <section className="w-full h-full">
        {type === "history" ? (
          <RecentlyPlay listOfMusic={listOfMusic} />
        ) : (
          listOfMusic.length && (
            <>
              <ListView>
                {listOfMusic.map((music, idx) => (
                  <Card key={idx} listOfMusic={listOfMusic} music={music} />
                ))}
              </ListView>
            </>
          )
        )}
      </section>
    </main>
  );
};

export default Cards;
