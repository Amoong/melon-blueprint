import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLengh: 30 },
  artist: { type: String, require: true, trim: true, maxLengh: 30 },
  filename: { type: String, require: true, trim: true, maxLengh: 100 },
  album: String,
  genres: [{ type: String }],
  views: { type: Number, default: 0 },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
