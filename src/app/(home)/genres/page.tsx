import ListView from "@component/listView";
import { ACCEPTED_GENRE } from "@lib/validation";
import Header from "@component/header";
import GenreCard from "@component/card/genre";

const listOfGenre = ACCEPTED_GENRE.map((genre) => ({
  title: genre,
  params: `?genre=${genre}`,
  className: [
    "bg-[#7458ff]",
    "bg-[#2D46B9]",
    "bg-[#BD5A00]",
    "bg-[#148A06]",
    "bg-[#E91528]",
  ],
}));

const Genres = () => {
  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 md:rounded-2xl overflow-y-scroll  pb-32">
      <Header />

      <section className="w-full h-full px-3 mt-32">
        <ListView>
          {listOfGenre.map((genre, idx) => (
            <GenreCard
              key={idx}
              title={genre.title}
              href={`/genres${genre.params}`}
              className={genre.className[idx]}
            />
          ))}
        </ListView>
      </section>
    </main>
  );
};

export default Genres;
