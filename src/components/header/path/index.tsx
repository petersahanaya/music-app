"use client";

import Profile from "@component/profile";
import Button from "@component/button";

import { useToggleAuth, useToggleProfile } from "@state/store/toggleAuth";

import { Session } from "next-auth";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";
// import { CiMenuBurger } from "react-icons/ci";
import BurgerIcon from "@/components/icons/burger";
import { useSidebar } from "@/state/store/sidebar";

type PathProps = {
  session: Session | null;
};

const Path = ({ session }: PathProps) => {
  const onPressedToggleSidebar = useSidebar((state) => state.onPressedToggleSidebar)
  const path = usePathname();
  const onPressedToggleAuth = useToggleAuth(
    (state) => state.onPressedToggleAuth
  );
  const onPressedToggleProfileDropDown = useToggleProfile(
    (state) => state.onPressedToggleProfile
  );

  return (
    <section className="w-full h-full flex justify-between items-center px-4">
      <div className="flex justify-start items-center gap-4">
        {session && session.user && (
          <>
            <div
              onClick={() => onPressedToggleProfileDropDown()}
              className="relative cursor-pointer md:hidden w-[50px] h-[50px] overflow-hidden rounded-full"
            >
              <Profile src={session.user.image!} />
            </div>
            <p className="md:hidden text-stone-300">
              {session.user.name?.slice(0, 6)}
            </p>
          </>
        )}

        {!session && (
          <div className="flex justify-start items-center gap-4 md:hidden">
            <Button
              className="w-[120px] text-center bg-white border-none text-black rounded-full capitalize p-4"
              onClick={() => onPressedToggleAuth()}
            >
              <p className="text-lg font-[700]">Sign in</p>
            </Button>
            <Button
              className="w-[120px] text-center border-none"
              types="outline"
              onClick={() => onPressedToggleAuth()}
            >
              <p className="text-stone-100 text-lg capitalize font-[700]">
                Join
              </p>
            </Button>
          </div>
        )}

        <h4 className="hidden md:inline-block text-3xl text-stone-300 font-[700] uppercase">
          {path === "/" ? "Discover" : path.split("/")[1]}
        </h4>
      </div>

      {!session && (
        <>
          <nav className="flex justify-start items-center gap-3">
            <Link href="/search" className="hidden sm:inline-block">
              <BiSearch size={30} className="text-stone-200 ml-10" />
            </Link>
            <button onClick={onPressedToggleSidebar} className="md:hidden inline-block">
              <BurgerIcon size={50} />
              {/* <CiMenuBurger size={40} className="text-stone-100" /> */}
            </button>
            <section className="md:flex justify-start items-center gap-3 hidden">
              <Button
                className="w-[160px] text-center bg-white border-none text-black font-[600] rounded-full capitalize p-4 "
                onClick={() => onPressedToggleAuth()}
              >
                <p className="text-xl font-[700]">Sign in</p>
              </Button>
              <Button
                className="w-[120px] text-center border-none"
                types="outline"
                onClick={() => onPressedToggleAuth()}
              >
                <p className="text-stone-100 text-xl capitalize font-[700]">
                  Join
                </p>
              </Button>
            </section>
          </nav>
        </>
      )}
      {path === "/" && session && session.user && (
        <nav className="flex justify-start items-center gap-3">
          <section className="flex justify-between md:justify-start items-center gap-7 pr-10">
            <Link href={`/search`}>
              <BiSearch size={30} className="text-stone-200 ml-10" />
            </Link>
            <Link
              href="/songs?news=true"
              className="text-stone-200 hidden md:inline-block hover:underline"
            >
              New Releases
            </Link>
            <Link
              href="/songs?popular=true"
              className="text-stone-200 hidden md:inline-block hover:underline"
            >
              Popular
            </Link>

            <button onClick={onPressedToggleSidebar} className="md:hidden inline-block">
              <BurgerIcon size={50} />
              {/* <CiMenuBurger size={40} className="text-stone-100" /> */}
            </button>
          </section>
          <div
            onClick={() => onPressedToggleProfileDropDown()}
            className="relative w-[50px] h-[50px] overflow-hidden rounded-full hidden md:inline-block"
          >
            <Profile src={session!.user.image!} />
          </div>
        </nav>
      )}
    </section>
  );
};

export default Path;
