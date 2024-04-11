import User from "@/models/User";
import connect from "@/utils/db";

export const POST = async (req) => {
  try {
    await connect();

    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify({ follows: user.follows }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
