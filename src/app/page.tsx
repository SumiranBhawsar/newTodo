"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md text-center space-y-6 bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700/50">
        <h1 className="text-4xl font-bold text-white">Welcome to Your Todo List</h1>
        <p className="text-gray-400 text-sm">
          Stay organized, stay productive. Create your tasks and track your progress.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/signup")}
            className="w-full p-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
          >
            Create Account
          </button>

          <button
            onClick={() => router.push("/signin")}
            className="w-full p-3 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
