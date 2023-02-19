import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    createAdd: (state, action) => {
      state.todos.push(action.payload);
    },
    // removeTodo: (state, action) => {
    //   return state.filter((item) => {
    //     item.id !== action.payload;
    //   });
    // },
    // switchTodo: (state, action) => {
    //   return state.map((item) => {
    //     if (item.id == action.payload) {
    //       return;
    //     }
    //   });
    // },
  },
});

export default todoSlice.reducer; //default했으니 아무 이름이나 상관 ㄴ
export const { createAdd, removeTodo } = todoSlice.actions;
