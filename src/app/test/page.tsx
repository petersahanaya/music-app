"use client";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FormKey, FormSchema } from "@component/dropdown/post/form";

type InputProps = {
  hint: string;
  label: FormKey;
  register: UseFormRegister<FormSchema>;
  error: string;
  className?: string;
};

const Input = ({ error, hint, label, register, className }: InputProps) => {
  const [value, setValue] = useState("");

  return (
    <div className={twMerge(`w-full h-max `)}>
      <input
        className={twMerge(
          `w-full p-2 rounded-md text-sm text-stone-700 border-[1px]  ${
            error ? "border-red-600" : "border-transparent"
          } ${className}`
        )}
        placeholder={hint}
        {...register(label, {
          onChange(e) {
            setValue(e.target.value);
          },
        })}
      />
      <p
        className={`${
          value ? "text-xs uppercase text-white" : "text-sm text-stone-500"
        } transition-all absolute top-[30%] left-[5%]`}
      >
        {label}
      </p>
    </div>
  );
};

export default Input;
