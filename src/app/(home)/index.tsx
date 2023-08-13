"use client";

import { Music } from "@prisma/client";
import Cards from "@component/list/cards";
import { Session } from "next-auth";

type MainContentProps = {
  listOfMusic: Music[];
  historyMusic: Music[];
  session: Session | null;
};

const MainContent = ({
  listOfMusic,
  historyMusic,
  session,
}: MainContentProps) => {
  return (
    <main className="w-full h-full">
      {session && session.user && <section className="w-full">
        <Cards
          heading="Recently Played"
          listOfMusic={historyMusic}
          className="mt-32 px-3 pb-12"
        />
      </section>}
      <section className="w-full h-full">
        <Cards
          heading="New Trending"
          listOfMusic={listOfMusic}
          className="mt-32 px-3 pb-12"
        />
      </section>
    </main>
  );
};

export default MainContent;
