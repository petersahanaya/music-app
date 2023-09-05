import Detail from "@component/detail";

import { authOptions } from "@auth/route";
import { Session, getServerSession } from "next-auth";

import { getMusic } from "@lib/api/getMusicSong";

export type SongsParams = {
  params: {};
  searchParams: {
    take: string | null;
    popular: boolean | null;
    news: boolean | null;
  };
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
