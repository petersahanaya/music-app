const FavoriteLoading = () => {
  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 rounded-md">
      <section className="w-full h-[300px] bg-stone-800 relative rounded-tl-2xl overflow-hidden">
        <footer className="w-full h-full absolute bottom-[20px] left-[20px] flex flex-col justify-end gap-3">
          <div
            style={{ animationDelay: "100ms" }}
            className="w-[70%] h-[80px]  bg-stone-700 animate-pulse rounded-md"
          ></div>
          <div
            style={{ animationDelay: "200ms" }}
            className="w-[30%] bg-stone-700 h-[10px] animate-pulse rounded-md"
          ></div>
        </footer>
      </section>

      <section className="w-full ">
        <div className="w-full p-3 flex justify-start items-center gap-4">
          <div
            style={{ animationDelay: "300ms" }}
            className="w-[60px] h-[60px] p-4 bg-stone-700 rounded-full animate-pulse"
          ></div>

          <div
            style={{ animationDelay: "400ms" }}
            className="w-[30px] h-[3px] p-1 rounded-full bg-stone-600 animate-pulse"
          ></div>
        </div>

        <article className="w-full flex flex-col gap-4 px-5 mt-8 bg-stone-900 pb-32">
          {Array(8)
            .fill(1)
            .map((_, idx) => (
              <section
                className="w-full h-[40px] flex justify-start items-center gap-2"
                key={idx}
              >
                <div
                  style={{ animationDelay: `${100 * idx}ms` }}
                  className="w-[50px] h-[50px] rounded-md bg-stone-700 animate-pulse"
                ></div>
                <div
                  style={{ animationDelay: `${100 * idx}ms` }}
                  className="w-[80px] h-[30px] rounded-md bg-stone-700 animate-pulse"
                ></div>
              </section>
            ))}
        </article>
      </section>
    </main>
  );
};

export default FavoriteLoading;
