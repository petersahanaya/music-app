"use client";

import { useLoaderUI } from "@state/store/loading";
import { useEffect, useState } from "react";

const Loader = () => {
  const [loader, setLoader] = useState(false);

  const loading = useLoaderUI((state) => state.loading);

  useEffect(() => {
    if (loading) {
      setLoader(true);

      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }
  }, [loading]);

  return (
    <div className="w-screen h-[8px] rounded-xl p-2 fixed top-0 left-0">
      <div
        className={`h-full absolute top-0 left-0 ${
          !loader ? "w-[90%] animate-pulse" : "w-full opacity-100"
        } transition-[150ms]`}
      ></div>
    </div>
  );
};

export default Loader;
