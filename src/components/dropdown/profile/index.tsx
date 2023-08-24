"use client";

import ListTile from "@component/listTile";
import { SessionProps } from "@/types/types";
import Profile from "@component/profile";
import { useToggleProfile } from "@state/store/toggleAuth";
import { AnimatePresence, motion } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import { PiSignpostLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "@component/button";
import { usePostDropDown } from "@state/store/post";
import { fadeUpAnimate } from "@animation/fade";
import { popUpAnimate } from "@animation/popup";
import { signOut } from "next-auth/react";
import Link from "next/link";

const ProfileDropDown = ({ session }: SessionProps) => {
  const stateProfile = useToggleProfile();
  const onPressedOpenPost = usePostDropDown((state) => state.onPressedOpenPost);

  return (
    <>
      <AnimatePresence>
        {session && stateProfile.open ? (
          <motion.nav
            onBlur={() => stateProfile.onPressedToggleProfile()}
            variants={popUpAnimate}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-[300px]  h-max bg-neutral-200 rounded-md fixed top-[100px] right-[40px] z-[60] overflow-hidden flex flex-col justify-center"
          >
            <motion.section
              variants={fadeUpAnimate}
              className="w-full flex justify-between items-center pr-3"
            >
              <article className="w-full flex justify-start items-center gap-3 p-3">
                <div className="w-[50px] h-[50px] overflow-hidden rounded-full relative">
                  <Profile src={session.user.image as string} />
                </div>
                <p className="text-sm text-stone-800">{session.user.name}</p>
              </article>

              <GrFormClose
                onClick={() => stateProfile.onPressedToggleProfile()}
                size={25}
                color="#ffffff"
                className="text-white cursor-pointer"
              />
            </motion.section>

            <motion.section
              variants={fadeUpAnimate}
              className="w-full h-full flex flex-col justify-center items-start gap-3"
            >
              <div>
                <ListTile
                  onClick={() => {
                    onPressedOpenPost();
                    stateProfile.onPressedToggleProfile();
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <PiSignpostLight size={30} />
                  <p className="text-sm text-stone-700">Add Music</p>
                </ListTile>
              </div>
              <div>
                <ListTile className="hover:opacity-70 transition-opacity">
                  <AiOutlineHeart size={30} />
                  <Link href="/album" className="text-sm text-stone-700">
                    My Album
                  </Link>
                </ListTile>
              </div>
              <div>
                <ListTile className="hover:opacity-70 transition-opacity">
                  <CiSettings size={30} />
                  <Link href="/profile" className="text-sm text-stone-700">
                    Settings
                  </Link>
                </ListTile>
              </div>
            </motion.section>

            <br></br>
            <motion.div
              className="w-full flex justify-center items-center"
              variants={fadeUpAnimate}
            >
              <Button
                onClick={() => signOut()}
                types="outline"
                className="w-[90%] m-auto border-[1px] border-red-600 text-red-500 "
              >
                Sign out
              </Button>
            </motion.div>
            <br></br>
          </motion.nav>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileDropDown;
