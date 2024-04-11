// pages/Users.js
"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const responseData = await res.json();
        console.log(responseData.users);
        setUsers(responseData.users);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFollowUser = async (userEmail) => {
    try {
      const res = await fetch(`/api/follow`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmailToFollow: userEmail, MyEmail: session.user.email }),
      });
      if (res.ok) {
        // Refresh users after successful follow
        const updatedUsers = users.map((user) => {
          if (user.email === userEmail) {
            return { ...user, isFollowed: true };
          }
          return user;
        });
        setUsers(updatedUsers);
      } else {
        console.error('Failed to follow user');
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
            {user.isFollowed ? (
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded inline-block cursor-not-allowed" disabled>
                Followed
              </button>
            ) : (
              <button
                className="bg-primary text-black py-2 px-4 rounded inline-block hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
                onClick={() => handleFollowUser(user.email)}
              >
                Follow User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
