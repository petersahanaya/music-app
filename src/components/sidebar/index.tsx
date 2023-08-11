"use client";

import ListTile from "@component/listTile";
import { RiHomeFill, RiHomeLine } from "react-icons/ri";
import { VscLibrary } from "react-icons/vsc";
import { PiBrowsersBold } from "react-icons/pi";
import {
  BsMusicNoteBeamed,
  BsMusicNote,
  BsCollectionPlay,
  BsCollectionPlayFill,
} from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className="hidden md:inline-block w-[20%] md:w-[19.5%] h-full bg-black fixed top-0 left-0 pt-4">
      <main className="w-full h-max flex flex-col justify-start items-start gap-8 bg-stone-900 rounded-xl p-4">
        <section className="w-full h-max flex flex-col justify-start items-start gap-3">
          <div className="">
            <ListTile>
              <PiBrowsersBold size={30} className="text-stone-300" />
              <h4 className="text-xl text-stone-300 font-[600]">Home</h4>
            </ListTile>
          </div>
          <Link href="/" className="w-full">
            <ListTile
              className={` hover:opacity-60  transition-opacity ${
                path === "/" ? "bg-stone-600" : "text-sm"
              }`}
            >
              {path !== "/" ? (
                <RiHomeLine size={20} className="text-stone-200" />
              ) : (
                <RiHomeFill size={20} className="text-stone-200" />
              )}
              <p className="text-md text-stone-200">Discover</p>
            </ListTile>
          </Link>
          <Link href="/album" className="w-full">
            <ListTile
              className={` hover:opacity-60 transition-opacity ${
                path === "/album" ? "bg-stone-600" : "text-sm"
              }`}
            >
              <BsMusicNoteBeamed size={20} className="text-stone-200" />
              <p className="text-md text-stone-200">Album</p>
            </ListTile>
          </Link>
          <Link href="/genres" className="w-full">
            <ListTile
              className={` hover:opacity-60 transition-opacity ${
                path === "/genres" ? "bg-stone-600" : "text-sm"
              }`}
            >
              <BsMusicNote size={20} className="text-stone-200" />
              <p className="text-md text-stone-200">Genres</p>
            </ListTile>
          </Link>
        </section>
      </main>

      <main className="w-full h-max mt-3 flex flex-col justify-start items-start gap-3 bg-stone-900 rounded-xl p-4">
        <ListTile>
          <VscLibrary size={30} className="text-stone-300" />
          <h4 className="text-xl text-stone-300 font-[700]">Library</h4>
        </ListTile>

        <Link
          href="/favorite"
          className="w-full hover:opacity-75 transition-opacity"
        >
          <ListTile
            className={`  ${
              path === "/favorite" ? "bg-stone-600 text-md" : "text-sm"
            }`}
          >
            {path === "/favorite" ? (
              <AiFillHeart size={20} className="text-stone-200" />
            ) : (
              <AiOutlineHeart size={20} className="text-stone-200" />
            )}
            <p className="text-sm text-stone-200">Favorite</p>
          </ListTile>
        </Link>
        <Link
          href="/history"
          className="w-full hover:opacity-60 transition-opacity"
        >
          <ListTile
            className={` ${
              path === "/history" ? "bg-stone-600 text-md" : "text-sm"
            }`}
          >
            {path === "/history" ? (
              <BsCollectionPlayFill size={20} className="text-stone-200" />
            ) : (
              <BsCollectionPlay size={20} className="text-stone-200" />
            )}
            <p className="text-sm text-stone-200">History</p>
          </ListTile>
        </Link>
      </main>

      <main className="w-[80%] h-max flex justify-around items-between flex-wrap gap-8 mt-8 p-2">
        <p className="text-stone-400 text-sm">Legal</p>
        <p className="text-stone-400 text-sm">Privacy Center</p>
        <p className="text-stone-400 text-sm">Privacy Policy</p>
        <p className="text-stone-400 text-sm">Cookies</p>
      </main>
    </aside>
  );
};

export default Sidebar;
