//리덕스 툴킷을 사용하는 이유? = boilerplate(변화없이 반복되는 코드)를 최소화하고, 간결한 redux코드를 위해
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

export const __fetchTodo = createAsyncThunk('fetchTodo/fetchTodo', async (payload, thunkAPI) => {
  try {
    const { data } = await api.get('http://localhost:4001/todos');
    //console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    thunkAPI.rejectWithValue();
  }
});

const initialState = {
  todos: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const fetchtodoSlice = createSlice({
  name: 'fetchTodo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(__fetchTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(__fetchTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export default fetchtodoSlice.reducer; //default했으니 아무 이름이나 상관 ㄴ
