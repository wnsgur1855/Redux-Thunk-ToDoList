import { configureStore } from '@reduxjs/toolkit';
import fetchtodoSlice from '../modules/todoSlice';
import defetchTodoSlice from '../modules/DetailSlice';

const store = configureStore({
  reducer: {
    fetchtodoSlice,
    defetchTodoSlice,
  },
});

export default store;
