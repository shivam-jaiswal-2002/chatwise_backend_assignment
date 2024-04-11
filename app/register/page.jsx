"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[2].value; // email input is at index 2
    const password = e.target[3].value;
    const name = e.target[0].value; // name input is at index 0
    const dob = e.target[1].value; // dob input is at index 1

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          dob,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [dob, setDob] = useState("");
  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const [email, setEmail] = useState(""); // Add state variable for email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [pwd, setPwd] = useState("");
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  return (
    <section className="">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="md:w-8/12 lg:ms-6 lg:w-5/12 border border-black p-6 ">
            <div className="bg-white p-8 rounded shadow-md">
              <h1 className="text-4xl text-center font-semibold mb-8 text-black">
                Register
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                  <label
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                      name ? "text-xs text-neutral-500 -translate-y-1/2" : ""
                    }`}
                  >
                    Name
                  </label>
                </div>
                <div className="relative mb-6">
                  <input
                    type="date"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={handleDobChange}
                    required
                  />
                </div>
                <div className="relative mb-6">
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange} // Add onChange handler for email
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
                  Register
                </button>
                <p className="text-red-600 text-[16px] mb-4">
                  {error && error}
                </p>
              </form>
              <div className="text-center text-gray-500 mt-4">- OR -</div>
              <Link
                className="block text-center text-blue-500 hover:underline mt-2"
                href="/login"
              >
                Login with an existing account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
