"use client";

import { Music } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import Card from "../card";
import Link from "next/link";

type CardsProps = {
  listOfMusic: Music[];
  className?: string;
  heading: string;
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
          <p className="text-stone-200 md:text-xl pr-3">see all</p>
        </Link>
      </section>

      <section className="w-full grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-3 xl:grid-rows-2 justify-items-center gap-4">
        {listOfMusic.map((music, idx) => (
          <Card key={idx} listOfMusic={listOfMusic} music={music} />
        ))}
      </section>
    </main>
  );
};

export default Cards;
