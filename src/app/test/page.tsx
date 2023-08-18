"use client";

import Button from "@component/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Image from "next/image";
import { listOfMusicDummy, lyric } from "@lib/validation";
import Profile from "@component/profile";
import Link from "next/link";
import MusicList from "@component/list/music";
import ListView from "@/components/listView";
import Card from "@/components/list/card";

const SongDetail = () => {
  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll pb-32">
      <section className="w-full h-[300px] relative">
        <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-600/10 absolute top-0 left-0"></div>
        <section className="absolute bottom-[30px] left-[20px] w-full flex justify-start items-center gap-3">
          <div className="w-[200px] h-[200px] relative backdrop:shadow-md rounded-md overflow-hidden">
            <Image
              className="object-cover"
              src={listOfMusicDummy[listOfMusicDummy.length - 1].largeImage}
              alt="background image"
              fill
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-6xl capitalize font-[800] text-white">
              Ten Thousand
            </h3>
            <Link
              href={`/user?userId=randomUUID`}
              className="flex justify-start items-center gap-2"
            >
              <div className="w-[30px] h-[30px] rounded-full relative overflow-hidden">
                <Profile src="https://i.scdn.co/image/ab6761610000f1780d53f158f4070d5a72190c4c" />
              </div>
              <p className="text-sm text-white">
                <span
                  role="button"
                  className="font-[700] hover:underline cursor-pointer"
                >
                  Stephanie Poetri
                </span>{" "}
                • Ten Thousand
              </p>
            </Link>
          </div>
        </section>
      </section>

      <section className="w-full pb-10">
        <div className="w-full p-3 flex justify-start items-center gap-4">
          <Button
            className="p-4 bg-green-500 text-stone-900 rounded-full"
            onClick={() => {}}
          >
            {/* {track ? <FaPause size={25} /> : <FaPlay size={25} />} */}
            <FaPlay size={25} />
          </Button>

          <button className="text-stone-500 hover:text-stone-200 transition-colors">
            <AiOutlineHeart size={35} />
          </button>

          <button className="text-stone-600 hover:text-stone-200 transition-colors">
            <BiDotsHorizontalRounded size={30} />
          </button>
        </div>

        <section className="w-full px-4">
          <article className="w-[40%]">
            <p className="text-stone-400 leading-7">{lyric}</p>
          </article>

          <section className="flex justify-start items-center gap-3 w-full p-2 hover:bg-white/20 transition-colors cursor-pointer mt-5">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden relative">
              <Profile src="https://i.scdn.co/image/ab6761610000f1780d53f158f4070d5a72190c4c" />
            </div>

            <div className="flex flex-col">
              <p className="text-stone-200 text-sm font-[500]">Creator</p>
              <p
                role="button"
                className="text-stone-100 hover:underline font-[700] w-[300px] overflow-hidden text-ellipsis"
              >
                Stephanie Poetri
              </p>
            </div>
          </section>
        </section>

        <article className="w-full mt-6 px-4">
          <div>
            <p className="text-stone-400 text-sm font-[500]">Published by</p>
            <h4
              role="button"
              className="text-stone-100 hover:underline font-[700] text-xl w-[300px] overflow-hidden text-ellipsis"
            >
              Stephanie Poetri
            </h4>
          </div>

          <section className="w-full px-3">
            {listOfMusicDummy.map((music, idx) => (
              <MusicList
                key={idx}
                coverImage={music.coverImage}
                favorite
                listOfMusic={listOfMusicDummy}
                music={music}
                number={idx + 1}
                title={music.title}
                views={music.views}
              />
            ))}
          </section>

          <section className="w-full flex flex-col gap-3 mt-10">
            <div className="w-full flex justify-between items-center">
              <h3 className="text-stone-200 text-3xl font-[700]">
                You may also like
              </h3>
              <Link className="text-stone-400 hover:underline" href="/">
                see all
              </Link>
            </div>
            <ListView className="grid-rows-1 xl:grid-rows-1 ">
              {listOfMusicDummy.slice(0, 4).map((music, idx) => (
                <Card
                  key={idx}
                  listOfMusic={listOfMusicDummy.slice(0, 4)}
                  music={music}
                />
              ))}
            </ListView>
          </section>
        </article>
      </section>
    </main>
  );
};

//You may also like
export default SongDetail;
