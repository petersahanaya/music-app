import { prisma } from "@lib/db";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadFile } from "@lib/functions/converter";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth/route";
import { z } from "zod";
import { schema } from "@lib/validation";

export const runtime = "nodejs";

type TypeFormBody = z.infer<typeof schema>;

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
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json(
      { message: "UnAuthorized User." },
      { status: 403 }
    );

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData) as TypeFormBody;

    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 }
      );
    }

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
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }

    return NextResponse.json({ message: e }, { status: 500 });
  }
}
