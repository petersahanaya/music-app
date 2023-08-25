"use client";

import { ReactClass } from "@/types/types";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type TextFieldProps = {
  hint: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
} & ReactClass;

const TextField = ({ hint, query, setQuery, className }: TextFieldProps) => {
  const onPressedClearQuery = useCallback(() => {
    setQuery("");
  }, [setQuery]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  return (
    <div className="w-[300px] relative rounded-md">
      <GoSearch
        role="button"
        size={20}
        className="text-stone-500 absolute top-[30%] left-[10px]"
      />
      <input
        onChange={onInputChange}
        className={twMerge(
          `w-full text-xs rounded-md placeholder:text-stone-400 text-stone-400 bg-stone-950 p-3 px-10 outline-[1px] outline-stone-300 hover:bg-stone-950/80 transition-colors cursor-pointer ${className}`
        )}
        placeholder={hint}
        value={query}
        name="query"
      />
      {query ? (
        <IoClose
          role="button"
          onClick={onPressedClearQuery}
          size={20}
          className="text-stone-600 absolute top-[30%] right-[8px]"
        />
      ) : null}
    </div>
  );
};

export default TextField;
