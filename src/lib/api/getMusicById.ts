import { headers } from "next/headers";
import { parsedUrl } from "../functions/parsedUrl";
import { Music } from "@prisma/client";
import { getMusicParams } from "./getAlbum";

type MusicWithAuthor = {
  author: {
    profile: string;
    username: string;
    userId: string;
  };
} & Music;

export const getMusicById = async ({ searchParams }: getMusicParams) => {
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

    const { song } = (await resp.json()) as {
      song: MusicWithAuthor;
    };

    return song;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};
