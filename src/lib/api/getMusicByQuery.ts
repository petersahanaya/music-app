import { headers } from "next/headers";
import { parsedUrl } from "../functions/parsedUrl";
import { GENRES } from "../validation";
import { Music } from "@prisma/client";

export type SearchPageParams = {
  params: {};
  searchParams: {
    q: string | null;
    genre: (typeof GENRES)[number] | null;
  };
};

export const getMusicByQuery = async ({
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

    const { listOfMusic } = (await resp.json()) as { listOfMusic: Music[] };

    return listOfMusic;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};
