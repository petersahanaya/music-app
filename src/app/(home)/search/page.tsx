import { parsedUrl } from "@lib/functions/parsedUrl";
import { Music } from "@prisma/client";
import { headers } from "next/headers";
import DetailSearch from "./DetailSearch";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";
import { GENRES } from "@lib/validation";
import Footer from "@component/footer";

type SearchPageParams = {
  params: {};
  searchParams: {
    q: string | null;
    genre: (typeof GENRES)[number] | null;
  };
};

const getMusicByQuery = async ({
  genre,
  q,
}: SearchPageParams["searchParams"]) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams: [
      { key: "type", value: "search" },
      { key: "genre", value: genre === "all" ? "" : genre || "" },
      { key: "q", value: q || "" },
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
    console.log(e);

    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const SearchPage = async ({ params, searchParams }: SearchPageParams) => {
  const listOfMusic = await getMusicByQuery({ ...searchParams });
  const session = await getServerSession(authOptions);

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl pb-32">      
      <DetailSearch
        g={searchParams.genre || "all"}
        q={searchParams.q}
        session={session}
        listOfMusic={listOfMusic}
      />

      <Footer />
    </main>
  );
};

export default SearchPage;
