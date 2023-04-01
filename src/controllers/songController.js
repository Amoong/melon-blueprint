import Song from "../models/Song.js";
import User from "../models/User.js";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};
