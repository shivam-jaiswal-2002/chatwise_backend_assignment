"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const [userData, setUserData] = useState(null); // To store user data fetched from API
  const [email, setEmail] = useState(""); // Initialize email state
  const [pwd, setPwd] = useState(""); // Initialize password state

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/login");
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when component mounts
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = email;
    const password = pwd;

    if (!isValidEmail(enteredEmail)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }
    console.log(userData?._id);
    console.log(userData?.name);
    // Include user data along with email and password when calling signIn
    const res = await signIn("credentials", {
      redirect: false,
      email: enteredEmail, // Use entered email
      password,
      name: userData?.name, // Include name from user data
      dob: userData?.dob, // Include dob from user data
      _id: userData?._id, // Include
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
      location.reload();
    }
  };

  return (
    <section className="">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:ms-6 lg:w-5/12 border border-black p-6">
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <label
                  className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    email ? "text-xs text-neutral-500 -translate-y-1/2" : ""
                  }`}
                >
                  Email address
                </label>
              </div>
              <div className="relative mb-6">
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                  placeholder="Password"
                  value={pwd}
                  onChange={handlePwdChange}
                  required
                />
                <label
                  className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    pwd ? "text-xs text-neutral-500 -translate-y-1/2" : ""
                  }`}
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
              >
                Sign in
              </button>
              <p className="text-red-600 text-[16px] mb-4">
                {error && error}
              </p>
            </form>
            
            <div className="text-center text-gray-500 mt-4">- OR -</div>
            <Link
              className="block text-center text-blue-500 hover:underline mt-2"
              href="/register"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
