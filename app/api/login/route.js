// api/login.js

import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req, res) => {
  try {
    await connect();
    const user = await User.findOne({}); // Assuming there's only one user
    if (user) {
      return new NextResponse({
        name: user.name,
        dob: user.dob,
        _id: user._id,
        // Include other user data if needed
      }, { status: 200 });
    } else {
      return new NextResponse({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse({ error: "Internal server error" }, { status: 500 });
  }
};
