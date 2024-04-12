"use client";
import React from "react";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="fixed w-full bg-black font-serif text-white flex justify-between items-center px-4 py-2">
      <Link href="/" className='text-2xl'>
        Chatwise
      </Link>

      {!session ? (
        <>
         <div className="flex space-x-2">
        <Link href="/login">
          <button className="px-3 py-2 rounded bg-blue-950 text-white hover:bg-transparent">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-3 py-2 rounded bg-blue-950 text-white hover:bg-transparent">
            Signup
          </button>
        </Link>
      </div>
        </>
       
      ):(
        <div className="flex justify-between items-center">
        <div className="flex-col">
          <Link href="/Post">
            <button className="px-3 py-2 mr-2 rounded bg-blue-950 text-white hover:bg-transparent">New Post</button>
          </Link>
          <Link href="/users">
            <button className="px-3 py-2 mr-2 rounded bg-blue-950 text-white hover:bg-transparent">Meet new Users</button>
          </Link>
          <Link href="/ViewFriends">
            <button className="px-3 py-2 mr-2 rounded bg-blue-950 text-white hover:bg-transparent">View Friends</button>
          </Link>
          <Link href="/FriendRequests">
            <button className="px-3 py-2 mr-2 rounded bg-blue-950 text-white hover:bg-transparent">Friend Requests</button>
          </Link>
          <button onClick={() => signOut()} className="px-3 py-2 rounded bg-blue-950 text-white hover:bg-transparent">Sign out</button>
        </div>
        <span className="ml-4">Welcome {session.user.name}</span>
      </div>
      )}
      
    </nav>
  );
}

export default Navbar;
