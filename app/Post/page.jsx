// pages/post.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const PostPage = () => {
    const { data: session } = useSession();
  const [postContent, setPostContent] = useState("");
  const router = useRouter();
    console.log(session.user.name);
  const handlePostSubmit = async () => {
    try {
      const res = await fetch("/api/Post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:session.user.email, // Replace with logged-in user's email
          name: session.user.name,
          content: postContent,
        }),
      });
      if (res.status === 200) {
        // Redirect to some confirmation page or home page
        router.push("/");
      } else {
        // Handle error if needed
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Write your thoughts here..."
      />
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

export default PostPage;
