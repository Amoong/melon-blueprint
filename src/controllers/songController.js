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

export const getPopuler = async (req, res) => {
  try {
    const songs = await Song.find({});
    // 오름차순
    songs.sort((a, b) => b.views - a.views).slice(0, 10);

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
    views: 142534,
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
    views: 543092,
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
    views: 153829,
  },
  {
    title: "Breaking Sweat",
    artist: "BalloonPlanet",
    filename: "BalloonPlanet - Breaking Sweat",
    album: "Final Round",
    genres: [GENRE.FUNK, GENRE.POP],
    views: 15382,
  },
  {
    title: "Long Strokes",
    artist: "Ziv Moran",
    filename: "Ziv Moran - Long Strokes",
    album: "Long Strokes",
    genres: [GENRE.CINEMATIC],
    views: 238584,
  },
  {
    title: "Premiere",
    artist: "Adrián Berenguer",
    filename: "Adrián Berenguer - Premiere",
    album: "Presto",
    genres: [GENRE.CINEMATIC, GENRE.CLASSICAL],
    views: 2385,
  },
  {
    title: "Step into Success",
    artist: "Zac Nelson",
    filename: "Zac Nelson - Step into Success",
    album: "Step into Success",
    genres: [GENRE.CORPORATE],
    views: 11100,
  },
  {
    title: "DABOOMJIGGLE",
    artist: "Out of Flux",
    filename: "Out of Flux - DABOOMJIGGLE",
    album: "Saxbounce",
    genres: [GENRE.POP, GENRE.ELECTRONIC, GENRE.FUNK],
    views: 89998,
  },
  {
    title: "Taste of Freedom",
    artist: "Steven Beddall",
    filename: "Steven Beddall - Taste of Freedom",
    album: "Taste of Freedom",
    genres: [
      GENRE.LOFI_AND_CHILL_BEATS,
      GENRE.LOUNGE,
      GENRE.HIP_HOP,
      GENRE.SOUL_AND_RNB,
    ],
    views: 5102,
  },
  {
    title: "The Last Hero",
    artist: "Veaceslav Draganov",
    filename: "Veaceslav Draganov - The Last Hero",
    album: "Ocean Depth",
    genres: [GENRE.CINEMATIC],
    views: 332,
  },
];
