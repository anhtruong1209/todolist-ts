import { createSlice } from "@reduxjs/toolkit"
import { TType } from "../../../models/auth"

const initState: TType = {
  todoList: [],
}

const todoListSlice = createSlice({
  name: "todoList",
  initialState: initState,
  reducers: {
    todoList: (state, action) => {
      state.todoList = action.payload
    },
    addTodo: (state, action) => {
      state.todoList.unshift(action.payload)
      localStorage.setItem("todolist", JSON.stringify(state.todoList))
    },
    deleteTodo: (state, action) => {
      localStorage.getItem("todolist")
      state.todoList = state.todoList.filter((todo: any) => todo.id !== action.payload)
      localStorage.setItem("todolist", JSON.stringify(state.todoList))
    },
  },
})
export const { todoList, addTodo, deleteTodo } = todoListSlice.actions
export default todoListSlice.reducer
