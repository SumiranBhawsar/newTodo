import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  title: string;
  content: string;
  isComplete?: boolean;
  createdAt?: Date;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
    },
    addSingleTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
  },
});

export const { addTodos, addSingleTodo } = todoSlice.actions;
export default todoSlice.reducer;
