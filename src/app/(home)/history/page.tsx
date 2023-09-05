import Footer from "@component/footer";
import Detail from "@component/detail";
import HeaderPhone from "@component/sidebar/header";
import AlertSign from "@component/alert/signIn";
import Header from "@component/header";
import Center from "@component/center";

import { getHistoryMusic } from "@lib/api/getHistory";
import { historyMetaData } from "@lib/metadata";

import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = historyMetaData;

const History = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
        <Header />
        <AlertSign />
      </main>
    );
  }
  const listOfHistoryMusic = await getHistoryMusic({
    searchParams: [
      { key: "take", value: String(8) },
      { key: "type", value: "history" },
    ],
  });

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl  pb-32">
      <HeaderPhone />

      {!listOfHistoryMusic.length && (
        <Center className="flex-col">
          <h4 className="sm:text-3xl px-3 text-lg text-stone-200 font-[700] ">
            Your album is empty 🪹
          </h4>
          <Link
            href="/"
            className="bg-white w-[160px] text-black font-[700] text-xl rounded-full p-3 text-center"
          >
            Get Song
          </Link>
        </Center>
      )}

      {listOfHistoryMusic.length && (
        <Detail
          session={session}
          title="My History"
          views={`${listOfHistoryMusic.reduce(
            (a, b) => b.views + 0,
            0
          )} total views`}
          largeImage={listOfHistoryMusic[0].largeImage}
          listOfMusic={listOfHistoryMusic}
        />
      )}

      <Footer />
    </main>
  );
};

export default History;
