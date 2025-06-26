"use client";

import TodoForm from "@/components/TodoFrom";
import TodoList from "@/components/TodoList";

export default function TodoPage() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center px-4 py-4 overflow-hidden">
      {/* Wrapper with max width */}
      <div className="w-full max-w-2xl flex flex-col flex-1 space-y-4 overflow-hidden">
        
        {/* Todo Form at Top */}
        <TodoForm />

        {/* Todo List Fills Remaining Space */}
        <div className="flex-1 overflow-y-auto">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
