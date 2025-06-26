"use client";

// import api from "@/lib/axios";
import axios from "axios";
// import { NextResponse } from "next/server";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface UserSignin {
  email: string;
  password: string;
}

/* eslint-disable react/no-unescaped-entities */
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-indigo-400 hover:underline focus:outline-none"
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
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white"
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
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          <button
            className="w-full p-3 font-semibold text-white bg-indigo-600 rounded-lg"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
