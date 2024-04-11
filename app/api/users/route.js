import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next';

export const GET = async (req) => {
  try {
    const db = await connect();

    const users = await User.find({}); 
    console.log(users);
    return new Response(JSON.stringify({ users }), {
        headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
