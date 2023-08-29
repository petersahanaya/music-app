"use client";

import Button from "@component/button";
import ListView from "@component/listView";
import MusicList from "@component/list/music";
import Card from "@component/list/card";
import Profile from "@component/profile";
import Center from "@component/center";

import { FaPause, FaPlay } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import Image from "next/image";
import Link from "next/link";

import { Music } from "@prisma/client";
import { TrackType, useAudio } from "@state/store/audio";
import { useRecentlyPlayed } from "@state/store/history";
import { useCallback, useState } from "react";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import LoaderIcon from "@component/icons/loader";

type SongDetailProps = {
  title: string;
  profile: string;
  username: string;
  coverImage: string;
  userProfileHref: string;
  favorite: boolean;
  lyrics: string;
  session: Session | null;
  listOfMusic: Music[];
  listOfAlsoLike: Music[];
  song: Music;
};

const SongDetail = ({
  coverImage,
  profile,
  title,
  username,
  userProfileHref,
  favorite,
  lyrics,
  listOfMusic,
  listOfAlsoLike,
  song,
  session,
}: SongDetailProps) => {
  const router = useRouter();

  const [loader, setLoader] = useState(false);

  const onPressedChangeTrack = useAudio((state) => state.onPressedChangeTrack);

  const onPressedSortPlaying = useRecentlyPlayed(
    (state) => state.onPressedSortPlaying
  );

  const onPressedChangeLoadHistory = useRecentlyPlayed(
    (state) => state.onLoadSetHistoryMusic
  );

  const onPressedChangeAudioSrc = useAudio(
    (state) => state.onPressedChangedAudioSrc
  );

  const track = useAudio((state) => state.audioSrc);

  const onPressedSetMusicPlayed = useCallback(async () => {
    const music = song;

    onPressedChangeAudioSrc(music);

    onPressedChangeTrack({
      currentAudioSrc: music.musicUrl,
      listOfMusic,
      type: TrackType.Default,
    });

    onPressedChangeLoadHistory(
      [
        music,
        ...listOfMusic.filter((musicc) => musicc.id !== music.id).slice(0, 4),
      ].slice(0, 4)
    );

    onPressedSortPlaying(music);

    const url = parsedUrl({
      path: "api/song",
      searchParams: [{ key: "songId", value: music.id }],
    });

    try {
      const resp = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await resp.json();
    } catch (e: unknown) {
      console.error(e);
    }
  }, [
    listOfMusic,
    onPressedChangeAudioSrc,
    onPressedChangeLoadHistory,
    onPressedChangeTrack,
    onPressedSortPlaying,
    song,
  ]);

  const onPressedToggleFavorite = useCallback(async () => {
    setLoader(true);
    const url = parsedUrl({
      path: "api/favorite",
      searchParams: [
        { key: "songId", value: song.id },
        { key: "favorite", value: "favorite" },
        { key: "type", value: "like" },
      ],
    });

    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.ok) {
      setLoader(false);
      router.refresh();
    }

    const data = await resp.json();
  }, [router, song.id]);

  return (
    <main className="w-full h-max bg-stone-900  md:rounded-2xl">
      <section className="w-full xs:h-[300px] h-[200px] relative">
        <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-600/10 absolute top-0 left-0 rounded-md"></div>
        <section className="absolute bottom-[30px] left-[20px] w-full flex justify-start items-center gap-3">
          <div className="w-[200px] h-[200px] hidden xs:inline-block relative backdrop:shadow-md rounded-md overflow-hidden">
            <Image
              className="object-cover"
              src={coverImage}
              alt="background image"
              fill
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-6xl capitalize font-[800] text-white">
              {title}
            </h3>
            <Link
              href={userProfileHref}
              className="flex justify-start items-center gap-2"
            >
              <div className="w-[30px] h-[30px] rounded-full relative overflow-hidden">
                <Profile src={profile} />
              </div>
              <p className="text-sm text-white">
                <span
                  role="button"
                  className="font-[700] hover:underline cursor-pointer"
                >
                  {username}
                </span>{" "}
                • <span className="capitalize">{title}</span>
              </p>
            </Link>
          </div>
        </section>
      </section>

      <section className="w-full pb-10">
        <div className="w-full p-3 flex justify-start items-center gap-4">
          <Button
            className="p-4 bg-green-500 text-stone-900 rounded-full"
            onClick={() => onPressedSetMusicPlayed()}
          >
            {track?.musicUrl === song.musicUrl ? (
              <FaPause size={25} />
            ) : (
              <FaPlay size={25} />
            )}
          </Button>

          <button onClick={onPressedToggleFavorite} className="">
            {loader ? (
              <LoaderIcon color="#414141" size={30} className="animate-spin" />
            ) : favorite ? (
              <AiFillHeart
                size={35}
                className="text-red-500 hover:opacity-70 transition-opacity"
              />
            ) : (
              <AiOutlineHeart
                size={35}
                className="text-stone-500 hover:text-stone-200 transition-colors"
              />
            )}
          </button>

          <button className="text-stone-600 hover:text-stone-200 transition-colors">
            <BiDotsHorizontalRounded size={30} />
          </button>
        </div>

        <section className="w-full px-4">
          <article className="w-[40%]">
            <p className="text-stone-400 leading-7">{lyrics}</p>
          </article>

          <section className="flex justify-start items-center gap-3 w-full p-2 hover:bg-white/20 transition-colors cursor-pointer mt-5">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden relative">
              <Profile src={profile} />
            </div>

            <div className="flex flex-col">
              <p className="text-stone-200 text-sm font-[500]">Creator</p>
              <p
                role="button"
                className="text-stone-100 hover:underline capitalize font-[700] w-[300px] overflow-hidden text-ellipsis"
              >
                {username}
              </p>
            </div>
          </section>
        </section>

        <article className="w-full mt-6 px-4">
          <div>
            <p className="text-stone-400 text-sm font-[500]">Published by</p>
            <h4
              role="button"
              className="text-stone-100 capitalize hover:underline font-[700] text-xl w-[300px] overflow-hidden text-ellipsis"
            >
              {username}
            </h4>
          </div>

          <section className="w-full px-3">
            {listOfMusic.length ? (
              listOfMusic.map((music, idx) => (
                <MusicList
                  key={idx}
                  coverImage={music.coverImage}
                  favorite={music.favoriteId === session?.user.userId}
                  listOfMusic={listOfMusic}
                  music={music}
                  number={idx + 1}
                  title={music.title}
                  views={music.views}
                />
              ))
            ) : (
              <Center>
                <h4 className="text-3xl font-[800] text-stone-400">
                  This user doesn&apos;t publish any music yet 🎵
                </h4>
              </Center>
            )}
          </section>

          {listOfAlsoLike && (
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
                {listOfAlsoLike.slice(0, 4).map((music, idx) => (
                  <Card
                    key={idx}
                    listOfMusic={listOfAlsoLike.slice(0, 4)}
                    music={music}
                  />
                ))}
              </ListView>
            </section>
          )}
        </article>
      </section>
    </main>
  );
};

//You may also like
export default SongDetail;
