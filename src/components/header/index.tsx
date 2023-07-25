import { getServerSession } from "next-auth";
import Path from "./path";
import AuthDropDown from "@component/dropdown/auth";
import { OPTIONS } from "@auth/route";

const Header = async () => {
  const session = await getServerSession(OPTIONS);

  return (
    <header className="w-full md:w-[80%] h-[120px] p-2 bg-black fixed top-0 right-0 z-50">
      <Path session={session} />

      <AuthDropDown />
    </header>
  );
};

export default Header;
