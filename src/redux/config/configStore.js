import { configureStore } from '@reduxjs/toolkit';
import fetchtodoSlice from '../modules/todoSlice';
import { posttodoSlice } from '../modules/todoSlice';
import { deletetodoSlice } from '../modules/todoSlice';
// const rootReducer = combineReducers({});
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    fetchtodoSlice,
    posttodoSlice,
    deletetodoSlice,
  },
});

export default store;
