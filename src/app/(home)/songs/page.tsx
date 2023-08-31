import Detail from "@component/detail";

import { parsedUrl } from "@lib/functions/parsedUrl";

import { authOptions } from "@auth/route";
import { Session, getServerSession } from "next-auth";
import { headers } from "next/headers";
import { Music } from "@prisma/client";

export type SongsParams = {
  params: {};
  searchParams: {
    take: string | null;
    popular: boolean | null;
    news: boolean | null;
  };
};

export type getMusicParam = {
  take: number;
  popular: boolean | null;
  news: boolean | null;
};

const getMusic = async ({ take, news, popular }: getMusicParam) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams: [
      { key: "take", value: String(take) },
      { key: "new", value: news ? "new" : "" },
      { key: "popular", value: popular ? "popular" : "" },
    ],
  });

  try {
    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      // headers: headers(),
    });

    if (!resp.ok) {
      throw new Error("Error when try to fetch.");
    }

    const { listOfMusic } = (await resp.json()) as { listOfMusic: Music[] };

    return listOfMusic;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const Songs = async ({ params, searchParams }: SongsParams) => {
  const listOfMusic = await getMusic({
    take: Number(searchParams.take) || 20,
    news: searchParams.news,
    popular: searchParams.popular,
  });
  const session = await getServerSession(authOptions);

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll  pb-32">
      <Detail
        title="Songs"
        session={session as Session}
        views={`${searchParams.news ? "New" : "All"} ${
          searchParams.popular ? "Popular" : "all"
        } published songs`}
        listOfMusic={listOfMusic}
        largeImage={listOfMusic[0].largeImage}
      />
    </main>
  );
};

export default Songs;
