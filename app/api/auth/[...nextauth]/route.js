import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { Jwt } from "jsonwebtoken";

export const revalidate = 0;

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              // Return the complete user object from the database
              return {
                ...user.toObject(),
              };
            }
          }
        } catch (err) {
          throw new Error(err);
        }
        // Return null if credentials are invalid
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // Add more providers here
  ],
  callbacks: {
    // Handle post-sign-in logic
    async signIn({ user, account }) {
      // If signing in using credentials provider
      if (account?.provider === "credentials") {
        return true;
      }
      // If signing in using another provider like GitHub
      // Add logic here if needed
      return true;
    },
    // Serialize user data to be included in the JWT token
    jwt: async ({ token, user }) => {
      let serializeToken = token;
      if (user) {
        serializeToken = {
          ...token,
          ...user,
          name: user.name, // Include name
          dob: user.dob, // Include dob
          _id: user._id,
        };
      }
      return serializeToken;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
