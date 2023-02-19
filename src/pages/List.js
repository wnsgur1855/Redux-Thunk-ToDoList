import React from 'react';
import styled from 'styled-components';
import { StBtn } from './Home';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../axios/api';

const StLargeBox = styled.div`
  width: 80%;
  height: 500px;

  margin-left: 30px;
  border-radius: 30px;
  border: 3px black solid;
`;
//버튼 컴포넌트 하나론 힘들 것 같아요!
const StMapInputBox = styled.button`
  width: 70%;
  height: 40px;
  display: flex !important; //important가 무슨 의미냐
  background-color: yellow;
  justify-content: center; //글자 가운데(가로)
  align-items: center; //글자 가운데(세로)
  margin: 20px 20px 20px 20px; //시계반대방향
`;

const StMapLargeInputBox = styled.div`
  width: 85%;
  height: 50px;
  display: flex !important;
  background-color: red;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 20px 20px; ;
`;

function List() {
  const [todos, setTodos] = useState(null);
  //   const todos = useSelector((state) => {
  //     return state.todo.todos;
  //   });
  //   console.log(todos);
  //get요청방식(instance적용)-------------------------------------------------------------------------------------
  const fetchTodos = async () => {
    //구조분해할당?
    //axios는 promise를 기초로 http통신을 하는 라이브러리
    //get방식으로 axios로 db데이터 가져오기
    const { data } = await api.get('/todos');
    console.log('data', data);
    setTodos(data);
  };
  //delete요청방식(instance적용)-----------------------------------------------------------------------------------------
  const deleteButtonHandler = async (id) => {
    //-->인자 이름 상관 ㄴ
    const data = await api.delete(`/todos/${id}`); //db에서 데이터 지우기만함 stae가 변경 ㄴ
    console.log('data---------', data); //const data 한 이유는 그냥 찍어보려고 임의로 변수 만든것
    setTodos(
      todos.filter((item) => {
        return item.id !== id; //오탈자부분
      })
    ); //-->새로운 배열을 리턴하니 불변성 상관 ㄴ
  };
  //useEffect로 db로부터 값 가져오기-------------------------------------------------------------------------------------
  useEffect(() => {
    fetchTodos();
  }, []);
  //console.log(fetchTodos)
  //-------------------------------------------------------------------------------------
  //useNavigate
  const navigate = useNavigate();
  //   if (!todos) return <div>"loading"</div>;
  return (
    <>
      <div style={{ marginLeft: '30px' }}>나의 할 일</div>
      <StLargeBox>
        <div>
          {todos?.map((item) => {
            console.log(item);
            return (
              <StMapLargeInputBox key={item.id}>
                <StMapInputBox
                  onClick={() => {
                    navigate(`/${item.id}`);
                    alert('딸깍!');
                  }}
                >
                  <p>
                    {item.id} : {item.title}
                  </p>
                  <p>{item.content}</p>
                </StMapInputBox>
                <button
                  style={{ marginLeft: '10PX', border: 'none' }}
                  onClick={() => deleteButtonHandler(item.id)}
                >
                  삭제
                </button>
              </StMapLargeInputBox>
            );
          })}
        </div>
      </StLargeBox>
    </>
  );
}

export default List;
