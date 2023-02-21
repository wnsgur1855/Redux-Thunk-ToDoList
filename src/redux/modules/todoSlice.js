//리덕스 툴킷을 사용하는 이유? = boilerplate(변화없이 반복되는 코드)를 최소화하고, 간결한 redux코드를 위해
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axios/api';

//이 파일에서 하는 것 redux tookit에서 createAsyncThunk와 createdSlice를 가져와 axios를 사용하여 api파일에서 가져온다

//()이건 무조건 호출
// export const  createAsyncThunk()

//try catch를 쓰는 이유 비동기 서버통신이 100%라는 보장이 없어서-->3가지 thunk를 정의할거다
// 조회 요청방식(todo목록 조회thunk)
export const __fetchTodo = createAsyncThunk('fetchTodo', async (payload, thunkAPI) => {
  //여기서 이름은 콘솔의 타입 이름으로뜬다
  //비동기 액선을 디스패치하고 디스패치 함수를 사용하여 다른 액션을 디스패치
  try {
    const { data } = await api.get('http://localhost:4001/todos'); //구조분해할당하는 이유?
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    thunkAPI.rejectWithValue();
  }
});

//추가 요청방식(todo 목록 추가)
export const __postTodo = createAsyncThunk('postTodos', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('http://localhost:4001/todos', payload);
    console.log(data);
    return thunkAPI.fulfillWithValue(data); // -->기존의 안 됐던 코드(새로고침) : return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    thunkAPI.rejectWithValue();
    //console.log('error', error);
  }
});
//삭제요청방식(todo목록 삭제--api-DELETE요청을 수행)
export const __deleteTodo = createAsyncThunk('deleteTodos', async (id, thunkApi) => {
  try {
    await api.delete(`http://localhost:4001/todos/${id}`);
    console.log(id);
    return thunkApi.fulfillWithValue(id); //이 메소드를 사용하여 액션 객체를 반환. 반환된 액션 객체는 __deleteTodo.fulfilled리듀서 함수에서 처리된다
  } catch (error) {
    thunkApi.rejectWithValue();
    //console.log('error', error);
  }
});

// export const __patchTodo = createAsyncThunk('patchTodos', async () => {
//   await api.patch(`/todos/{id}`);
//   return id;
// });

const initialState = {
  todos: [], //초기값대로 잘 젹용해주세요
  isLoading: false,
  isError: false,
  error: null,
};

const fetchtodoSlice = createSlice({
  //리덕스 툴킷에서 제공하는 createSlice함수를 사용하여 redux상태관리 --.fetchtodoSlice라는 slice를 정의함
  name: 'fetchTodo', //초기상태, 액션생성함수, 리듀서를 함수를 정의하고 + extraReducers로 비동기 작업을 처리함
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //스토어의 상태를 업데이투
    builder
      .addCase(__fetchTodo.fulfilled, (state, action) => {
        console.log(action.payload);
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

export const posttodoSlice = createSlice({
  name: 'fetchTodo',
  initialState: initialState,
  reducers: {}, //-->미들웨어에서 이미 처리가 됐으니 안 해줘도 된다?
  extraReducers: (builder) => {
    builder
      .addCase(__postTodo.fulfilled, (state, action) => {
        console.log(state);
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
//
export const deletetodoSlice = createSlice({
  name: 'fetchTodo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        console.log(action);
        state.todos = action.payload;
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

export const {} = posttodoSlice.actions;
export default fetchtodoSlice.reducer; //default했으니 아무 이름이나 상관 ㄴ
