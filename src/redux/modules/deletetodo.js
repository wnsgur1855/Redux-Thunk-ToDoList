import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

//삭제요청방식(todo목록 삭제--api-DELETE요청을 수행)
export const __deleteTodo = createAsyncThunk('deleteTodo/deleteTodos', async (id, thunkApi) => {
  try {
    await api.delete(`http://localhost:4001/todos/${id}`);
    console.log(id);
    return thunkApi.fulfillWithValue(id); //이 메소드를 사용하여 액션 객체를 반환. 반환된 액션 객체는 __deleteTodo.fulfilled리듀서 함수에서 처리된다
  } catch (error) {
    thunkApi.rejectWithValue();
    //console.log('error', error);
  }
});

const initialState = {
  todos: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const deletetodoSlice = createSlice({
  name: 'deleteTodo',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        console.log('action.payload 이 부분은 delete.payload입니다 :', action.payload);
        state.todos = state.todos.filter((item) => {
          return item.id !== action.payload; //돌려주겠다
        });
        console.log('state.todos', state.todos);
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(__deleteTodo.pending, (state) => {
        console.log(state);
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        console.log(state);
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export default deletetodoSlice.reducer;
