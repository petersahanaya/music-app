"use client";

import Button from "@component/button";
import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="md:w-[80%] w-full bg-stone-900 rounded-2xl h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <h4 className="text-3xl text-stone-200 font-[700]">
          Something went wrong 🤖
        </h4>
        <Button
          onClick={() => reset()}
          className="bg-white w-[160px] text-black font-[700] text-xl rounded-full p-3"
        >
          Try again
        </Button>
      </div>
    </main>
  );
};

export default Error;
