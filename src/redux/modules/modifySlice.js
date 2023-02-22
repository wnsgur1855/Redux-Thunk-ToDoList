import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

//미들웨어
export const __modifyTodo = createAsyncThunk('modifyTodo/modifyTodo', async (payload, thunkApi) => {
  try {
    const response = await api.patch(`http://localhost:4001/todos/${payload.id}`, {
      title: payload.title,
    });
    console.log('payload모디파이슬라이스', payload);
    console.log('response페이로드 리스폰스', response);
    return thunkApi.fulfillWithValue(response.data); //이 메소드를 사용하여 액션 객체를 반환. 반환된 액션 객체는 __deleteTodo.fulfilled리듀서 함수에서 처리된다
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
    //console.log('error', error);
  }
});

const initialState = {
  todos: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const modifyTodoSlice = createSlice({
  name: 'deleteTodo',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(__modifyTodo.fulfilled, (state, action) => {
        console.log('액스트라 리듀스', action.payload);
        state.todos = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(__modifyTodo.pending, (state) => {
        console.log(state);
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(__modifyTodo.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export default modifyTodoSlice.reducer;
