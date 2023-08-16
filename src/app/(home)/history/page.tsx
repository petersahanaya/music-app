import { authOptions } from "@auth/route";
import AlertSign from "@component/alert/signIn";
import Header from "@component/header";
import { getServerSession } from "next-auth";

const History = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
        <Header />
        <AlertSign />
      </main>
    );
  }

  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll  pb-32">
      <Header />
    </main>
  );
};

export default History;
