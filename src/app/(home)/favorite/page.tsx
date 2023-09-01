import AlertSign from "@component/alert/signIn";
import HeaderPhone from "@component/sidebar/header";
import Center from "@component/center";
import Header from "@component/header";
import Detail from "@component/detail";

import { authOptions } from "@auth/route";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Link from "next/link";

import { getMusicParams } from "../album/page";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { Music } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorite - P3Music",
  description: "Favorite and listen to a wide range of music on P3Music.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: ["music", "streaming", "playlists", "artists", "albums"],
  authors: {
    name: "Peter Sahanaya",
    url: "https://linkedin.com/in/peter-sahanaya",
  },
  openGraph: {
    type: "music.song",
    url: "https://p3music.vercel.app",
    title: "My Favorite - P3Music",
    description: "Favorite and listen to a wide range of music on P3Music.",
    emails: ["petersahanaya09@gmail.com"],
    images: ["/favicon.png"],
  },
};

const getFavoriteMusic = async ({ searchParams }: getMusicParams) => {
  const url = parsedUrl({
    path: `api/song`,
    searchParams,
  });

  const header = headers();

  try {
    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        cookie: header.get("cookie") || "",
      },
    });

    if (!resp.ok) {
      throw new Error("Error when try to fetch.");
    }

    const { listOfFavorite } = (await resp.json()) as {
      listOfFavorite: Music[];
    };

    return listOfFavorite;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const FavoritePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
        <Header />
        <AlertSign />
      </main>
    );
  }

  const listOfFavorite = await getFavoriteMusic({
    searchParams: [
      { key: "favorite", value: "favorite" },
      { key: "take", value: String(8) },
    ],
  });
  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll  pb-32">
      <HeaderPhone />

      {!listOfFavorite.length && (
        <Center className="flex-col">
          <h4 className="text-3xl text-stone-200 font-[700]">
            You don&apos;t have favorite song yet 🪹
          </h4>
          <Link
            href="/"
            className="bg-white w-[160px] text-black font-[700] text-xl rounded-full p-3 text-center capitalize"
          >
            See Music
          </Link>
        </Center>
      )}

      {listOfFavorite.length && (
        <Detail
          session={session}
          title="My Favorite"
          views={`${listOfFavorite.reduce(
            (a, b) => b.views + 0,
            0
          )} total views`}
          largeImage={listOfFavorite[0].largeImage}
          listOfMusic={listOfFavorite}
        />
      )}
    </main>
  );
};

export default FavoritePage;
