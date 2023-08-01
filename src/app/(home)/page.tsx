import Cards from "@component/list/cards";
import PreviewCarousel from "@component/carousel/previews";
import { Music } from "@prisma/client";

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
  const { listOfMusic } = await getMusic({ take: 9 });

  return (
    <main className="bg-neutral-950 w-full h-full md:mt-40 text-white flex justify-start items-center flex-col pt-8">
      <div className="w-full pb-40 px-5 ">
        {/* <PreviewCarousel
        className="md:w-[90%] w-full"
        listOfMusic={listOfMusic.slice(0, 3)}
      /> */}

        <Cards
          listOfMusic={listOfMusic}
          heading="New Release"
          // className="pt-24 sm:pt-0"
        />
      </div>
    </main>
  );
};

export default Discover;
