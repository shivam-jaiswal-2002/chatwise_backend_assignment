// pages/Users.js
"use client";
// Users.js

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SendFriendRequestButton from './SendFriendRequestButton/page';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();

// Inside your component where you fetch users
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: session.user.email }), // Assuming you have the session
      });
      const responseData = await res.json();
      setUsers(responseData.users);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchUsers();
}, []);


  const handleSendFriendRequest = async (recipientEmail) => {
    try {
      const res = await fetch('/api/sendFriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail: session.user.email, recipientEmail }),
      });
      if (res.ok) {
        // Refresh users after successful request
        const updatedUsers = users.map((user) => {
          if (user.email === recipientEmail) {
            return { ...user, isFollowed: true }; // Update UI if needed
          }
          return user;
        });
        setUsers(updatedUsers);
      } else {
        console.error('Failed to send friend request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.email} className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
            <h2 className="text-gray-600 text-sm mb-2">{user.email}</h2>
            <SendFriendRequestButton recipientEmail={user.email} onSendRequest={handleSendFriendRequest} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
