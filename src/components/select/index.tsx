"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BiRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { popUpAnimate } from "@animation/popup";
import { FormSchema } from "../dropdown/post/form";

type GenreEnum = FormSchema['genre']

type Options = {
  label: string;
  value: string;
};

type SelectProps = {
  setValue: UseFormSetValue<FormSchema>;
  listOfOption: Options[];
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function Select({ setValue, listOfOption }: SelectProps) {
  const [selected, setSelected] = useState<null | number>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onPressedOpenSelect = (e: any) => {
      if (e.key === "ArrowUp") {
        setSelected((prev) => {
          if (prev === 0) {
            return listOfOption.length - 1;
          } else {
            return prev! - 1;
          }
        });
      }

      if (e.key === "ArrowDown") {
        if (!open) {
          setOpen(true);
        }

        setSelected((prev) => {
          if (prev === null) {
            return 0;
          } else if (prev === listOfOption.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }

      if (e.key === "Enter" && open) {
        setValue("genre", listOfOption[selected!].value as GenreEnum);

        setOpen(false);
      }

      if (e.key === "Esc") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onPressedOpenSelect);

    return () => {
      window.removeEventListener("keydown", onPressedOpenSelect);
    };
  }, [listOfOption, listOfOption.length, open, selected, setValue]);

  return (
    <article className="w-full">
      <section
        onClick={() => setOpen((prev) => !prev)}
        className="w-full relative bg-stone-600 p-3 rounded-md"
      >
        <p
          className={`text-sm ${
            selected === null ? "text-stone-400 " : "text-stone-200 uppercase"
          }`}
        >
          {selected === null ? "music genres" : listOfOption[selected].value}
        </p>
        <div
          className={`absolute top-[28%] right-[10px] transition-all rotate-180 ${
            open ? "rotate-90" : ""
          }`}
        >
          <BiRightArrow size={20} color={"#ffffff"} />
        </div>
      </section>

      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            variants={popUpAnimate}
            initial="hidden"
            animate="visible"
            className="w-full overflow-hidden p-2 bg-stone-200 mt-3"
          >
            {listOfOption.map((option, idx) => (
              <motion.div
                onClick={() => {
                  setSelected(idx);
                  setValue("genre", listOfOption[idx].value as GenreEnum);
                  setOpen(false);
                }}
                key={idx}
                className={`text-sm cursor-pointer tracking-tighter flex flex-col justify-start items-start selection:bg-transparent gap-2 p-2 ${
                  selected === idx ? "bg-stone-800 text-stone-100" : ""
                }`}
              >
                <motion.p variants={textVariants}>{option.value}</motion.p>
              </motion.div>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </article>
  );
}

export default Select;
