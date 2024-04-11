// api/post.js
import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const POST = async (request) => {
  const { email,name, content} = await request.json();
    console.log(email,name, content);
  try {
    await connect();

    const newPost = new Post({
      email,
      name,
      content,
    });

    await newPost.save();

    return new NextResponse("Post created successfully", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Failed to create post", { status: 500 });
  }
};
