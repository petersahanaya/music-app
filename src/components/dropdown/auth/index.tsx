"use client";

import { useToggleAuth } from "@/state/store/toggleAuth";
import { SiFacebook } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@component/button";
import Image from "next/image";
import { fadeInAnimate, fadeUpAnimate } from "@animation/fade";
import { popUpAnimate } from "@animation/popup";

const AuthDropDown = () => {
  const authState = useToggleAuth();

  const onPressedSignIn = (type: "google" | "facebook") => {
    signIn(type);
  };

  return (
    <>
      <AnimatePresence>
        {authState.open && (
          <>
            <motion.section
              variants={fadeInAnimate}
              onClick={authState.onPressedToggleAuth}
              initial="hidden"
              animate="visible"
              className="w-screen h-screen fixed top-0 left-0 z-[90] bg-black/50"
            ></motion.section>
            <motion.main
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popUpAnimate}
              style={{
                translateX: "-50%",
                translateY: "-50%",
                animationDelay: ".4",
              }}
              className="sm:w-[500px] bg-gradient-to-b from-gray-500 to-stone-800 sm:h-[80vh] w-screen h-screen rounded-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100] flex flex-col justify-center items-center gap-4"
            >
              <section className="w-full h-[90%] flex flex-col justify-center items-center">
                <motion.div
                  variants={fadeUpAnimate}
                  className="w-[300px] h-[300px] sm:w-[200px]  rounded-md relative overflow-hidden"
                >
                  <Image
                    className="object-cover"
                    src="https://res.cloudinary.com/dlvi65trb/image/asset/v1689944146/music/yv5d6cpvqmgl6b9m1myi.jpg"
                    alt="cover image"
                    fill
                  />
                </motion.div>

                <motion.div
                  variants={fadeUpAnimate}
                  className="w-[80%] text-center flex flex-col justify-center items-center"
                >
                  <h4 className="text-white text-center font-[600] text-4xl mt-5 capitalize">
                    Join and explore your song for free
                  </h4>
                </motion.div>
                <motion.div
                  className="flex flex-col justify-start items-center gap-3 mt-7"
                  variants={fadeUpAnimate}
                >
                  <Button
                    className="flex justify-start items-center gap-3 px-4 text-black font-[500] bg-white p-4 text-xl rounded-full w-[300px] hover:bg-stone-200 transition-colors"
                    onClick={() => onPressedSignIn("facebook")}
                    types="fill"
                  >
                    <SiFacebook size={30} className="text-blue-600" />
                    <p className="text-xl font-[700]">Facebook</p>
                  </Button>
                  <Button
                    className="flex justify-start items-center gap-3 px-4 text-black font-[500] bg-white p-4 text-xl rounded-full w-[300px] hover:bg-stone-200 transition-colors"
                    onClick={() => onPressedSignIn("google")}
                    types="fill"
                  >
                    <FcGoogle size={30} />
                    <p className="text-xl font-[700]">Google</p>
                  </Button>
                </motion.div>
              </section>

              <button
                onClick={authState.onPressedToggleAuth}
                className="text-stone-300 font-[600] text-lg hover:text-stone-400 transition-colors"
              >
                <p>Close</p>
              </button>
            </motion.main>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthDropDown;
