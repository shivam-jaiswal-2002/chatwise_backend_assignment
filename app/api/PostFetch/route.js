import Post from "@/models/Post";
import connect from "@/utils/db";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  try {
    await connect();

    const { follows } = await req.json();
    console.log(follows);
    const posts = await Post.find({ email: { $in: follows } }).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ posts }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
