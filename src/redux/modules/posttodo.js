import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

//추가 요청방식(todo 목록 추가)
export const __postTodo = createAsyncThunk('posttodo/postTodos', async (payload, thunkAPI) => {
  const response = await api.post('http://localhost:4001/todos', payload);
  console.log(response);
  return thunkAPI.fulfillWithValue(response.data); // -->기존의 안 됐던 코드(새로고침) : return thunkAPI.fulfillWithValue(response.data);

  //console.log('error', error);
});

const initialState = {
  todos: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const posttodoSlice = createSlice({
  name: 'posttodo',
  initialState: initialState,
  reducers: {}, //-->미들웨어에서 이미 처리가 됐으니 안 해줘도 된다?
  extraReducers: (builder) => {
    builder
      .addCase(__postTodo.fulfilled, (state, action) => {
        //console.log('action.payload이 값이 post의 payload : ', action.payload);
        state.todos.push(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(__postTodo.pending, (state) => {
        console.log(state);
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(__postTodo.rejected, (state, action) => {
        console.log(state);
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export default posttodoSlice.reducer;
