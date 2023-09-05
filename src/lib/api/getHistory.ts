import { headers } from "next/headers";
import { parsedUrl } from "../functions/parsedUrl";
import { Music } from "@prisma/client";
import { getMusicParams } from "./getAlbum";

export const getHistoryMusic = async ({ searchParams }: getMusicParams) => {
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

    const { listOfMusic } = (await resp.json()) as {
      listOfMusic: Music[];
    };

    return listOfMusic;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};
