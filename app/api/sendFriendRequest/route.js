// /api/sendFriendRequest.js

import connect from "@/utils/db";
import User from "@/models/User";

export const POST = async (req) => {
  await connect();

  const { senderEmail, recipientEmail } = await req.json();

  try {
    // Update sender's document
    await User.updateOne(
      { email: senderEmail },
      { $addToSet: { FriendRequestSent: recipientEmail } }
    );

    // Update recipient's document
    await User.updateOne(
      { email: recipientEmail },
      { $addToSet: { FriendRequestReceived: senderEmail } }
    );

    return new Response("Friend request sent", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to send friend request", { status: 500 });
  }
};
