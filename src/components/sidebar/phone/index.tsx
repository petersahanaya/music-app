"use client";

import Profile from "@component/profile";
import { fadeInAnimate, fadeLeftAnimate } from "@animation/fade";
import { useSidebar } from "@state/store/sidebar";

import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

const paths = ["/", "/history", "/favorite", "/album"];

type PhoneSidebarProps = {
  session: Session | null;
};

const PhoneSidebar = ({ session }: PhoneSidebarProps) => {
  const state = useSidebar();
  const route = usePathname();

  const onPressedCloseSidebar = () => {
    state.onPressedToggleSidebar();
  };

  return (
    <>
      <AnimatePresence>
        {state.open ? (
          <motion.aside
            variants={fadeLeftAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-screen h-screen fixed top-0 left-0 z-[80] bg-stone-900"
          >
            <header className="w-full flex justify-between items-center px-8 p-2 border-b-[1px] border-b-stone-600">
              <div className="w-[50px] h-[50px] relative overflow-hidden rounded-full">
                <Profile
                  src={session ? session.user.image! : "/profile.jpeg"}
                />
              </div>

              <IoClose
                role="button"
                onClick={onPressedCloseSidebar}
                size={40}
                className="text-stone-100"
              />
            </header>

            <nav className="">
              {paths.map((path, idx) => (
                <motion.section
                  variants={fadeInAnimate}
                  className={`w-full h-max p-2 ${
                    path === route
                      ? "bg-orange-50 text-stone-800"
                      : "text-stone-500"
                  } transition-colors`}
                  key={idx}
                >
                  <Link href={path}>
                    <h3 className="capitalize text-5xl font-[700]">
                      {path === "/" ? "Home" : path.split("/")[1]}
                    </h3>
                  </Link>
                </motion.section>
              ))}
            </nav>
          </motion.aside>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhoneSidebar;
