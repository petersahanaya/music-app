import { prisma } from "@lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OPTIONS } from "@auth/route";

export async function GET(req: Request) {
  const url = req.url;
  console.log(url);

  const searchParams = new URLSearchParams(url);
  const take = searchParams.get("take");
  const offset = searchParams.get("offset");
  const search = searchParams.get("q");

  const album = searchParams.get("album");

  const genre = searchParams.get("genre");

  try {
    if (genre) {
      const listOfMusic = await prisma.music.findMany({
        where: {
          genre,
        },
        skip: Number(offset) ?? 0,
        take: Number(take) ?? 0,
      });

      return NextResponse.json({ listOfMusic });
    }

    if (album) {
      const session = await getServerSession(OPTIONS);

      if (!session || !session.user) {
        return NextResponse.json(
          { message: "UnAuthorized User." },
          { status: 403 }
        );
      }

      const myAlbums = await prisma.user.findUnique({
        where: {
          userId: session.user.userId as string,
        },
        select: {
          Album: true,
          email: false,
          Favorite: false,
          id: false,
          profile: false,
          userId: false,
          username: false,
        },
      });

      return NextResponse.json({ albums: myAlbums });
    }

    if (search) {
      const listOfMusic = await prisma.music.findMany({
        where: {
          title: {
            contains: search.toLowerCase(),
            mode: "insensitive",
          },
        },
      });

      return NextResponse.json({ music: listOfMusic });
    }

    if (search && genre) {
      const listOfMusic = await prisma.music.findMany({
        where: {
          title: {
            contains: search.toLowerCase(),
            mode: "insensitive",
          },
          genre,
        },
      });

      return NextResponse.json({ music: listOfMusic });
    }

    if (album && genre) {
      const session = await getServerSession(OPTIONS);

      if (!session || !session.user) {
        return NextResponse.json(
          { message: "UnAuthorized User." },
          { status: 403 }
        );
      }

      const myAlbums = await prisma.user.findUnique({
        where: {
          userId: session.user.userId as string,
        },
        select: {
          Album: {
            where: {
              genre,
            },
          },
          email: false,
          Favorite: false,
          id: false,
          profile: false,
          userId: false,
          username: false,
        },
      });

      return NextResponse.json({ albums: myAlbums });
    }

    const listOfMusic = await prisma.music.findMany({
      skip: Number(offset) ?? 0,
      take: Number(take) ?? 0,
    });

    return NextResponse.json({ listOfMusic });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }

    return NextResponse.json({ message: e }, { status: 500 });
  }
}
