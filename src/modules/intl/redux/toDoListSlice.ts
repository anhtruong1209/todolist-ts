import { createSlice } from '@reduxjs/toolkit';
import { TType } from '../../../models/auth';

const initState: TType = {
  todoList: [],
  filterStatus: 0,
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: initState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload || [];
    },

    addTodo: (state, action) => {
      state.todoList.unshift(action.payload);
      localStorage.setItem('todolist', JSON.stringify(state.todoList));
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter((todo: any) => todo.id !== action.payload);
      localStorage.setItem('todolist', JSON.stringify(state.todoList));
    },
    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            id: action.payload.id,
            plan: action.payload.plan,
            date: action.payload.date,
          };
        } else {
          return item;
        }
      });
      localStorage.setItem('todolist', JSON.stringify(state.todoList));
    },
    checkedTodoList: (state, action) => {
      state.todoList = state.todoList?.map?.((item: any) => ({
        ...item,
        status: item?.id === action.payload.id ? action.payload.newStatus : item?.status,
      }));
      localStorage.setItem('todolist', JSON.stringify(state.todoList));
    },
  },
});
export const { setTodoList, addTodo, deleteTodo, updateTodo, checkedTodoList } = todoListSlice.actions;
export default todoListSlice.reducer;
