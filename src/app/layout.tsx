import Sidebar from "@component/sidebar";
import Header from "@component/header";
import SessionProvider from "@component/sessionProvider";
import AlertJoin from "@component/alert/join";
import { Figtree } from "next/font/google";
import "./globals.css";
import ProfileDropDown from "@component/dropdown/profile";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@auth/route";
import PostDropDown from "@component/dropdown/post";

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
  const session = await getServerSession(OPTIONS);

  return (
    <html lang="en">
      <body className={figtree.className}>
        <SessionProvider>
          <main className="w-screen h-screen flex flex-col md:flex-row items-center">
            <Sidebar />
            <Header />
            {children}
            <AlertJoin session={session!} />
            <ProfileDropDown session={session!} />
            <PostDropDown />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
