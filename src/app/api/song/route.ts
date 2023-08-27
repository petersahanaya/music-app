import { prisma } from "@lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@auth/route";

export async function GET(req: Request) {
  const url = req.url;

  const { searchParams } = new URL("", url);

  const take = searchParams.get("take");
  const offset = searchParams.get("offset");
  const search = searchParams.get("q");

  const album = searchParams.get("album");
  const favorite = searchParams.get("favorite");
  const genre = searchParams.get("genre");
  const songId = searchParams.get("songId");
  const popular = searchParams.get("popular");
  const news = searchParams.get("new");

  const type = searchParams.get("type") as "history" | "like" | "search" | "";

  console.log("GENRE", genre);
  try {
    if (genre && type !== "search") {
      const listOfMusic = await prisma.music.findMany({
        where: {
          genre,
        },
        skip: Number(offset) || 0,
        take: Number(take) || 0,
      });

      return NextResponse.json({ listOfMusic });
    }

    if (favorite) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        return NextResponse.json(
          { message: "UnAuthorized User." },
          { status: 403 }
        );
      }

      const listOfFavorite = await prisma.user.findUnique({
        where: {
          userId: session.user.userId as string,
        },
        include: {
          Favorite: {
            take: Number(take) || 8,
            skip: Number(offset) || 0,
          },
        },
      });

      return NextResponse.json({
        listOfFavorite: listOfFavorite ? listOfFavorite.Favorite : [],
      });
    }

    if (songId) {
      const song = await prisma.music.findUnique({
        where: {
          id: songId,
        },
        include: {
          author: {
            select: {
              profile: true,
              username: true,
              userId: true,
            },
          },
          favorite: {
            select: {
              userId: true,
            },
          },
        },
      });

      return NextResponse.json({ song });
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

      return NextResponse.json({ listOfAlbum: myAlbums ? myAlbums.Album : [] });
    }

    if (type === "search") {

      if (!genre) {
        const listOfMusic = await prisma.music.findMany({
          where: {
            title: {
              contains: search ? search.toLowerCase() : "",
              mode: "insensitive",
            },
          },
        });

        return NextResponse.json({ listOfMusic: listOfMusic || [] });
      }

      if (genre) {
        const listOfMusic = await prisma.music.findMany({
          where: {
            title: {
              contains: search ? search.toLowerCase() : "",
              mode: "insensitive",
            },
            genre: {
              contains: genre ? genre.toLowerCase() : "",
              mode: "insensitive",
            },
          },
        });

        return NextResponse.json({ listOfMusic: listOfMusic || [] });
      }
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

    if (genre) {
      const listOfMusic = await prisma.music.findMany({
        where: {
          genre,
        },
        take: Number(take) || 4,
        skip: Number(offset) || 0,
      });

      return NextResponse.json({ listOfMusic });
    }

    if (type && type === "history") {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
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
          History: {
            take: Number(take) || 5,
            orderBy: {
              updatedAt: "asc",
            },
          },
        },
        take: Number(take) || 5,
        skip: Number(offset) || 0,
      });

      return NextResponse.json({
        listOfMusic: historyMusic ? historyMusic.History : [],
      });
    }

    if (news) {
      const listOfMusic = await prisma.music.findMany({
        skip: Number(offset) || 0,
        take: Number(take) || 20,
        orderBy: {
          createdAt: news ? "desc" : "asc",
        },
      });

      return NextResponse.json({ listOfMusic });
    }

    if (popular) {
      const listOfMusic = await prisma.music.findMany({
        skip: Number(offset) || 0,
        take: Number(take) || 20,
        orderBy: {
          views: popular ? "desc" : "asc",
        },
      });

      return NextResponse.json({ listOfMusic });
    }

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

export async function PATCH(req: Request) {
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
        id: songId,
      },
    });

    if (!found) {
      return NextResponse.json(
        { message: "Cannot found song id" },
        { status: 204 }
      );
    }

    await prisma.user.update({
      where: {
        userId: session.user.userId as string,
      },
      data: {
        History: {
          connect: {
            id: songId,
          },
        },
      },
    });

    return NextResponse.json({ message: "Successfully added" });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
