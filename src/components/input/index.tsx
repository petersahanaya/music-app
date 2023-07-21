"use client";
import { UseFormRegister } from "react-hook-form";
import { FormKey, FormSchema } from "../dropdown/post/form";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
  hint: string;
  label: FormKey;
  register: UseFormRegister<FormSchema>;
  error: string;
  className?: string;
  dirty: Partial<
    Readonly<{
      title?: boolean | undefined;
      description?: boolean | undefined;
      lyric?: boolean | undefined;
      genre?: boolean | undefined;
    }>
  >;
};

const Input = ({
  error,
  hint,
  label,
  register,
  className,
  dirty,
}: InputProps) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={twMerge(
        `w-full h-max relative ${
          focus || value || dirty[label] ? "" : ""
        }  transition-all`
      )}
    >
      <input
        onFocus={() => setFocus(true)}
        className={twMerge(
          `w-full p-2 rounded-md text-sm bg-stone-400 text-white absolute left-0 top-0 ${className} pl-5 border-[2px] border-transparent outline-stone-700 placeholder:text-stone-200 placeholder:uppercase ${
            error ? "outline-red border-red-400" : ""
          }`
        )}
        placeholder={label}
        {...register(label, {
          onChange(e) {
            setValue(e.target.value);
          },
          onBlur(event) {
            setFocus(false);
          },
        })}
      />
      {/* <p
        className={`absolute top-[10px] left-[5%] text-stone-200 text-xs ${
          value || focus || dirty[label]
            ? "text-[.6rem] top-[-18px] text-stone-800 left-[-5px]"
            : ""
        } uppercase transition-all`}
      >
        {value || focus || dirty[label] ? label : hint}
      </p> */}
    </div>
  );
};

export default Input;
