// pages/index.js
"use client";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", email: "", content: "" });
  const [selectedPostId, setSelectedPostId] = useState(null); // State to track the selected post
  const { data: session } = useSession();
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const res = await fetch("/api/fetchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }), // Send the user's email
        });
  
        if (res.ok) {
          const data = await res.json();
          const follows = data.follows || []; // Ensure follows is an array
          setFollows(follows);
        } else {
          console.error("Failed to fetch follows");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/PostFetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ follows }), // Send the list of followed users' emails
        });
  
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    if (session) {
      fetchFollows();
      fetchPosts();
    }
  }, [session]);
  

  const handleCommentSubmit = async (postId) => {
    try {
      const res = await fetch(`/api/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id : postId, comment: newComment }),
      });
      if (res.ok) {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        setNewComment({ name: "", email: "", content: "" });
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg hover:shadow-blue-800 transition duration-300">
            <h2 className="text-xl font-semibold mb-4">{post._id}</h2>
            <h2 className="text-xl font-semibold mb-4">{post.name}</h2>
            <h2 className="text-gray-600 text-sm mb-2">{post.email}</h2>
            <p className="text-gray-700">{post.content}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <ul className="divide-y divide-gray-300">
                {post.comments.map((comment, index) => (
                  <li key={index} className="py-2">
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-gray-500 text-sm mt-1">- {comment.name}</p>
                  </li>
                ))}
              </ul>
              {selectedPostId === post._id ? (
                <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post._id); }}>
                  <input
                    type="text"
                    className="w-full rounded border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    placeholder="Your Name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    className="w-full mt-2 rounded border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    placeholder="Your Email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                    required
                  />
                  <textarea
                    className="w-full mt-2 rounded border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    rows="3"
                    placeholder="Your Comment"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-2 inline-block bg-primary text-black py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
                  >
                    Submit Comment
                  </button>
                </form>
              ) : (
                <button
                  className="mt-2 inline-block bg-primary text-black py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
                  onClick={() => setSelectedPostId(post._id)}
                >
                  Comment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
