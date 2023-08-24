import { authOptions } from "@auth/route";
import AlertSign from "@component/alert/signIn";
import Header from "@component/header";
import { getServerSession } from "next-auth";
import { getMusicParams } from "../album/page";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { headers } from "next/headers";
import { Music } from "@prisma/client";
import Center from "@component/center";
import Link from "next/link";
import Detail from "@component/detail";
import Footer from "@component/footer";

const getHistoryMusic = async ({ searchParams }: getMusicParams) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams,
  });

  try {
    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headers(),
    });

    if (!resp.ok) {
      throw new Error("Error when try to fetch.");
    }

    const { listOfMusic } = (await resp.json()) as {
      listOfMusic: Music[];
    };

    return listOfMusic;
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const History = async () => {
  const session = await getServerSession(authOptions);
  const listOfHistoryMusic = await getHistoryMusic({
    searchParams: [
      { key: "take", value: String(8) },
      { key: "type", value: "history" },
    ],
  });

  if (!session || !session.user) {
    return (
      <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
        <Header />
        <AlertSign />
      </main>
    );
  }

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl  pb-32">
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

      <Footer/>
    </main>
  );
};

export default History;
