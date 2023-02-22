import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { __deleteTodo } from '../redux/modules/todoSlice';
import { __fetchTodo } from '../redux/modules/todoSlice';
import { StBtn } from '../components/button';
import Delete from '../components/Get.Delete';

const StTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: groove;
  text-align: center;
  margin-top: 20px;
  border-radius: 30vh;
  background-color: rgb(255, 255, 128);
`;

function List() {
  //-------------------------------------------------------------------------------------
  const navigate = useNavigate();
  return (
    <>
      <StBtn
        onClick={() => {
          navigate('/writer');
        }}
      >
        빽!!
      </StBtn>
      <StTitleBox>나의 할 일</StTitleBox>
      <Delete />
    </>
  );
}

export default List;
