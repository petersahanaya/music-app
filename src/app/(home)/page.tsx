import Cards from "@component/list/cards";
import PreviewCarousel from "@component/carousel/previews";
import { Music } from "@prisma/client";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const getMusic = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/song", {
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
  const { listOfMusic } = await getMusic();

  return (
    <main className="bg-neutral-950 w-full h-full md:mt-60  text-white flex justify-start items-center flex-col md:pt-4 pt-8 md:px-0 px-0">
      {/* <PreviewCarousel
        className="md:w-[90%] w-full"
        listOfMusic={listOfMusic.slice(0, 3)}
      /> */}

      <Cards
        listOfMusic={listOfMusic}
        heading="New Release"
        className="pt-24 sm:pt-0"
      />
    </main>
  );
};

export default Discover;
