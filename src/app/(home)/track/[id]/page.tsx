import { parsedUrl } from "@/lib/functions/parsedUrl";
import { getMusicAlbum, getMusicParams } from "../../album/page";
import { headers } from "next/headers";
import { Music } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SongDetail from "./songDetail";
import { getMusic } from "../../page";

type Params = {
  params: {
    id: string;
  };
};

type MusicWithAuthor = {
  author: {
    profile: string;
    username: string;
    userId: string;
  };
} & Music;

const getMusicById = async ({ searchParams }: getMusicParams) => {
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

    const { song } = (await resp.json()) as {
      song: MusicWithAuthor;
    };

    return song;
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const Track = async ({ params }: Params) => {
  const session = await getServerSession(authOptions);
  const listOfAlsoLike = await getMusic({ take: 4, type: "" });
  const listOfAlbum = await getMusicAlbum({
    searchParams: [{ key: "album", value: "album" }],
  });
  const song = await getMusicById({
    searchParams: [{ key: "songId", value: params.id }],
  });

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll ">
      <SongDetail
        song={song}
        coverImage={song.coverImage}
        favorite={song.favoriteId === session?.user.userId}
        listOfAlsoLike={listOfAlsoLike}
        listOfMusic={listOfAlbum}
        lyrics={song.lyric}
        profile={song.author.profile}
        title={song.title}
        userProfileHref="/user"
        username={song.author.username}
      />
    </main>
  );
};

export default Track;
