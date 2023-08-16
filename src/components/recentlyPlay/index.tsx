"use client";
import { Music } from "@prisma/client";
import Card from "@component/list/card";
import ListView from "@component/listView";
import { useAudio } from "@state/store/audio";
import { useRecentlyPlayed } from "@state/store/history";
import { useEffect, useState } from "react";
import CardLoading from "../loading/card";

type RecentlyPlayProps = {
  listOfMusic: Music[];
};

const RecentlyPlay = ({ listOfMusic }: RecentlyPlayProps) => {
  const [loading, setLoading] = useState(true);

  const audioSrc = useAudio((state) => state.audioSrc);

  const onLoadSetAudio = useRecentlyPlayed(
    (state) => state.onLoadSetHistoryMusic
  );

  const historyMusic = useRecentlyPlayed((state) => state.historyMusic);

  useEffect(() => {
    onLoadSetAudio(listOfMusic);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {listOfMusic.length ? (
            <ListView className="grid-rows-1 xl:grid-rows-1 ">
              {historyMusic.map((music, idx) => (
                <Card key={idx} listOfMusic={listOfMusic} music={music} />
              ))}
            </ListView>
          ) : !audioSrc ? (
            <p className="text-2xl font-[700] text-white">Nothing 😴</p>
          ) : (
            <ListView className="grid-rows-1 xl:grid-rows-1 ">
              <Card
                key={audioSrc.id}
                listOfMusic={historyMusic}
                music={audioSrc as Music}
              />
            </ListView>
          )}
        </>
      ) : (
        <ListView>
          {Array(8)
            .fill(1)
            .map((_, idx) => (
              <CardLoading key={idx} />
            ))}
        </ListView>
      )}
    </>
  );
};

export default RecentlyPlay;
