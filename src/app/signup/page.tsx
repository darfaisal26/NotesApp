"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
interface FormData {
  username: string;
  email: string;
  password: string;
}
const SignupForm = () => {
  const inputelm: any = useRef(null);
  const router = useRouter();
  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttondisabled, setButtonDisabled] = useState(false);

  async function create(data: FormData) {
    try {
      console.log("this is data", data);
      await fetch("/api/users/signup", {
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("email already exists");
          }
        })
        .then(() => {
          setUserData({ username: "", email: "", password: "" });
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
          router.push("/signup");
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    if (
      data.username.trim() === "" ||
      data.email.trim() === "" ||
      data.password.trim() === ""
    ) {
      console.log("Please fill in all fields.");
      return;
    }
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      userdata.username.length > 0 &&
      userdata.email.length > 0 &&
      userdata.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });
  useEffect(() => {
    inputelm.current.focus();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md shadow-blue-700 rounded px-10 py-6 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(userdata);
        }}
      >
        <div className="mb-4">
          <h1 className="text-center text-blue-500 font-semibold font-2xl">
            Create Account
          </h1>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={userdata.username}
            ref={inputelm}
            onChange={(e) =>
              setUserData({ ...userdata, username: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={userdata.email}
            ref={inputelm}
            onChange={(e) =>
              setUserData({ ...userdata, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={userdata.password}
            ref={inputelm}
            onChange={(e) =>
              setUserData({ ...userdata, password: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-2xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {/* {buttondisabled ? "No Signup" : " Signup"} */}
            Signup
          </button>
        </div>
        <div className="">
          <p className="flex items-center justify-center text-lg mt-4">
            Already user
            <Link href="/login" className="mx-2 text-blue-500 font-semibold">
              Login
            </Link>
            here
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
