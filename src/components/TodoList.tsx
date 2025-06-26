"use client";

import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "@/lib/features/todo/todoSlice";
import { RootState } from "@/lib/store";

interface Todo {
  id: string;
  title: string;
  content?: string;
  isComplete?: boolean;
  createdAt?: Date;
  dueDate?: string;
}

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await axios.get("/api/v1/todos/getAllTodos");
        dispatch(addTodos({ todos: response.data }));
      } catch (error) {
        console.log(error);
      }
    };

    getAllTodos();
  }, [dispatch]);

  return (
    <div
      className="mt-4 w-full max-h-3/4 overflow-y-auto space-y-3 scrollbar-hide"
    >
      {todos?.length === 0 ? (
        <p className="text-center text-gray-500">Loading .........</p>
      ) : (
        todos?.map((todo: Todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded-lg shadow space-y-1 relative border border-gray-200"
          >
            {/* Edit & Delete Buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button className="text-gray-500 hover:text-black">
                <Edit size={16} />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600">{todo.content}</p>
            {todo.dueDate && (
              <p className="text-sm text-gray-500 mt-1">
                <span className="inline-block mr-1">📅</span> Due: {todo.dueDate}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
