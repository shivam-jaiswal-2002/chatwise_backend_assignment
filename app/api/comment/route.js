// pages/api/comment.js

import connect from "@/utils/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
    try {
        const db = await connect();
      const { Id, comment } = await req.json();
      console.log(Id, comment);
      const post = await Post.findById(Id);
      if (!post) {
        return new NextResponse({ error: "Post not found" } ,{ status: 404 });
      }
      post.comments.push(comment);
      await post.save();
      return new NextResponse({ message: "Comment added successfully" },  { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new    NextResponse.error({ error: "Internal server error" },  { status: 500 });
    }

};
