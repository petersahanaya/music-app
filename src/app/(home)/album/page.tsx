import Header from "@component/header";
import Center from "@component/center";
import Link from "next/link";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { headers } from "next/headers";
import { Music } from "@prisma/client";
import Cards from "@component/list/cards";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";
import AlertSign from "@component/alert/signIn";
import Detail from "@component/detail";

export type getMusicParams = {
  searchParams: {
    key: string;
    value: string;
  }[];
};

export const getMusicAlbum = async ({ searchParams }: getMusicParams) => {
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

    const { listOfAlbum } = (await resp.json()) as { listOfAlbum: Music[] };

    return listOfAlbum;
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const Album = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
        <AlertSign />
      </main>
    );
  }

  const listOfAlbum = await getMusicAlbum({
    searchParams: [
      { key: "album", value: "album" },
      { key: "take", value: String(8) },
    ],
  });

  return (
    <div className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
      {!listOfAlbum.length && (
        <Center className="flex-col">
          <h4 className="text-3xl text-stone-200 font-[700]">
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

      {listOfAlbum.length && (
        <Detail
          title="My Albums"
          views={`${listOfAlbum.reduce((a, b) => b.views + 0, 0)} total views`}
          largeImage={listOfAlbum[1].largeImage}
          listOfMusic={listOfAlbum}
        />
      )}
    </div>
  );
};

export default Album;
