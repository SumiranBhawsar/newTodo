"use client";

import { addSingleTodo } from "@/lib/features/todo/todoSlice";
import axios from "axios";
import { Calendar, Flag, Bell, MoreHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export interface Todo {
  id?: string;
  title: string;
  content: string;
  dueDate?: string;
}

export default function TodoForm() {
  const [formData, setFormData] = useState<Todo>({
    title: "",
    content: "",
    dueDate: "",
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/todos/create", formData);
      alert(response.data.message);

      dispatch(addSingleTodo(response.data.data));

      setFormData({
        title: "",
        content: "",
        dueDate: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-xl border rounded-lg p-4 bg-white space-y-2 shadow">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Task title..."
              value={formData.title}
              onChange={handleChange}
              id="title"
              required
              className="w-full text-lg font-medium text-gray-800 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.content}
              onChange={handleChange}
              id="content"
              className="w-full text-sm text-gray-500 mt-1 focus:outline-none"
            />
          </div>
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              className="bi bi-soundwave"
              viewBox="0 0 16 16"
            >
              <path d="M2 8a.5.5 0 0 1 .5.5v-.998a.5.5 0 0 1-.5.5zm2-3a.5.5 0 0 1 .5.5v4.998a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5zm2-2a.5.5 0 0 1 .5.5v8.998a.5.5 0 0 1-1 0V3.5a.5.5 0 0 1 .5-.5zm2 4a.5.5 0 0 1 .5.5v.998a.5.5 0 0 1-1 0V7.5a.5.5 0 0 1 .5-.5zm2-3a.5.5 0 0 1 .5.5v6.998a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5zm2 2a.5.5 0 0 1 .5.5v2.998a.5.5 0 0 1-1 0V7.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center space-x-2 text-sm mt-2">
          <label className="flex items-center space-x-1 px-2 py-1 border rounded text-green-600 hover:bg-green-50 cursor-pointer">
            <Calendar size={14} />
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              className="outline-none bg-transparent cursor-pointer"
            />
          </label>
          <button
            type="button"
            className="flex items-center space-x-1 px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
          >
            <Flag size={14} />
            <span>Priority</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-1 px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
          >
            <Bell size={14} />
            <span>Reminders</span>
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>

        <div className="flex justify-between items-center pt-2 border-t mt-2">
          <div className="text-sm text-gray-600">Inbox ▼</div>
          <div className="space-x-2">
            <button
              type="button"
              className="px-3 py-1 text-sm text-gray-600 hover:text-black"
              onClick={() =>
                setFormData({ title: "", content: "", dueDate: "" })
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Add task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
