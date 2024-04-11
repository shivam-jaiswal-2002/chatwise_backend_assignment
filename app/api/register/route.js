import User from "../../../models/User";
import connect from "../../../utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const POST = async (request) => {
  const { email, password, name, dob } = await request.json();
  // Connect to the database
  await connect();
  
  // Check if the email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 5);
  
  // Create a new user object with the provided data
  const newUser = new User({
    name,
    dob,
    email,
    password: hashedPassword,
 
  });

  try {
    // Save the new user to the database
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err) {
    // Return an error response if saving fails
    return new NextResponse(err, {
      status: 500,
    });
  }
};
