"use client";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
interface LOGINData {
  email: string;
  password: string;
}
const LoginForm = () => {
  const router = useRouter();
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  async function create(data: LOGINData) {
    try {
      console.log("this is data", data);
      await fetch(`/api/users/login`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then(async (response) => {
          let res = await response.json();
          console.log(response, "first test res", res);
          let getUser = res.user.username;
          console.log(getUser);

          if (!response.ok) {
            if (response.status == 409) {
              throw new Error("Invalid user");
            }
          }
          router.push(`/Addnote?name=${getUser}`);
        })
        .catch((error) => {
          console.log("error in login page ", error);
          setLoginData({ email: "", password: "" });
          router.push("/login");
        });
    } catch (error) {
      console.log("error in login try catch", error);
      router.push("/signup");
    }
  }

  const handleSubmit = async (data: LOGINData) => {
    try {
      create(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 py-12 mb-4 "
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(logindata);
        }}
      >
        <div className="mb-4 mt-0">
          <h1 className="text-center font-semibold text-blue-500">
            Login to your Account
          </h1>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className=" mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder=" Type here Email"
            value={logindata.email}
            onChange={(e) =>
              setLoginData({ ...logindata, email: e.target.value })
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
            className=" mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder=" Type here Password"
            value={logindata.password}
            onChange={(e) =>
              setLoginData({ ...logindata, password: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-center mt-3 ">
          <button
            className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold font-2xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
