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
      <footer className="hidden sm:flex w-screen h-[120px] xl:h-[90px] bg-gradient-to-l to-lime-600 from-blue-300 fixed bottom-0 left-0 justify-between items-center p-3 px-8 z-50">
        <section>
          <p className="text-white text-2xl capitalize font-[600]">
            Preview of P3Music
          </p>
          <p className="text-white md:text-lg">
            Join and get all songs and instrument for free !
          </p>
        </section>

        <Button
          className="md:w-[200px] w-[150px] text-center bg-white text-xl font-[700] rounded-full text-stone-800 capitalize p-3"
          onClick={() => onPressedToggleAuthDropdown()}
        >
          Join
        </Button>
      </footer>
    );

  return <></>;
};

export default AlertJoin;
