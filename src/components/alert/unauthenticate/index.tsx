"use client";
import { useToggleAuth } from "@/state/store/toggleAuth";
import Button from "@component/button";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInAnimate, fadeUpAnimate } from "@animation/fade";
import { popUpAnimate } from "@animation/popup";
import { useAlertUnAuthenticate } from "@state/store/alert";

const AlertUnAuthenticated = () => {
  const onPressedToggleAuth = useToggleAuth(
    (state) => state.onPressedToggleAuth
  );

  const state = useAlertUnAuthenticate();

  const onPressedOpenAuth = () => {
    state.onPressedChangeAlertUnauthenticate("");

    onPressedToggleAuth();
  };

  return (
    <>
      <AnimatePresence>
        {state.open && (
          <>
            <motion.section
              variants={fadeInAnimate}
              onClick={() => state.onPressedChangeAlertUnauthenticate("")}
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
                  className="w-[300px] h-[300px] rounded-md relative overflow-hidden"
                >
                  <Image
                    className="object-cover"
                    src={state.coverImage}
                    alt={"cover image"}
                    fill
                  />
                </motion.div>

                <motion.div
                  variants={fadeUpAnimate}
                  className="w-[80%] text-center flex flex-col justify-center items-center"
                >
                  <h4 className="text-white text-center font-[600] text-3xl mt-5 line-clamp-2">
                    Start listening for free P3Music Account
                  </h4>
                </motion.div>
                <motion.div variants={fadeUpAnimate}>
                  <Button
                    className="text-black font-[500] bg-green-500 mt-7 p-4 text-lg rounded-full w-[170px] hover:bg-green-600 transition-colors"
                    onClick={onPressedOpenAuth}
                    types="fill"
                  >
                    Sign Up
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeUpAnimate}
                  className="flex justify-center items-center gap-3 mt-3"
                >
                  <p className="text-md text-stone-400">
                    Already have an account?
                  </p>
                  <button
                    onClick={onPressedOpenAuth}
                    className="text-lg text-white font-[500] hover:opacity-60 transition-opacity"
                  >
                    Log in
                  </button>
                </motion.div>
              </section>

              <button
                onClick={() => state.onPressedChangeAlertUnauthenticate("")}
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

export default AlertUnAuthenticated;
