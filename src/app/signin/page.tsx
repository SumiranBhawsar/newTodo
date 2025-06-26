/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface UserSignin {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [formData, setFormData] = useState<UserSignin>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/users/signin", formData);

      alert(data.message);

      if (data) {
        setFormData({
          email: "",
          password: "",
        });
        router.push("/todo");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 bg-white rounded-2xl shadow-2xl border border-gray-300"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-indigo-600 hover:underline focus:outline-none"
              >
                Sign Up
              </a>
            </p>
          </div>

          <div className="relative">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full p-3 pl-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-indigo-500"
            />
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full p-3 pl-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-indigo-500"
            />
          </div>

          <button
            className="w-full p-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
