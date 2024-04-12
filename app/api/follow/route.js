// routes/follow.js
import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const PUT = async (req) => {
  try {
    const db = await connect();

    const { userEmailToFollow, MyEmail } = await req.json();
    console.log("follow route",userEmailToFollow, MyEmail);
    // Find the logged-in user
    const loggedInUser = await User.findOne({ email: MyEmail });
    // Find the user to follow
    const userToFollow = await User.findOne({ email: userEmailToFollow });
    if (!loggedInUser || !userToFollow) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Add the user's email to the follows list of the logged-in user
    loggedInUser.follows.push(userToFollow.email);
    await loggedInUser.save();
    return NextResponse.json({ message: 'User followed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
