import { prisma } from "@lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@auth/route";
import { Music } from "@prisma/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  console.log("SESSION", session);
  const url = req.url;

  const { searchParams } = new URL("", url);

  const take = searchParams.get("take");
  const offset = searchParams.get("offset");
  const search = searchParams.get("q");

  const album = searchParams.get("album");
  const genre = searchParams.get("genre");
  const type = searchParams.get("type") as "history" | "";

  console.log(type);

  try {
    if (genre) {
      const listOfMusic = await prisma.music.findMany({
        where: {
          genre,
        },
        skip: Number(offset) || 0,
        take: Number(take) || 0,
      });

      return NextResponse.json({ listOfMusic });
    }

    if (album) {
      const session = await getServerSession(authOptions);

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
      const session = await getServerSession(authOptions);

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

    if (type === "history") {
      console.log("TRIGGER");
      const session = await getServerSession(authOptions);

      console.log(session);

      if (!session || !session.user) {
        console.log("UNAuthorized Trigger");

        return NextResponse.json(
          { message: "UnAuthorized User" },
          { status: 403 }
        );
      }

      const historyMusic = await prisma.user.findFirst({
        where: {
          History: {
            every: {
              historyId: session.user.userId as string,
            },
          },
        },
        include: {
          History: true,
        },
        take: Number(take) || 5,
        skip: Number(offset) || 0,
      });

      console.log({ historyMusic });

      return NextResponse.json({
        listOfMusic: historyMusic ? historyMusic.History : [],
      });
    }

    console.log("TRIGGER");

    const listOfMusic = await prisma.music.findMany({
      skip: Number(offset) || 0,
      take: Number(take) || 20,
    });

    return NextResponse.json({ listOfMusic });
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }

    return NextResponse.json({ message: e }, { status: 500 });
  }
}

/*
            History: true,
          username: false,
          userId: false,
          updatedAt: false,
          Album: false,
          createdAt: false,
          email: false,
          Favorite: false,
          id: false,
          profile: false,
*/

export async function Update(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "UnAuthorized User" }, { status: 403 });
  }

  const url = req.url;

  const { searchParams } = new URL("", url);

  const songId = searchParams.get("songId");

  if (!songId) {
    return NextResponse.json(
      { message: "Song id are required" },
      { status: 400 }
    );
  }

  try {
    const found = await prisma.music.findUnique({
      where: {
        id: session.user.userId as string,
      },
    });

    if (!found) {
      return NextResponse.json(
        { message: "Cannot found song id" },
        { status: 204 }
      );
    }

    const result = await prisma.user.update({
      where: {
        userId: session.user.userId as string,
      },
      data: {
        History: {
          connect: {
            id: found.id,
          },
        },
      },
    });

    console.log("RESULT", result);
  } catch (e: any) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
