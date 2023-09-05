import { headers } from "next/headers";
import { parsedUrl } from "../functions/parsedUrl";
import { getMusicParams } from "./getAlbum";
import { Music } from "@prisma/client";

export const getFavoriteMusic = async ({ searchParams }: getMusicParams) => {
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
