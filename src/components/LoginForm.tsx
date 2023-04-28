import Link from "next/link";
import React, { useState } from "react";

type LoginType = "password" | "code";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<LoginType>("password");

  const handleTabClick = (tab: LoginType) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200">
      <div className="rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Login Form</h1>
        <div className="mb-4 flex justify-between">
          <button
            className={`rounded-bl-lg rounded-tl-lg px-4 py-2 font-bold uppercase ${
              activeTab === "password"
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-gray-600"
            } focus:outline-none`}
            onClick={() => handleTabClick("password")}
          >
            Password
          </button>
          <button
            className={`rounded-br-lg rounded-tr-lg px-4 py-2 font-bold uppercase ${
              activeTab === "code"
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-gray-600"
            } focus:outline-none`}
            onClick={() => handleTabClick("code")}
          >
            Code
          </button>
        </div>
        {activeTab === "password" && (
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block font-bold text-gray-800"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-bold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
              >
                Login
              </button>
            </div>
          </form>
        )}
        {activeTab === "code" && (
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block font-bold text-gray-800"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="code"
                className="mb-2 block font-bold text-gray-800"
              >
                Code
              </label>
              <input
                type="password"
                id="code"
                name="code"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
