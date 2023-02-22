import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { __defetchTodo } from '../redux/modules/detailGet';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { __modifyTodo } from '../redux/modules/modifySlice';

const StCenterDiv = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StModifyBox = styled.div`
  width: 50px;
  height: 50px;
  border: 2px black;
  margin-top: 20px;
`;

function Detail() {
  const [change, onchangeHandler] = useInput({});

  //url파라미터 값 가져오기 ------------------------------------------
  const params = useParams();
  //useDispatch사용    --------------------------------------
  const dispatch = useDispatch();
  //store에서 데이터 가져오기--------------------------------------
  const data = useSelector((state) => {
    return state.defetchTodoSlice.todo;
  });
  //dispatch가 시행될 때마다 mount
  useEffect(() => {
    const result = dispatch(__defetchTodo(params.id));
    //console.log(result);
  }, [dispatch]);
  //수정 핸들러
  const modifyHandler = async (id, title) => {
    const test = dispatch(__modifyTodo({ id, title }));
    console.log(test);
    dispatch(__defetchTodo(params.id));
    alert('수정완료...');
  };

  return (
    <StCenterDiv>
      <input
        value={change.change}
        onChange={onchangeHandler}
        placeholder="수정좀 하고 살아라"
        required
      />
      <button onClick={() => modifyHandler(params.id, change)}>수졍하기</button>
      <StModifyBox>{data.title}</StModifyBox>
    </StCenterDiv>
  );
}

export default Detail;
