"use client";

import TextField from "@component/textField";
import Profile from "@component/profile";
import Button from "@component/button";
import Center from "@component/center";
import { FaPlay, FaPause } from "react-icons/fa";

import useDebounce from "@state/hooks/useDebounce";
import { useToggleProfile } from "@state/store/toggleAuth";
import { TrackType, useAudio } from "@state/store/audio";
import { useRecentlyPlayed } from "@state/store/history";
import { useAlertUnAuthenticate } from "@state/store/alert";

import { GENRES } from "@lib/validation";
import { convertUrl, parsedUrl } from "@lib/functions/parsedUrl";

import { Music } from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

type DetailSearchProps = {
  listOfMusic: Music[];
  q: string | null;
  g: (typeof GENRES)[number];

  session: Session | null;
};

const DetailSearch = ({ listOfMusic, q, session, g }: DetailSearchProps) => {
  const router = useRouter();

  const onPressedToggleProfile = useToggleProfile(
    (state) => state.onPressedToggleProfile
  );

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

  const onPressedAlertUnAuthenticate = useAlertUnAuthenticate(
    (state) => state.onPressedChangeAlertUnauthenticate
  );

  const track = useAudio((state) => state.audioSrc);

  const onPressedSetAudio = useCallback(async () => {
    const music = listOfMusic[0];

    if (!session || !session.user) {
      onPressedAlertUnAuthenticate(music.coverImage);
    } else {
      onPressedChangeAudioSrc(music);

      onPressedChangeTrack({
        currentAudioSrc: music.musicUrl,
        listOfMusic: listOfMusic,
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
      } catch (e: unknown) {}
    }
  }, [
    listOfMusic,
    onPressedAlertUnAuthenticate,
    onPressedChangeAudioSrc,
    onPressedChangeLoadHistory,
    onPressedChangeTrack,
    onPressedSortPlaying,
    session,
  ]);

  const [query, setQuery] = useState(q || "");
  const value = useDebounce(query);

  const onPressedChangeGenre = useCallback(
    (genre: string) => {
      const url = convertUrl({
        urls: window.location.href,
        path: "search",
        searchParams: [{ key: "genre", value: genre }],
      });

      router.replace(url);
    },
    [router]
  );

  return (
    <main className={`w-full h-max bg-stone-900 pb-14`}>
      <header className="w-full p-3 xs:px-8 border-b-[1px] border-b-stone-700 flex justify-between items-center">
        <TextField
          hint="Search for what you want"
          query={query}
          setQuery={setQuery}
        />

        <div
          onClick={() => onPressedToggleProfile()}
          className="w-[50px] h-[50px] relative rounded-full overflow-hidden"
        >
          <Profile src={session?.user.image || "/profile.jpeg"} />
        </div>
      </header>

      <article className="w-full flex justify-around items-center flex-wrap mt-3 px-3 gap-3">
        {GENRES.map((genre, idx) => (
          <Button
            key={idx}
            onClick={() => onPressedChangeGenre(genre)}
            className={`w-[100px] text-sm bg-stone-950 text-stone-100 rounded-full p-2 ${
              genre === g ? "bg-white text-stone-800" : ""
            } hover:opacity-70 transition-all`}
          >
            {genre}
          </Button>
        ))}
      </article>

      <article className="mt-3 w-full flex justify-start xs:justify-around xs:flex-row flex-col xs:items-start gap-3 px-3">
        {!listOfMusic.length && (
          <>
            <Center className="w-full h-screen px-3 ">
              <h3 className="text-3xl font-[700] text-white">
                Sorry, cannot found what your searching for 🪹
              </h3>
            </Center>
          </>
        )}

        {listOfMusic.length && (
          <>
            <section className="xs:w-[50%] w-full ">
              <h4 className="text-2xl text-white capitalize font-[700]">
                Top Result
              </h4>

              <nav className="w-full h-max relative p-4 rounded-md group bg-stone-950 mt-4 flex flex-col gap-4 overflow-hidden">
                <div className="w-[110px] h-[110px] rounded-md overflow-hidden relative">
                  <Image
                    className="object-cover"
                    src={listOfMusic[0].largeImage}
                    alt="Cover Image"
                    fill
                  />
                </div>

                <h2 className="text-3xl text-white capitalize font-[800]">
                  {listOfMusic[0].title}
                </h2>

                <div>
                  <p className="text-stone-600">{listOfMusic[0].genre}</p>
                </div>

                <div
                  style={{
                    transform:
                      track?.musicUrl === listOfMusic[0].musicUrl
                        ? "translateY(0px)"
                        : "",
                  }}
                  onClick={onPressedSetAudio}
                  className={`absolute bottom-[10px] cursor-pointer right-[10px] w-max opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 h-max p-4 rounded-full bg-green-500 hover:bg-green-600 ${
                    track?.musicUrl === listOfMusic[0].musicUrl &&
                    "translate-y-0 opacity-100"
                  } text-stone-950 transition-all`}
                >
                  {track?.musicUrl === listOfMusic[0].musicUrl ? (
                    <FaPause size={25} />
                  ) : (
                    <FaPlay size={25} />
                  )}
                </div>
              </nav>
            </section>
            <section className="xs:w-[50%] w-full">
              <h4 className="text-2xl text-white capitalize font-[700]">
                Songs
              </h4>

              <nav className="w-full h-max rounded-md bg-stone-950 mt-4 flex flex-col gap-2">
                {listOfMusic.slice(0, 8).map((music, idx) => (
                  <article key={idx}>
                    <section className="flex justify-start items-start gap-3 hover:bg-neutral-900 transition-all cursor-pointer p-2">
                      <div className="w-[40px] h-[40px] relative overflow-hidden">
                        <Image
                          className="object-cover"
                          src={music.largeImage}
                          alt={music.title}
                          fill
                        />
                      </div>

                      <div className="flex flex-col">
                        <Link
                          href={`/track/${music.id}`}
                          className="text-white capitalize text-sm font-[400] hover:underline"
                        >
                          {music.title}
                        </Link>
                        <p className="text-xs capitalize text-stone-500">
                          {music.genre}
                        </p>
                      </div>
                    </section>
                  </article>
                ))}
              </nav>
            </section>
          </>
        )}
      </article>
    </main>
  );
};

export default DetailSearch;
