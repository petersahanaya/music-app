import { Music } from "@prisma/client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
  const listOfMusic = await getMusic();

  return (
    <main className="bg-neutral-950 w-full h-full md:mt-60 text-white">
      {JSON.stringify(listOfMusic)}
    </main>
  );
};

export default Discover;
