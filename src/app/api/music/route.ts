import { prisma } from "@lib/db";
import { FormSchema } from "@component/dropdown/post/form";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadFile } from "@lib/functions/converter";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@auth/route";

export const runtime = "nodejs";
export const config = {
  api: {
    bodyParser: false,
  },
};

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  secure: process.env.NODE_ENV === "production",
});

export async function POST(req: Request) {
  const session = await getServerSession(OPTIONS);

  if (!session || !session.user)
    return NextResponse.json(
      { message: "unauthenticated user" },
      { status: 403 }
    );

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData) as FormSchema;

    const largeImage = CloudinaryUploadFile(
      body.largeImage!
    ) as Promise<CloudinaryResponse>;
    const coverImage = CloudinaryUploadFile(
      body.coverImage!
    ) as Promise<CloudinaryResponse>;
    const song = CloudinaryUploadFile(
      body.song!
    ) as Promise<CloudinaryResponse>;

    const result = await Promise.all([largeImage, coverImage, song]);

    await prisma.music.create({
      data: {
        title: body.title,
        description: body.description,
        lyric: body.lyric,
        genre: body.genre!,
        coverImage: result[0].secure_url,
        largeImage: result[1].secure_url,
        musicUrl: result[2].secure_url,

        author: {
          connect: {
            userId: session.user.userId!,
          },
        },
      },
    });

    return NextResponse.json({
      message: "uploaded!",
      status: 201,
    });
  } catch (e) {
    console.log("ERROR", e);

    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = req.url;

  const searchParams = new URLSearchParams(url);

  const isAlbum = searchParams.has("album");

  const isGenre = searchParams.has("genre");

  if (!isAlbum && !isGenre) {
  }
}
