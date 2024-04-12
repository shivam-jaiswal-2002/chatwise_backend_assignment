// /api/rejectFriendRequest.js

import connect from "@/utils/db";
import User from "@/models/User";

export const PUT = async (req) => {
  await connect();

  const { senderEmail, recipientEmail } = await req.json();

  try {
    // Update recipient's document
    await User.updateOne(
      { email: recipientEmail },
      { $pull: { FriendRequestReceived: senderEmail } }
    );

    return new Response("Friend request rejected", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to reject friend request", { status: 500 });
  }
};
