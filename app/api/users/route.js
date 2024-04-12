// api/users.js

import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { userEmail } = await req.json();

    const db = await connect();

    const currentUser = await User.findOne({ email: userEmail });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Get the list of users whom the current user is following
    const followedUsers = currentUser.follows || [];

    // Find users whom the current user is not following
    const users = await User.find({ email: { $nin: followedUsers.concat([userEmail]) } }); 

    return new Response(JSON.stringify({ users }), {
        headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
