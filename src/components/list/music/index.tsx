"use client";

import { parsedUrl } from "@lib/functions/parsedUrl";
import { useRecentlyPlayed } from "@state/store/history";
import { TrackType, useAudio } from "@state/store/audio";
import { Music } from "@prisma/client";
import Image from "next/image";
import { MouseEvent, useCallback, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { useRouter } from "next/navigation";
import LoaderIcon from "@component/icons/loader";
import Link from "next/link";

type MusicListProps = {
  number: number;
  coverImage: string;
  title: string;
  views: number;
  favorite: boolean;
  music: Music;
  listOfMusic: Music[];
};

const MusicList = ({
  coverImage,
  number,
  title,
  views,
  music,
  listOfMusic,
  favorite,
}: MusicListProps) => {
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
    music,
    onPressedChangeAudioSrc,
    onPressedChangeLoadHistory,
    onPressedChangeTrack,
    onPressedSortPlaying,
  ]);

  const onPressedRedirect = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    router.push(`/track/${music.id}`);
  };

  const onPressedToggleLike = useCallback(async () => {
    setLoader(true);

    const url = parsedUrl({
      path: "api/favorite",
      searchParams: [
        { key: "songId", value: music.id },
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
  }, [music.id, router]);

  return (
    <article
      onClick={onPressedRedirect}
      className={`w-full cursor-pointer p-2 flex justify-between gap-5 items-center hover:bg-white/20 transition-colors group ${
        music.musicUrl === track?.musicUrl ? "bg-white/10" : ""
      }`}
    >
      <section className="flex justify-start items-center gap-4">
        <p
          className={`text-stone-500 group-hover:hidden ${
            music.musicUrl === track?.musicUrl ? "hidden" : "inline-block"
          }`}
        >
          {number}
        </p>
        <button
          onClick={onPressedSetMusicPlayed}
          className={`text-stone-100 group-hover:inline-block hover:opacity-70  transition-opacity ${
            music.musicUrl === track?.musicUrl ? "inline-block" : "hidden"
          }`}
        >
          {music.musicUrl === track?.musicUrl ? (
            <FaPause size={15} />
          ) : (
            <FaPlay size={15} />
          )}
        </button>
        <div role="img" className="w-[40px] h-[40px] relative">
          <Image
            className="object-cover"
            fill
            src={coverImage}
            alt="cover image"
          />
        </div>
        <Link
          href={`/track/${music.id}`}
          className="text-stone-200 capitalize font-[500] hover:underline max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {title}
        </Link>
      </section>

      <section className="text-stone-500 text-sm flex justify-start items-center gap-4">
        <button
          onClick={onPressedToggleLike}
          className="group-hover:opacity-100 opacity-0 transition-opacity"
        >
          {loader ? (
            <LoaderIcon size={20} color="#747474" className="animate-spin" />
          ) : favorite ? (
            <AiFillHeart className="text-red-600" size={20} />
          ) : (
            <AiOutlineHeart className="text-white" size={20} />
          )}
        </button>
        <p>{views}</p>
      </section>
    </article>
  );
};

export default MusicList;
