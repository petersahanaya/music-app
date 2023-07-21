"use client";
import { useToggleAuth } from "@state/store/toggleAuth";
import Button from "@component/button";
import { SessionProps } from "@/types/types";

const AlertJoin = ({ session }: SessionProps) => {
  const onPressedToggleAuthDropdown = useToggleAuth(
    (state) => state.onPressedToggleAuth
  );

  if (!session)
    return (
      <footer className="w-screen h-[80px] bg-gradient-to-l to-lime-600 from-blue-300 fixed bottom-0 left-0 flex justify-between items-center p-3 px-8">
        <section>
          <p className="text-white text-lg">Preview of P3Music</p>
          <p className="text-white md:text-lg">
            Join and get all songs and instrument for free !
          </p>
        </section>

        <Button
          className="md:w-[200px] w-[130px] text-center bg-white text-stone-800 font-[700] uppercase"
          onClick={() => onPressedToggleAuthDropdown()}
        >
          Join
        </Button>
      </footer>
    );

  return <></>;
};

export default AlertJoin;
