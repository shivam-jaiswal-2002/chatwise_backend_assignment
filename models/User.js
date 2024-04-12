import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    FriendRequestSent:[
      {type: String,}
    ],
    FriendRequestReceived:[
      {type: String,}
    ],
    follows: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);