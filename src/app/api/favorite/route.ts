import { prisma } from "@lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@auth/route";

export async function GET(req: Request) {
  const { searchParams } = new URL("", req.url);

  const songId = searchParams.get("songId");
  const userId = searchParams.get("userId");

  if (!songId || !userId)
    return NextResponse.json(
      {
        message: "there's something wrong.",
      },
      { status: 400 }
    );

  try {
    const isFavorite = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        Favorite: {
          where: {
            id: songId,
          },
        },
      },
    });


    if (isFavorite && isFavorite.Favorite.length) {
      return NextResponse.json({ favorite: true });
    }

    return NextResponse.json({ favorite: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL("", req.url);

  const favorite = searchParams.get("favorite");
  const type = searchParams.get("type") as "like";
  const songId = searchParams.get("songId") as string;


  if (favorite && type === "like") {
    try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        return NextResponse.json(
          {
            message: "UnAuthozied User.",
          },
          { status: 403 }
        );
      }

      const userId = session.user.userId;

      const alreadyLike = await prisma.user.findUnique({
        where: {
          userId: userId as string,
        },
        select: {
          Favorite: {
            where: {
              id: songId,
            },
          },
        },
      });

      if (alreadyLike && alreadyLike.Favorite.length) {
        const result = await prisma.user.update({
          where: {
            userId: userId as string,
          },
          data: {
            Favorite: {
              disconnect: {
                id: songId,
              },
            },
          },
        });


        return NextResponse.json({ message: "updated" });
      }

      await prisma.user.update({
        where: {
          userId: userId as string,
        },
        data: {
          Favorite: {
            connect: {
              id: songId,
            },
          },
        },
      });

      return NextResponse.json({ message: "updated" });
    } catch (e) {
      return NextResponse.json(
        { message: "Something went wrong.." },
        { status: 500 }
      );
    }
  }
}
