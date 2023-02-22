import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

const initialState = {
  todo: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

export const __defetchTodo = createAsyncThunk(
  'defetchTodo/defetchTodo',
  async (payload, thunkAPI) => {
    try {
      //payload에 해당하는 todo찾기
      const response = await api.get(`http://localhost:4001/todos/${payload}`);
      //console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const defetchTodoSlice = createSlice({
  name: 'defetchTodo',
  initialState,
  reducers: {},
  //미들웨어
  extraReducers: (builder) => {
    builder.addCase(__defetchTodo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.todo = action.payload;
    });
  },
});

export default defetchTodoSlice.reducer;
