import ListView from "@component/listView";
import GenreCard from "@component/card/genre";
import Detail from "@component/detail";
import AlertSign from "@component/alert/signIn";
import Header from "@component/header";
import Center from "@component/center";
import Footer from "@component/footer";

import { ACCEPTED_GENRE } from "@lib/validation";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { headers } from "next/headers";
import { Music } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";
import Link from "next/link";

type getMusicOnGenreParams = {
  genre: string;
  take: number;
};

const getMusicOnGenre = async ({ genre, take }: getMusicOnGenreParams) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams: [
      { key: "genre", value: genre },
      { key: "take", value: String(take) },
    ],
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

    const { listOfMusic } = (await resp.json()) as { listOfMusic: Music[] };

    return listOfMusic;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const listOfGenre = ACCEPTED_GENRE.map((genre) => ({
  title: genre,
  params: genre,
  className: [
    "bg-[#7458ff]",
    "bg-[#2D46B9]",
    "bg-[#BD5A00]",
    "bg-[#148A06]",
    "bg-[#E91528]",
  ],
}));

type GenreParams = {
  params: {};
  searchParams: {
    genre: string | null;
  };
};

const Genres = async ({ params, searchParams }: GenreParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
        <AlertSign />
      </main>
    );
  }

  const listOfMusic = await getMusicOnGenre({
    genre: searchParams.genre || "",
    take: 20,
  });

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl  pb-32">
      {!searchParams.genre && <Header />}

      <section
        className={`w-full md:rounded-2xl ${
          !listOfMusic.length ? "h-full" : "h-max"
        }`}
      >
        {!searchParams.genre && (
          <>
            <ListView className="px-3">
              {listOfGenre.map((genre, idx) => (
                <GenreCard
                  key={idx}
                  title={genre.title}
                  href={genre.params}
                  className={genre.className[idx]}
                />
              ))}
            </ListView>
          </>
        )}

        {searchParams.genre && listOfMusic.length && (
          <>
            <Detail
              largeImage={listOfMusic[0].largeImage}
              listOfMusic={listOfMusic}
              session={session}
              title={searchParams.genre}
              views={`${listOfMusic.reduce(
                (a, b) => b.views + 0,
                0
              )} total views`}
              key={searchParams.genre}
            />
          </>
        )}

        {searchParams.genre && !listOfMusic.length && (
          <Center>
            <div className="flex flex-col justify-center items-center gap-3">
              <h4 className="text-3xl text-stone-200 font-[700]">
                There&apos;s no song yet on this genre 🤖
              </h4>
              <Link
                href="/genres"
                className="bg-white w-[160px] text-black font-[700] text-xl rounded-full p-3 text-center"
              >
                back
              </Link>
            </div>
          </Center>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Genres;
