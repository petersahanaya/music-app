"use client";
import AuthDropDown from "@component/dropdown/auth";
import Profile from "@component/profile";
import BurgerIcon from "@component/icons/burger";
import { useSidebar } from "@state/store/sidebar";

import { useSession } from "next-auth/react";

const HeaderPhone = () => {
  const { data: session } = useSession();

  const onPressedToggleSidebar = useSidebar(
    (state) => state.onPressedToggleSidebar
  );

  return (
    <header className="w-screen md:hidden h-[90px] p-2 bg-transparent backdrop-blur-sm md:top-[.5rem] z-50 fixed top-0 left-0">
      <section className="w-full h-full flex justify-between items-center px-8">
        <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden">
          <Profile src={session ? session.user.image! : "/profile.jpeg"} />
        </div>

        <button onClick={onPressedToggleSidebar}>
          <BurgerIcon size={50} />
        </button>
      </section>

      <AuthDropDown />
    </header>
  );
};

export default HeaderPhone;
