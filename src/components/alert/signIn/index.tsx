"use client";

import { useToggleAuth } from "@state/store/toggleAuth";
import Button from "@component/button";
import Center from "@component/center";

const AlertSign = () => {
  const onPressedToggleAuth = useToggleAuth(
    (state) => state.onPressedToggleAuth
  );

  return (
    <main className="w-full h-full">
      <Center>
        <h4 className="text-3xl text-stone-200 font-[700]">
          You&apos;ve to sign in first 🫠
        </h4>
        <Button
          onClick={() => onPressedToggleAuth()}
          className="bg-white w-[160px] text-black font-[700] text-xl rounded-full p-3 text-center capitalize"
        >
          Sign in
        </Button>
      </Center>
    </main>
  );
};

export default AlertSign;
