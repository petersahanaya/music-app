import { headers } from "next/headers";
import { parsedUrl } from "../functions/parsedUrl";
import { Music } from "@prisma/client";

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

    const { listOfAlbum } = (await resp.json()) as { listOfAlbum: Music[] };

    return listOfAlbum;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};
