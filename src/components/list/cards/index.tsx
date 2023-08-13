"use client";

import { Music } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import Card from "../card";
import Link from "next/link";
import ListView from "@component/listView";

type CardsProps = {
  listOfMusic: Music[];
  className?: string;
  heading: string;
  type?: "history";
};

const Cards = ({ listOfMusic, heading, className }: CardsProps) => {
  return (
    <main
      className={twMerge(
        `w-full h-full flex flex-col justify-start items-start gap-6 ${className}`
      )}
    >
      <section className="w-full flex justify-between items-center">
        <h3 className="text-3xl capitalize text-white font-[700]">{heading}</h3>

        <Link href="/music">
          <p className="text-stone-400 hover:underline text-sm md:text-xl pr-3">
            see all
          </p>
        </Link>
      </section>

      <section className="w-full h-full">
        {listOfMusic.length ? (
          <ListView>
            {listOfMusic.map((music, idx) => (
              <Card key={idx} listOfMusic={listOfMusic} music={music} />
            ))}
          </ListView>
        ) : (
          <p className="text-2xl font-[700] text-white">Nothing 😴</p>
        )}
      </section>
    </main>
  );
};

export default Cards;
