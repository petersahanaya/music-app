import { getServerSession } from "next-auth";
import Path from "./path";
import AuthDropDown from "@component/dropdown/auth";
import { authOptions } from "@auth/route";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full h-[120px] p-2 bg-stone-900 md:rounded-2xl border-b-[1px] border-b-stone-800  md:top-[.5rem] z-50">
      <Path session={session} />

      <AuthDropDown />
    </header>
  );
};

export default Header;
