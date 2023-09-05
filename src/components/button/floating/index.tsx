"use client";

"use client";
import { useAlertUnAuthenticate } from "@state/store/alert";
import { TrackType, useAudio } from "@state/store/audio";
import { useRecentlyPlayed } from "@state/store/history";

import { Music } from "@prisma/client";
import { parsedUrl } from "@lib/functions/parsedUrl";
import { useSession } from "next-auth/react";
import { useCallback, MouseEvent } from "react";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

type FloatingButtonProps = {
    music : Music,
    listOfMusic : Music[]
}

const FloatingButton = ({listOfMusic, music} : FloatingButtonProps) => {
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

  const onPressedAlertUnAuthenticate = useAlertUnAuthenticate(
    (state) => state.onPressedChangeAlertUnauthenticate
  );

  const { data: session } = useSession();

  const onPressedSetAudio = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!session || !session.user) {

        onPressedAlertUnAuthenticate(music.coverImage);
        
      } else {
        onPressedChangeAudioSrc(music);

        onPressedChangeTrack({
          currentAudioSrc: music.musicUrl,
          listOfMusic,
          type: TrackType.Default,
        });

        onPressedChangeLoadHistory(
          [
            music,
            ...listOfMusic
              .filter((musicc) => musicc.id !== music.id)
              .slice(0, 4),
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
      }
    },
    [
      listOfMusic,
      music,
      onPressedAlertUnAuthenticate,
      onPressedChangeAudioSrc,
      onPressedChangeLoadHistory,
      onPressedChangeTrack,
      onPressedSortPlaying,
      session,
    ]
  );

  return (
    <div
      style={{
        transform: track?.musicUrl === music.musicUrl ? "translateY(0px)" : "",
      }}
      onClick={onPressedSetAudio}
      className={`absolute bottom-[10px] right-[10px] w-max opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 h-max p-4 rounded-full bg-green-500 hover:bg-green-600 ${
        track?.musicUrl === music.musicUrl && "translate-y-0 opacity-100"
      } text-stone-950 transition-all`}
    >
      {track?.musicUrl === music.musicUrl ? (
        <FaPause size={25} />
      ) : (
        <FaPlay size={25} />
      )}
    </div>
  );
};

export default FloatingButton;
