"use client";

import Profile from "@component/profile";
import { useToggleAuth, useToggleProfile } from "@state/store/toggleAuth";
import Button from "@component/button";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";

type PathProps = {
  session: Session | null;
};

const Path = ({ session }: PathProps) => {
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
            <p className="text-sm md:hidden text-stone-300">
              {session.user.name}
            </p>
          </>
        )}

        {!session && (
          <div className="flex justify-start items-center gap-4 md:hidden">
            <Button
              className="w-[120px] text-center p-3 bg-green-500 text-black font-[600]"
              onClick={() => onPressedToggleAuth()}
            >
              <p className="uppercase text-sm">Sign in</p>
            </Button>
            <Button
              className="w-[120px] text-center p-3"
              types="outline"
              onClick={() => onPressedToggleAuth()}
            >
              <p className="text-stone-100 text-sm uppercase">Join</p>
            </Button>
          </div>
        )}

        <h4 className="hidden md:inline-block text-xl font-[400] text-stone-300 uppercase tracking-tighter">
          {path === "/" ? "Discover" : path.split("/")[1]}
        </h4>
      </div>

      {!session && (
        <>
          <nav className="flex justify-start items-center gap-3">
            <Link href="/search">
              <BiSearch size={30} className="text-stone-200 ml-10" />
            </Link>
            <button className="md:hidden inline-block">
              <CiMenuBurger size={40} className="text-stone-100" />
            </button>
            <section className="md:flex justify-start items-center gap-3 hidden">
              <Button
                className="w-[120px] text-center bg-green-500 text-black font-[600]"
                onClick={() => onPressedToggleAuth()}
              >
                <p className="uppercase text-sm ">Sign in</p>
              </Button>
              <Button
                className="w-[120px] text-center"
                types="outline"
                onClick={() => onPressedToggleAuth()}
              >
                <p className="text-stone-100 text-sm uppercase">Join</p>
              </Button>
            </section>
          </nav>
        </>
      )}
      {session && session.user && (
        <nav className="flex justify-start items-center gap-3">
          <>
            <section className="flex justify-start items-center gap-7 pr-10">
              <Link href="/search">
                <BiSearch size={30} className="text-stone-200 ml-10" />
              </Link>
              <p role="button" className="text-stone-200">
                New Releases
              </p>
              <p role="button" className="text-stone-200">
                Popular
              </p>
            </section>
            <div
              onClick={() => onPressedToggleProfileDropDown()}
              className="relative w-[50px] h-[50px] overflow-hidden rounded-full hidden md:inline-block"
            >
              <Profile src={session.user.image!} />
            </div>
          </>
        </nav>
      )}
    </section>
  );
};

export default Path;
