"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    setLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post("/api/v1/users/signup", formData);

      alert(data.message);
      if (data) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        router.push("/signin");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Something went wrong ");
      }
    } finally {
      setLoading(false);
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
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-medium text-indigo-400 hover:underline focus:outline-none"
              >
                Sign In
              </a>
            </p>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}

          <div className="relative">
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
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
            disabled={loading}
          >
            {loading ? "Signing up" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
