import { Music } from "@prisma/client";
import { z } from "zod";

const MB = 1024;

const MAX_IMAGE_FILE_SIZE = MB * 2;
const MAX_AUDIO_FILE_SIZE = MB * 10;

const ACCEPTED_IMAGE_TYPE = ["image/jpg", "image/jpeg", "image/png"];
const ACCEPTED_AUDIO_TYPE = ["audio/mpeg"];
export const ACCEPTED_GENRE = [
  "pop",
  "rock",
  "mood",
  "hiphop",
  "chill",
] as const;

export const GENRES = [
  "all",
  "pop",
  "rock",
  "mood",
  "hiphop",
  "chill",
] as const;

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
      "Max image size is 2MB."
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
      "Only supported .jpg, .jpeg, .png formats are supported"
    ),
  coverImage: z
    .custom<File>()
    .refine(
      (file: File) => file?.size >= MAX_IMAGE_FILE_SIZE,
      "Max image size is 2MB."
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

export const listOfMusicDummy: Music[] = [
  {
    id: "64ba8065a21ebfc287dfedc2",
    title: "Soft Piano",
    description:
      "makes you better with slow down piano, relax, simple and awesome. ",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1689944153/music/rdx8rqucwbwl8dnf2dth.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1689944146/music/yv5d6cpvqmgl6b9m1myi.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1689944155/music/xq8t3qejsvvonf2epc1f.mp3",
    views: 0,
    lyric: "- ",
    genre: "chill",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-07-21T12:56:04.551Z",
    updatedAt: "2023-08-15T11:59:27.321Z",
  },
  {
    id: "64bbe1e35e61cf9da4bf2754",
    title: "On my way",
    description:
      "mood song, calm and determination with the protagonist embracing their independence and personal journey. ",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690034645/music/unkb0ymnymsmgwuw3cbg.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690034648/music/roz1xyc2ijootihy3geb.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1690034648/music/luh1nhkupjfrbiiza1ds.mp3",
    views: 0,
    lyric:
      "[Verse 1: Sabrina Carpenter] I'm sorry but Don't wanna talk, I need a moment before I go It's nothing personal I draw the blinds, they don't need to see me cry 'Cause even when they understand, they don't understand So then when I'm finished I'm all 'bout my business and ready to save the world I'm takin' my misery, make it my bitch Can't be everyone's favorite girl  [Chorus: Sabrina Carpenter] So, take aim and fire away I've never been so wide awake No, nobody but me can keep me safe And I'm on my way  [Verse 2: Sabrina Carpenter] The blood moon is on the rise The fire burning in my eyes No, nobody but me can keep me safe And I'm on my way  [Verse 3: Farruko] Lo siento mucho (Farru), pero me voy (Eh) Porque a tu lado me di cuenta que nada soy (Eh-ey) Y me cansé de luchar y de guerrear en vano De estar en la línea de fuego y de meter la mano Acepto mis errore', también soy humano Y tú no ve' que lo hago porque te amo Pero ya (Ya) no tengo más na' que hacer aquí (Aquí) Me voy, llegó la hora 'e partir  [Chorus: Sabrina Carpenter] En mi propio camino, seguir lejos de ti So, take aim and fire away I've never been so wide awake No, nobody but me can keep me safe And I'm on my way  [Verse 4: Farruko] La luna de sangre está en lo alto Muchos están por caer, pero yo no me doy No, no, no, no, en la cara llevo el dolor Porque a nadie le debo nada  [Chorus: Sabrina Carpenter] Take aim and fire away I've never been so wide awake No, nobody but me can keep me safe And I'm on my way  [Bridge: Sabrina Carpenter] The blood moon is on the rise The fire burning in my eyes No, nobody but me can keep me safe And I'm on my way  [Chorus: Sabrina Carpenter] Take aim and fire away I've never been so wide awake No, nobody but me can keep me safe And I'm on my way  [Outro: Farruko] En mi propio camino, seguir lejos de ti Lo siento mucho, pero me voy",
    genre: "mood",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-07-22T14:04:19.233Z",
    updatedAt: "2023-08-15T12:04:42.500Z",
  },
  {
    id: "64be77b0b0b00f4de2f46f56",
    title: "Bread",
    description:
      "simple, slow, and relaxing music, makes you feel comfortable and relax.",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690204067/music/sh0sjtrtinbvu2m8zc45.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690204066/music/xxmtstglfuloap7eympd.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1690204069/music/esx9lvgh0rfs2geawwfy.mp3",
    views: 0,
    lyric: "- ",
    genre: "mood",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-07-24T13:07:58.341Z",
    updatedAt: "2023-08-15T14:07:03.988Z",
  },
  {
    id: "64c8c580300753c2d55a5080",
    title: "Memories ",
    description:
      "Slow, private and piano. makes you feel relax and focus on your self.",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690879357/music/jvh50z73jkfcnfhrm6d2.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690879353/music/t2swrl8lmfphn8t3qaqb.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1690879353/music/hmh5nv4ubw4qc2bey22y.mp3",
    views: 0,
    lyric: "Beat memories by lukrembo.",
    genre: "chill",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-08-01T08:42:40.133Z",
    updatedAt: "2023-08-15T12:10:13.279Z",
  },
  {
    id: "64c8cdcf28d8983e3aa1e40e",
    title: "Holliday ",
    description:
      "mood, chill and passion. good for your spirit and be the best.",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690881478/music/zwyha7pff9heo3hjvzii.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690881477/music/uvlqfidxquqvul2yfp27.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1690881479/music/oh8m5elxs3swxf79ie51.mp3",
    views: 0,
    lyric: "Holliday by lukrembo.",
    genre: "mood",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-08-01T09:18:07.026Z",
    updatedAt: "2023-08-15T11:56:50.352Z",
  },
  {
    id: "64c8d117961b2265f36eb98d",
    title: "Someone you loved ",
    description:
      "chill, romance. feel the love and makes you feel relax with soft music.",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690882309/music/l2n6flfspzf3lbkarb2l.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690882307/music/bpvphvpd7ici25caoiuv.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1690882318/music/yafakj3077cq31ywwhwt.mp3",
    views: 0,
    lyric: "Lewis Capaldi - Someone You Loved - Emma Heesters Cover",
    genre: "chill",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-08-01T09:32:06.560Z",
    updatedAt: "2023-08-15T14:16:17.548Z",
  },
  {
    id: "64c8dc10ed1c9d460f747689",
    title: "I Love You 3000",
    description:
      "chill, mood and feel the vibes, feel the mood, romance love you 3000.",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690885113/music/ohj2swzy84cxeczmk3yu.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1690885114/music/nyyafwzbspix1jdmvllf.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1690885122/music/ggwjmvqz34qohqebv7at.mp3",
    views: 0,
    lyric:
      "Baby, take my hand I want you to be my husband 'Cause you're my Iron Man And I love you 3000 Baby, take a chance 'Cause I want this to be something Straight out of a Hollywood movie I see you standing there In your Hulk outerwear And all I can think Is where is the ring 'Cause I know you wanna ask Scared the moment will pass I can see it in your eyes Just take me by surprise And all my friends they tell me they see You planning to get on one knee But I want it to be out of the blue So make sure I have no clue When you ask Baby, take my hand I want you to be my husband 'Cause you're my Iron Man And I love you 3000 Baby, take a chance 'Cause I want this to be something Straight out of a Hollywood movie Now we're having dinner And baby you're my winner I see the way you smile You're thinking about the aisle You reach in your pocket Emotion unlocking And before you could ask I answer too fast And all my friends they tell me they see You planning to get on one knee So now I can't stop thinking about you I figured out all the clues So now I ask Baby, take my hand I want you to be my husband 'Cause you're my Iron Man And I love you 3000 Baby, take a chance 'Cause I want this to be something Straight out of a Hollywood movie Pa da da da da dam No spoilers please Pa da da da da dam No spoilers please Baby, take my hand I want you to be my husband 'Cause you're my Iron Man And I love you 3000 Baby, take a chance 'Cause I want this to be something Straight out of a Hollywood movie, baby Pa da da da da dam No spoilers please Pa da da da da dam No spoilers please Pa da da da da dam No spoiler please Pa da da da da dam And I love you 3000",
    genre: "mood",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-08-01T10:18:55.261Z",
    updatedAt: "2023-08-15T13:56:37.481Z",
  },
  {
    id: "64d1f79d7c675603258d5fbc",
    title: "Ten Thousend Hours",
    description:
      "romance, mood and sweet. slow song makes you feel comfortable  on every situation.",
    largeImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1691482004/music/x96ct7izxdjq6gjz10jg.jpg",
    coverImage:
      "https://res.cloudinary.com/dlvi65trb/image/asset/v1691482004/music/xvsd2hdfdud2uxuo3nre.jpg",
    musicUrl:
      "https://res.cloudinary.com/dlvi65trb/video/asset/v1691482005/music/e9eqhhxeb2g6msvhp1mf.mp3",
    views: 0,
    lyric:
      "Do you love the rain, does it make you dance When you're drunk with your friends at a party? What's your favorite song, does it make you smile? Do you think of me? When you close your eyes Tell me, what are you dreamin'? Everything, I wanna know it all I'd spend 10, 000 hours and 10, 000 more Oh, if that's what it takes to learn that sweet heart of yours And I might never get there, but I'm gonna try If it's 10, 000 hours or the rest of my life I'm gonna love you (Ooh, ooh-ooh, ooh, ooh) Do you miss the road that you grew up on? Did you get your middle name from your grandma? When you think about your forever now Do you think of me? When you close your eyes Tell me, what are you dreamin'? Everything, I wanna know it all I'd spend 10, 000 hours and 10, 000 more Oh, if that's what it takes to learn that sweet heart of yours And I might never get there, but I'm gonna try If it's 10, 000 hours or the rest of my life I'm gonna love you (Ooh, ooh-ooh, ooh, ooh) I'm gonna love you (Ooh, ooh-ooh, ooh, ooh) Ooh, want the good and the bad, everything in between Ooh, gotta cure my curiosity Oh, yeah I'd spend 10, 000 hours and 10, 000 more Oh, if that's what it takes to learn that sweet heart of yours And I might never get there, but I'm gonna try If it's 10, 000 hours or the rest of my life I'm gonna love you (Ooh, ooh-ooh, ooh, ooh) I'm gonna love you, oh yeah(Ooh, ooh-ooh, ooh, ooh) And I, I'm gonna love you (Ooh, ooh-ooh, ooh, ooh) I, I'm gonna love you (Ooh, ooh-ooh, ooh, ooh)",
    genre: "chill",
    historyId: "107512221066018071153",
    favoriteId: null,
    authorId: "107512221066018071153",
    createdAt: "2023-08-08T08:06:53.340Z",
    updatedAt: "2023-08-15T12:05:48.302Z",
  },
];

export const lyric = `
Baby, take my hand

I want you to be my husband

'Cause you're my Iron Man

And I love you 3000

Baby, take a chance

'Cause I want this to be something

Straight out of a Hollywood movie

I see you standing there

In your Hulk outerwear

And all I can think

Is where is the ring

'Cause I know you wanna ask

Scared the moment will pass

I can see it in your eyes

Just take me by surprise

And all my friends they tell me they see

You planning to get on one knee

But I want it to be out of the blue

So make sure I have no clue

When you ask

Baby, take my hand

I want you to be my husband

'Cause you're my Iron Man

And I love you 3000

Baby, take a chance

'Cause I want this to be something

Straight out of a Hollywood movie

Now we're having dinner

And baby you're my winner

I see the way you smile

You're thinking about the aisle

You reach in your pocket

Emotion unlocking

And before you could ask

I answer too fast

And all my friends they tell me they see

You planning to get on one knee

So now I can't stop thinking about you

I figured out all the clues

So now I ask

Baby, take my hand

I want you to be my husband

'Cause you're my Iron Man

And I love you 3000

Baby, take a chance

'Cause I want this to be something

Straight out of a Hollywood movie

Pa da da da da dam

No spoilers please

Pa da da da da dam

No spoilers please

Baby, take my hand

I want you to be my husband

'Cause you're my Iron Man

And I love you 3000

Baby, take a chance

'Cause I want this to be something

Straight out of a Hollywood movie, baby

Pa da da da da dam

No spoilers please

Pa da da da da dam

No spoilers please

Pa da da da da dam

No spoiler please

Pa da da da da dam

And I love you 3000`;
