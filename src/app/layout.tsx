import { getServerSession } from "next-auth";
import { Figtree } from "next/font/google";
import { authOptions } from "@auth/route";
import "./globals.css";

import Sidebar from "@component/sidebar";
import SessionProvider from "@component/sessionProvider";
import Footer from "@component/footer";
import AlertJoin from "@component/alert/join";
import ProfileDropDown from "@component/dropdown/profile";
import PostDropDown from "@component/dropdown/post";
import AudioProvider from "@component/audioPlayer/audioProvider";
import AlertUnAuthenticated from "@component/alert/unauthenticate";
import AuthDropDown from "@component/dropdown/auth";
import { ReactChild } from "@/types/types";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const figtree = Figtree({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={figtree.className}>
        <SessionProvider>
          <AlertUnAuthenticated />
          <main className="w-screen h-screen flex flex-col md:flex-row items-center justify-between md:pt-2 ">
            <Sidebar />
            <AuthDropDown />
            <div className="w-[19%] h-full hidden md:inline-block"></div>
            {children}
            <AlertJoin session={session!} />
            <ProfileDropDown session={session!} />
            <PostDropDown />
            <AudioProvider />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}

//pb-32
