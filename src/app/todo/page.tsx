"use client";

import TodoForm from "@/components/TodoFrom";
import TodoList from "@/components/TodoList";
// import { headers } from "next/headers";

export default function TodoPage() {
  // const headersList = await headers();
  // const userId = headersList.get("user");

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center px-4 py-10">
      {/* Wrapper to center form and list */}
      <div className="w-full max-w-2xl flex flex-col flex-grow items-center justify-start space-y-8 overflow-y-auto">
        {/* Add Todo Form */}
        <TodoForm />

        {/* Todo List Display */}
        <TodoList />
      </div>
    </div>
  );
}
