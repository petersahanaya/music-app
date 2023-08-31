const SearchLoading = () => {
  return (
    <main className="md:w-[80%] w-full h-full bg-stone-900 rounded-md">
      <header className="w-full p-3 xs:px-8 border-b-[1px] border-b-stone-700 flex justify-between items-center">
        <div className="xs:w-[300px] w-[200px] h-[30px] rounded-sm p-2 bg-stone-700 animate-pulse"></div>

        <div
          style={{ animationDelay: "100ms" }}
          className="w-[50px] h-[50px] bg-stone-700 animate-pulse rounded-full"
        ></div>
      </header>

      <article className="w-full flex justify-around items-center flex-wrap mt-3 px-3 gap-3">
        {Array(6)
          .fill(1)
          .map((_, idx) => (
            <div
              style={{ animationDelay: `${100 * idx}ms` }}
              className="w-[100px] bg-stone-700 rounded-full animate-pulse p-4"
              key={idx}
            ></div>
          ))}
      </article>

      <section className="w-full flex justify-around  items-start gap-3 px-3 mt-7 xs:flex-row flex-col">
        <article className="w-[50%] h-[300px] rounded-md ">
          <div
            style={{ animationDelay: "150ms" }}
            className="w-[140px] h-[30px] p-2 bg-stone-700 rounded-md animate-pulse"
          ></div>

          <nav className="w-full h-full flex justify-start items-center gap-2 bg-stone-800 rounded-md px-3 mt-2">
            <div
              style={{ animationDelay: "200ms" }}
              className="w-[40%] h-[40%] rounded-md bg-stone-700 animate-pulse"
            ></div>
            <div
              style={{ animationDelay: "250ms" }}
              className="w-[50%] h-[20px] rounded-md bg-stone-700 animate-pulse"
            ></div>
          </nav>
        </article>

        <article className="w-[50%] h-max rounded-md">
          <div
            style={{ animationDelay: "150ms" }}
            className="w-[80px] h-[30px] p-2 bg-stone-700 rounded-md animate-pulse"
          ></div>

          <nav className="flex flex-col gap-2 mt-3">
            {Array(8)
              .fill(1)
              .map((_, idx) => (
                <div
                  className="w-full flex justify-start items-center gap-2"
                  key={idx}
                >
                  <div
                    style={{ animationDelay: `${150 * idx}ms` }}
                    className="w-[40px] h-[40px] bg-stone-700 animate-pulse"
                  ></div>
                  <div
                    style={{ animationDelay: `${150 * idx}ms` }}
                    className="w-[60px] h-[10px] rounded-sm bg-stone-700 animate-pulse"
                  ></div>
                </div>
              ))}
          </nav>
        </article>
      </section>
    </main>
  );
};

export default SearchLoading;
