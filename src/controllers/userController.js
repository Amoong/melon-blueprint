import User from "../models/User.js";

export const signup = async (req, res) => {
  const {
    body: { id, password },
  } = req;

  try {
    await User.create({ userId: id, password });
    return res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};
