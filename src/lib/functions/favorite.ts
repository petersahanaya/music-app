import { parsedUrl } from "./parsedUrl";

type getFavoriteParams = {
  songId: string;
  userId: string;
};

export const getFavorite = async ({ songId, userId }: getFavoriteParams) => {
  const url = parsedUrl({
    path: "api/favorite",
    searchParams: [
      { key: "songId", value: songId },
      { key: "userId", value: userId },
    ],
  });

  const resp = await fetch(url);

  const { favorite } = (await resp.json()) as { favorite: boolean };

  return favorite;
};

type onPressedLikeParams = {
  songId: string;
  type: "like";
};

export const onPressedLike = async ({ songId, type }: onPressedLikeParams) => {
  const url = parsedUrl({
    path: "api/favorite",
    searchParams: [
      { key: "songId", value: songId },
      { key: "favorite", value: "favorite" },
      { key: "type", value: type },
    ],
  });

  const resp = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();
};
