import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { prisma } from "@lib/db";

export const OPTIONS: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (!session.user.userId) {
        session.user.userId = token.sub;

        return session;
      }

      return session;
    },
    async signIn({ user, account }) {
      const found = await prisma.user.findUnique({
        where: {
          userId: account?.providerAccountId as string,
        },
      });

      if (!found) {
        await prisma.user.create({
          data: {
            userId: account?.providerAccountId as string,
            username: user.name as string,
            email: user.email as string,
            profile: user.image as string,
          },
        });
        return true;
      }

      return true;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: "secret",
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
