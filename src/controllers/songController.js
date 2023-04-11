import Song from "../models/Song.js";
import User from "../models/User.js";
import path from "path";

import { GENRE } from "../constants.js";

const __dirname = path.resolve();

export const home = async (req, res) => {
  Song.find({}, (error, videos) => {
    console.error(error, videos);
  });
  return res.sendFile(__dirname + "/client/index.html");
};

export const insert = async (req, res) => {
  await Song.create(MUSICS);
  return res.sendFile(__dirname + "/client/index.html");
};

export const getAll = async (req, res) => {
  try {
    const songs = await Song.find({});
    return res.send(songs);
  } catch (error) {
    console.error(error);
    return res.send([]);
  }
};

const MUSICS = [
  {
    title: "Electric Head",
    artist: "AlexGrohl",
    filename: "AlexGrohl - Electric Head",
    album: "Wild Fire",
    genres: [GENRE.ELECTRONIC, GENRE.ROCK],
  },
  {
    title: "Joy Ride",
    artist: "Aves",
    filename: "Aves - Joy Ride",
    album: "Joy Ride",
    genres: [
      GENRE.SOUL_AND_RNB,
      GENRE.HIP_HOP,
      GENRE.LOUNGE,
      GENRE.LOFI_AND_CHILL_BEATS,
    ],
  },
  {
    title: "The Twelve Days Of Christmas",
    artist: "Ian Post",
    filename: "Ian Post - The Twelve Days Of Christmas",
    album: "The Twelve Days Of Christmas",
    genres: [
      GENRE.JAZZ,
      GENRE.CINEMATIC,
      GENRE.HOLIDAY,
      GENRE.RETRO,
      GENRE.WORSHIP,
    ],
  },
];
