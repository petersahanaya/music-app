import { getServerSession } from "next-auth";
import Path from "./path";
import AuthDropDown from "@component/dropdown/auth";
import { OPTIONS } from "@auth/route";

const Header = async () => {
  const session = await getServerSession(OPTIONS);

  return (
    <header className="md:w-[80%] w-full h-[120px] p-2 bg-stone-900 md:rounded-2xl border-b-[1px] border-b-stone-800 fixed md:top-[1rem] top-0 right-0 z-50">
      <Path session={session} />

      <AuthDropDown />
    </header>
  );
};

export default Header;
