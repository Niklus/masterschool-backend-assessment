import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add a name"],
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
