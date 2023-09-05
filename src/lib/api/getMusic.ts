import { Music } from "@prisma/client";
import { headers } from "next/headers";
import { parsedUrl } from "../functions/parsedUrl";

export type getMusicParam = {
  take: number;
  type: "history" | "";
};

export const getMusic = async ({ take, type }: getMusicParam) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams: [
      { key: "type", value: type },
      { key: "take", value: String(take) },
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
      if (type === "history") {
        return [];
      }

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
