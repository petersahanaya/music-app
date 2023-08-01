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
        `w-full h-full flex flex-col justify-start items-start gap-3 ${className}`
      )}
    >
      <section className="w-full flex justify-between items-center">
        <h3 className="text-4xl capitalize font-[700]">{heading}</h3>

        <Link href="/music">
          <p className="text-stone-200 pr-3">see all</p>
        </Link>
      </section>

      <section className="w-full h-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 grid-rows-3 gap-4">
        {listOfMusic.map((music, idx) => (
          <Card key={idx} music={music} />
        ))}
      </section>
    </main>
  );
};

export default Cards;
