import Footer from "@component/footer";
import DetailSearch from "./DetailSearch";

import { SearchPageParams, getMusicByQuery } from "@lib/api/getMusicByQuery";

import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";

const SearchPage = async ({ params, searchParams }: SearchPageParams) => {
  const listOfMusic = await getMusicByQuery({ ...searchParams });
  const session = await getServerSession(authOptions);

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl pb-32">
      <DetailSearch
        g={searchParams.genre || "all"}
        q={searchParams.q}
        session={session}
        listOfMusic={listOfMusic}
      />

      <Footer />
    </main>
  );
};

export default SearchPage;
