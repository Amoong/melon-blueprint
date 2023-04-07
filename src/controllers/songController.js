import Song from "../models/Song.js";
import User from "../models/User.js";
import path from "path";

const __dirname = path.resolve();

export const home = async (req, res) => {
  Song.find({}, (error, videos) => {
    console.log(error, videos);
  });
  return res.sendFile(__dirname + "/client/index.html");
};

export const insert = async (req, res) => {
  await Song.create({
    title: "Snooze",
    artist: "SZA",
    album: "SOS",
    views: 1200,
  });
  console.log("insert");
  return res.sendFile(__dirname + "/views/home.html");
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
