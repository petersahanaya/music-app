"use client";

import { Music } from "@prisma/client";
import Cards from "@component/list/cards";
import { Session } from "next-auth";
import Footer from "@/components/footer";

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
    <main className="w-full h-max bg-stone-900 rounded-bl-2xl">
      {session && session.user && (
        <section className="w-full">
          <Cards
            heading="Recently Played"
            listOfMusic={historyMusic}
            className="px-3 pb-3 "
            type="history"
            link="/history"
          />
        </section>
      )}
      <section className="w-full h-full mt-8">
        <Cards
          heading="New Trending"
          listOfMusic={listOfMusic}
          className={`px-3 pb-12 ${!session || !session.user ? "mt-0" : ""}`}
          link="/songs"
        />
      </section>
    </main>
  );
};

export default MainContent;
