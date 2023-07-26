import { v2 as cloudinary } from "cloudinary";

export default async function FileToBase64(file: File) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      const base64 = buffer.toString("base64");

      return resolve(base64);
    } catch (e: any) {
      return reject(e);
    }
  });
}

export async function CloudinaryUploadFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();

  const buffer = new Uint8Array(arrayBuffer);

  const result = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          type: "asset",
          resource_type: "auto",
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          folder: "music",
          transformation: { quality: 80 },
        },
        (err, result) => {
          if (err) return reject(err);

          return resolve(result);
        }
      )
      .end(buffer);
  });

  return result;
}
