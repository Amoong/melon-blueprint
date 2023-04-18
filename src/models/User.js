import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    maxLengh: 30,
    unique: true,
    index: true,
  },
  password: { type: String, required: true, trim: true, maxLengh: 30 },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
