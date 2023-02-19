import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../modules/todoSlice';

// const rootReducer = combineReducers({});
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
