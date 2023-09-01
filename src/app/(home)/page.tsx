import Footer from "@component/footer";
import Header from "@component/header";
import MainContent from ".";

import { Music } from "@prisma/client";
import { headers } from "next/headers";

import { authOptions } from "@auth/route";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export type getMusicParam = {
  take: number;
  type: "history" | "";
};

export const metadata: Metadata = {
  title: "Discover - P3Music",
  description: "Discover and listen to a wide range of music on P3Music.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: ["music", "streaming", "playlists", "artists", "albums"],
  authors: {
    name: "Peter Sahanaya",
    url: "https://linkedin.com/in/peter-sahanaya",
  },
  openGraph: {
    type: "music.song",
    url: "https://p3music.vercel.app",
    title: "Discover - P3Music",
    description: "Discover and listen to a wide range of music on P3Music.",
    emails: ["petersahanaya09@gmail.com"],
    images: ["/favicon.png"],
  },
};

export const getMusic = async ({ take, type }: getMusicParam) => {
  const url = parsedUrl({
    path: "api/song",
    searchParams: [
      { key: "type", value: type },
      { key: "take", value: String(take) },
    ],
  });

  const header = headers()

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

const Discover = async () => {
  const session = await getServerSession(authOptions);

  const [listOfMusic, historyMusic] = await Promise.all([
    getMusic({ take: 12, type: "" }),
    getMusic({ take: 4, type: "history" }),
  ]);

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl pb-32">
      <Header />

      <MainContent
        session={session}
        historyMusic={historyMusic}
        listOfMusic={listOfMusic}
      />

      <Footer />
    </main>
  );
};

export default Discover;
