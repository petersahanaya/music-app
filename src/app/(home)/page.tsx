import Footer from "@component/footer";
import Header from "@component/header";
import MainContent from ".";

import { authOptions } from "@auth/route";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { getMusic } from "@/lib/api/getMusic";
import { discoverMetaData } from "@/lib/metadata";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export const metadata: Metadata = discoverMetaData;

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
