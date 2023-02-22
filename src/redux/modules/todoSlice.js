//리덕스 툴킷을 사용하는 이유? = boilerplate(변화없이 반복되는 코드)를 최소화하고, 간결한 redux코드를 위해
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axios/api';

//이 파일에서 하는 것 redux tookit에서 createAsyncThunk와 createdSlice를 가져와 axios를 사용하여 api파일에서 가져온다

//()이건 무조건 호출
// export const  createAsyncThunk()

//try catch를 쓰는 이유 비동기 서버통신이 100%라는 보장이 없어서-->3가지 thunk를 정의할거다
// 조회 요청방식(todo목록 조회thunk)
export const __fetchTodo = createAsyncThunk('fetchTodo/fetchTodo', async (payload, thunkAPI) => {
  //여기서 이름은 콘솔의 타입 이름으로뜬다
  //비동기 액선을 디스패치하고 디스패치 함수를 사용하여 다른 액션을 디스패치
  try {
    const { data } = await api.get('http://localhost:4001/todos'); //구조분해할당하는 이유?
    //console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    thunkAPI.rejectWithValue();
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
        //console.log('action.payload이 값이 get의 payload : ', action.payload);
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

//

//export const {} = posttodoSlice.actions;
export default fetchtodoSlice.reducer; //default했으니 아무 이름이나 상관 ㄴ
