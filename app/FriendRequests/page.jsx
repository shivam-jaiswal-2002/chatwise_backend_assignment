// FriendRequests.js
"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const res = await fetch('/api/friendRequests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: session.user.email }), // Assuming you have the session
        });
        const responseData = await res.json();
        setFriendRequests(responseData.friendRequests);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchFriendRequests();
  }, []);


  const handleAcceptRequest = async (senderEmail) => {
    try {
      const res = await fetch('/api/acceptFriendRequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail, recipientEmail: session.user.email }),
      });
      if (res.ok) {
        // Remove friend request from UI
        setFriendRequests(friendRequests.filter(request => request !== senderEmail));
        console.log('Friend request accepted successfully');
      } else {
        console.error('Failed to accept friend request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRejectRequest = async (senderEmail) => {
    try {
      const res = await fetch('/api/rejectFriendRequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail, recipientEmail: session.user.email }),
      });
      if (res.ok) {
        // Remove friend request from UI
        setFriendRequests(friendRequests.filter(request => request !== senderEmail));
        console.log('Friend request rejected successfully');
      } else {
        console.error('Failed to reject friend request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Friend Requests</h1>
      <div className="grid grid-cols-1 gap-8">
        {friendRequests.map((requestEmail) => (
          <div key={requestEmail} className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-4">{requestEmail}</h2>
            <div>
              <button
                className="bg-primary text-black px-4 py-2 rounded mr-4"
                onClick={() => handleAcceptRequest(requestEmail)}
              >
                Accept
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => handleRejectRequest(requestEmail)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
