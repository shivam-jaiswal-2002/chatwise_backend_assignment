// api/PostFetch.js
import Post from "@/models/Post";
import connect from "@/utils/db";

export const revalidate = 0;

export const GET = async () => {
  try {
    await connect();

    const posts = await Post.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ posts }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
