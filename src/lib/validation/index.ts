import { z } from "zod";

const MB = 1024;

const MAX_IMAGE_FILE_SIZE = MB * 5;
const MAX_AUDIO_FILE_SIZE = MB * 10;

const ACCEPTED_IMAGE_TYPE = ["image/jpg", "image/jpeg", "image/png"];
const ACCEPTED_AUDIO_TYPE = ["audio/mpeg"];
export const ACCEPTED_GENRE = ["pop", "rock", "mood", "hiphop", "chill"];

export const schema = z.object({
  title: z
    .string({ description: "title are required." })
    .min(5, { message: "title must contains at least 5 character" })
    .max(30, { message: "title must less than 30 character" }),
  description: z
    .string({ description: "description are required." })
    .min(10, { message: "description must contains at least 10 character" }),
  lyric: z.string({ description: "lyric are required." }),
  // .min(10, { message: "lyric must contains at least 10 character" }),
  genre: z
    .enum(["pop", "rock", "mood", "hiphop", "chill"], {
      description: "genre are required",
    })
    .refine(
      (args) => ACCEPTED_GENRE.includes(args),
      "Only supported pop, rock, mood, hiphop and chill genre are supported."
    ),
  largeImage: z
    .custom<File>()
    .refine(
      (file: File) => file?.size >= MAX_IMAGE_FILE_SIZE,
      "Max image size is 5MB."
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
      "Only supported .jpg, .jpeg, .png formats are supported"
    ),
  coverImage: z
    .custom<File>()
    .refine(
      (file: File) => file?.size >= MAX_IMAGE_FILE_SIZE,
      "Max image size is 5MB."
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
      "Only supported .jpg, .jpeg, .png formats are supported"
    ),
  song: z
    .custom<File>()
    .refine(
      (file: File) => file?.size >= MAX_AUDIO_FILE_SIZE,
      "Max Audio file size in 10MB"
    )
    .refine(
      (file: File) => ACCEPTED_AUDIO_TYPE.includes(file?.type),
      "Only support audio .mpeg, .mp3 formats are supported"
    ),
});
