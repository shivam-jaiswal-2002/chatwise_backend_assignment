// /api/isfollow.js
import User from "@/models/User";
import connect from "@/utils/db";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  try {
    await connect();
    const session = await getSession({ req });

    if (!session) {
      return new Response("User not authenticated", { status: 401 });
    }

    const { userEmailToCheck } = await req.json();
    const currentUserEmail = session.user.email;
    
    console.log("is follow route",currentUserEmail, userEmailToCheck);
    const currentUser = await User.findOne({ email: currentUserEmail });
    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }

    const isFollowing = currentUser.follows.includes(userEmailToCheck);

    return new Response(JSON.stringify({ isFollowing }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to check follow status", { status: 500 });
  }
};
