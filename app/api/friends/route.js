// api/friends.js
import User from '@/models/User';
import connect from '@/utils/db';

export const POST = async (req) => {
  const { email } = await req.json();
  try {
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const friends = await User.find({ email: { $in: user.follows } });
    return new Response(JSON.stringify({ friends }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response("Failed to fetch friends", { status: 500 });
  }
};
