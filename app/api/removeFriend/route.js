// api/removeFriend.js
import User from '@/models/User';
import connect from '@/utils/db';

export const PUT = async (req) => {
  const { userEmail, friendEmail } = await req.json();
  try {
    await connect();
    // Find the user who wants to remove a friend
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    // Find the friend to be removed
    const friend = await User.findOne({ email: friendEmail });
    if (!friend) {
      return new Response("Friend not found", { status: 404 });
    }
    // Remove the friend from the user's follows list
    user.follows = user.follows.filter(email => email !== friendEmail);
    // Remove the user from the friend's followers list
    friend.followers = friend.followers.filter(email => email !== userEmail);
    // Save the updated user and friend documents
    await user.save();
    await friend.save();
    return new Response("Friend removed successfully", { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response("Failed to remove friend", { status: 500 });
  }
};
