import Post from "@/models/Post";
import connect from "@/utils/db";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  try {
    await connect();

    const { follows } = await req.json();
    console.log(follows);

    // Find posts created by followed users or posts with comments made by followed users
    const posts = await Post.aggregate([
      {
        $match: {
          $or: [
            { email: { $in: follows } }, // Posts made by followed users
            { "comments.email": { $in: follows } }, // Posts with comments made by followed users
          ],
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return new Response(JSON.stringify({ posts }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
