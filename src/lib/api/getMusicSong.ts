import { Music } from "@prisma/client";
import { parsedUrl } from "../functions/parsedUrl";
import { headers } from "next/headers";

export type getMusicParam = {
  take: number;
  popular: boolean | null;
  news: boolean | null;
};

export const getMusic = async ({ take, news, popular }: getMusicParam) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams: [
      { key: "take", value: String(take) },
      { key: "new", value: news ? "new" : "" },
      { key: "popular", value: popular ? "popular" : "" },
    ],
  });

  const header = headers();

  try {
    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { cookie: header.get("cookie") || "" },
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
