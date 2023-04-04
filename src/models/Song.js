import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLengh: 30 },
  artist: String,
  album: String,
  genres: [{ type: String }],
  views: Number,
  time: Number,
});

const Song = mongoose.model("Song", songSchema);

export default Song;
