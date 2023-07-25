"use client";

import ListTile from "@component/listTile";
import { RiHomeFill, RiHomeLine } from "react-icons/ri";
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
    <aside className="hidden md:inline-block w-[20%] h-full bg-black px-5 pt-[.9rem] ">
      <header className="w-full h-[70px] font-[700] text-white text-4xl py-6">
        <h3>P3Music</h3>
      </header>

      <main className="w-full h-max mt-9 flex flex-col justify-start items-start gap-3">
        <div className="">
          <h4 className="text-lg text-white">Browse Music</h4>
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
      </main>

      <main className="w-full h-max mt-9 flex flex-col justify-start items-start gap-3">
        <div className="">
          <h4 className="text-lg text-white">Library</h4>
        </div>

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
    </aside>
  );
};

export default Sidebar;
