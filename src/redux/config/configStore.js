import { configureStore } from '@reduxjs/toolkit';
import fetchtodoSlice from '../modules/todoSlice';
import posttodoSlice from '../modules/posttodo';
import deletetodoSlice from '../modules/deletetodo';
import defetchTodoSlice from '../modules/detailGet';
import modifyTodoSlice from '../modules/modifySlice';
// const rootReducer = combineReducers({});
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    fetchtodoSlice,
    posttodoSlice,
    deletetodoSlice,
    defetchTodoSlice,
    modifyTodoSlice,
  },
});

export default store;
