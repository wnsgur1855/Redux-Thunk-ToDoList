import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios/api';

export const __defetchTodo = createAsyncThunk(
  'defetchTodo/defetchTodo',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/todos/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  todo: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const defetchTodoSlice = createSlice({
  name: 'defetchTodo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__defetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todo = action.payload;
    });
  },
});

export default defetchTodoSlice.reducer;
