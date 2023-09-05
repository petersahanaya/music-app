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
import PhoneSidebar from "@component/sidebar/phone";
import { Metadata } from "next";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const figtree = Figtree({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "P3Music",
  description: "Discover and listen to a wide range of music on P3Music.",
  icons: "/favicon.png",
  keywords: ["music", "streaming", "playlists", "artists", "albums"],
  authors: {
    name: "Peter Sahanaya",
    url: "https://linkedin.com/in/peter-sahanaya",
  },
  openGraph: {
    type: "music.song",
    url: "https://p3music.vercel.app",
    title: "P3Music",
    description: "Discover and listen to a wide range of music on P3Music.",
    emails: ["petersahanaya09@gmail.com"],
    images: "/favicon.png",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
  },
  viewport: {
    initialScale: 1,
    viewportFit: "cover",
    userScalable: false,
  },
  manifest: "/site.webmanifest",
};

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
          <main
            style={{ WebkitTapHighlightColor: "transparent" }}
            className="w-screen h-screen flex flex-col md:flex-row items-center justify-between md:pt-2 "
          >
            <Sidebar />
            <AuthDropDown />
            <PhoneSidebar session={session} />
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
