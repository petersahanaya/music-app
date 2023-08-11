import Cards from "@component/list/cards";
import PreviewCarousel from "@component/carousel/previews";
import { Music } from "@prisma/client";
import Header from "@component/header";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

type getMusicParam = {
  take: number;
};

const getMusic = async ({ take }: getMusicParam) => {
  try {
    const resp = await fetch(`http://localhost:3000/api/song?take=${take}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!resp.ok) {
      throw new Error("Error when try to fetch.");
    }

    const { listOfMusic } = (await resp.json()) as { listOfMusic: Music[] };

    return { listOfMusic };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Something went wrong");
  }
};

const Discover = async () => {
  const { listOfMusic } = await getMusic({ take: 12 });

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl ">
      <Header />

      <section className="w-full h-full overflow-y-scroll">
        <Cards
          heading="New Trending"
          listOfMusic={listOfMusic}
          className="mt-32 px-3 pb-12"
        />
      </section>
    </main>
  );
};

export default Discover;
