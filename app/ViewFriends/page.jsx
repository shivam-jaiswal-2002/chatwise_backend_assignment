
"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const ViewFriends = () => {
  const { data: session } = useSession();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch('/api/friends', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        if (res.ok) {
          const { friends } = await res.json();
          setFriends(friends);
        } else {
          console.error('Failed to fetch friends');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (session) {
      fetchFriends();
    }
  }, [session]);

  const handleRemoveFriend = async (friendEmail) => {
    try {
      const res = await fetch(`/api/removeFriend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: session.user.email, friendEmail }),
      });
      if (res.ok) {
        const updatedFriends = friends.filter((friend) => friend.email !== friendEmail);
        setFriends(updatedFriends);
      } else {
        console.error('Failed to remove friend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">View Friends</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {friends.map((friend) => (
          <div key={friend.email} className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-4">{friend.name}</h2>
            <h2 className="text-gray-600 text-sm mb-2">{friend.email}</h2>
            <button
              className="mt-2 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700"
              onClick={() => handleRemoveFriend(friend.email)}
            >
              Remove Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFriends;
