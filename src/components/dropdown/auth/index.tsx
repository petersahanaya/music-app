"use client";

import ListTile from "@component/listTile";
import { useToggleAuth } from "@state/store/toggleAuth";
import * as Dialog from "@radix-ui/react-dialog";
import { GrFormClose } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { signIn } from "next-auth/react";

const AuthDropDown = () => {
  const authState = useToggleAuth();

  if (authState.open) {
    return (
      <Dialog.Root
        open={authState.open}
        onOpenChange={authState.onPressedToggleAuth}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0">
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Welcome to P3Music
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                Join or Sign in so you can play and post music in p3music.
              </Dialog.Description>
              <Dialog.Description>
                <ListTile onClick={() => signIn("google")}>
                  <FcGoogle size={40} />
                  <p className="uppercase text-sm text-stone-800">google</p>
                </ListTile>
                <ListTile onClick={() => signIn("facebook")}>
                  <SiFacebook size={40} />
                  <p className="uppercase text-sm text-stone-800">facebook</p>
                </ListTile>
              </Dialog.Description>
              <Dialog.Close asChild>
                <button
                  onClick={() => authState.onPressedToggleAuth()}
                  className="text-stone-800 hover:bg-stone-500 focus:shadow-stone-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <GrFormClose size={30} />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return <></>;
};

export default AuthDropDown;
