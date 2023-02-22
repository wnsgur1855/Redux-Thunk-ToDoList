//리덕스 툴킷을 사용하는 이유? = boilerplate(변화없이 반복되는 코드)를 최소화하고, 간결한 redux코드를 위해
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

//get요청방식
export const __fetchTodo = createAsyncThunk('fetchTodo/fetchTodo', async (payload, thunkAPI) => {
  try {
    const { data } = await api.get('/todos');
    //console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    thunkAPI.rejectWithValue();
  }
});
//추가 요청방식(todo 목록 추가)
export const __postTodo = createAsyncThunk('posttodo/postTodos', async (payload, thunkAPI) => {
  const response = await api.post('/todos', payload);
  console.log(response);
  return thunkAPI.fulfillWithValue(response.data);
});
//삭제요청방식(todo목록 삭제--api-DELETE요청을 수행)
export const __deleteTodo = createAsyncThunk('deleteTodo/deleteTodos', async (id, thunkApi) => {
  try {
    await api.delete(`/todos/${id}`);
    return thunkApi.fulfillWithValue(id);
  } catch (error) {
    thunkApi.rejectWithValue();
  }
});
//수정 요청방식(todo수정)
export const __modifyTodo = createAsyncThunk('modifyTodo/modifyTodo', async (payload, thunkApi) => {
  try {
    const response = await api.patch(`/todos/${payload.id}`, {
      title: payload.title,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const initialState = {
  todos: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const fetchtodoSlice = createSlice({
  name: 'fetchTodo', //이럴경우 fetchTodo이름이 하나로되야하는데,,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder //get
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
      }) //patch
      .addCase(__modifyTodo.fulfilled, (state, action) => {
        console.log('state.todos', state.todos); //객체
        const test = state.todos.findIndex((item) => item.id === action.payload.id);
        state.todos[test] = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(__modifyTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(__modifyTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      }) //post
      .addCase(__postTodo.fulfilled, (state, action) => {
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
      }) //delete
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        console.log(initialState);
        console.log('state.todos', state.todos);
        state.todos = state.todos.filter((item) => {
          return item.id !== action.payload; //돌려주겠다
        });

        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(__deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export default fetchtodoSlice.reducer; //default했으니 아무 이름이나 상관 ㄴ
