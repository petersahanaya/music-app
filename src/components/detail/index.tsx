"use client";

import Button from "@component/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Image from "next/image";
import MusicList from "@component/list/music";
import { Music } from "@prisma/client";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { TrackType, useAudio } from "@state/store/audio";
import { useRecentlyPlayed } from "@state/store/history";
import { useCallback } from "react";
import { Session } from "next-auth";
import useLoader from "@/state/hooks/useLoader";

type DetailProps = {
  title: string;
  views: string;
  largeImage: string;
  session: Session;
  listOfMusic: Music[];
};

const Detail = ({
  listOfMusic,
  title,
  views,
  largeImage,
  session,
}: DetailProps) => {
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
    const music = listOfMusic[0];

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
  ]);

  return (
    <main className="w-full h-max bg-stone-900 md:rounded-2xl">
      <section className="w-full h-[300px] relative rounded-tl-2xl overflow-hidden">
        <Image
          className="object-cover"
          src={largeImage}
          alt="background image"
          fill
        />
        <div className="w-full h-full bg-gradient-to-b from-stone-800 to-stone-800/10 absolute top-0 left-0"></div>
        <div className="absolute bottom-[30px] left-[20px] flex flex-col gap-3">
          <h3 className="text-7xl capitalize font-[800] text-white">{title}</h3>
          <p className="text-sm text-white">{views}</p>
        </div>
      </section>

      <section className="w-full pb-10">
        <div className="w-full p-3 flex justify-start items-center gap-4">
          <Button
            className="p-4 bg-green-500 text-stone-900 rounded-full"
            onClick={() => onPressedSetMusicPlayed()}
          >
            {track ? <FaPause size={25} /> : <FaPlay size={25} />}
          </Button>

          <button className="text-stone-600">
            <BiDotsHorizontalRounded size={30} />
          </button>
        </div>

        <section className="w-full px-4">
          <header className="w-full text-stone-100 flex justify-around items-center gap-3">
            <BsMusicNoteBeamed
              size={40}
              className="flex-1 border-b-[1px] border-b-stone-700 p-3"
            />
            <AiOutlineEye
              size={40}
              className="flex-1 border-b-[1px] border-b-stone-700 p-3"
            />
          </header>

          {listOfMusic.map((music, idx) => (
            <MusicList
              key={idx}
              favorite={music.favoriteId === session.user.userId}
              music={music}
              listOfMusic={listOfMusic}
              coverImage={music.coverImage}
              number={idx + 1}
              title={music.title}
              views={music.views}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Detail;
