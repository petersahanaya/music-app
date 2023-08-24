import { Music } from "@prisma/client";
import { headers } from "next/headers";
import Header from "@component/header";
import MainContent from ".";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";
import Footer from "@component/footer";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

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

  try {
    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headers(),
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
    console.log(e);

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
