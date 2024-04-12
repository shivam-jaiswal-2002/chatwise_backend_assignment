// /api/acceptFriendRequest.js

import connect from "@/utils/db";
import User from "@/models/User";

export const PUT = async (req) => {
  await connect();

  const { senderEmail, recipientEmail } = await req.json();
 console.log("acc req");
  try {
    // Update sender's document
    await User.updateOne(
      { email: senderEmail },
      {
        $pull: { FriendRequestSent: recipientEmail },
        $addToSet: { follows: recipientEmail },
      }
    );

    // Update recipient's document
    await User.updateOne(
      { email: recipientEmail },
      {
        $pull: { FriendRequestReceived: senderEmail },
        $addToSet: { follows: senderEmail },
      }
    );

    return new Response("Friend request accepted", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to accept friend request", { status: 500 });
  }
};
