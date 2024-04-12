// api/friendRequests.js

import User from "@/models/User";
import connect from "@/utils/db";

export const POST = async (req) => {
  try {
    await connect();

    const { userEmail } = await req.json();

    if (!userEmail) {
      return new Response("User email is required", { status: 400 });
    }

    // Fetch user's friend requests
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const friendRequests = user.FriendRequestReceived;

    return new Response(JSON.stringify({ friendRequests }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch friend requests", { status: 500 });
  }
};
