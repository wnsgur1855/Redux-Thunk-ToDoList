import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // useParams 훅 import
import api from '../axios/api';
import { __defetchTodo } from '../redux/modules/detailGet';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { __modifyTodo } from '../redux/modules/modifySlice';

const StDivBodx = styled.div`
  width: 70px;
  height: 30px;
  border: 3px black;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StCenterDiv = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Detail() {
  const [change, onchangeHandler] = useInput({});

  //url파라미터 값 가져오기 ------------------------------------------
  const params = useParams();
  console.log(params);
  //useDispatch사용    --------------------------------------
  const dispatch = useDispatch();
  //store에서 데이터 가져오기--------------------------------------
  const data = useSelector((state) => {
    //console.log(state);
    //console.log(state.defetchTodoSlice.todo);
    return state.defetchTodoSlice.todo;
  });
  //dispatch가 시행될 때마다 mount
  useEffect(() => {
    const result = dispatch(__defetchTodo(params.id));
    //console.log(result);
  }, [dispatch]);

  //   const founddata = data.find((item) => {
  //     console.log(params);
  //     return item.id === Number(params);
  //   });

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
      <div>{data.title}</div>
    </StCenterDiv>
  );
}

export default Detail;

// <div>{data?.title}</div> : state를 이용하여 데이터 출력 -?옵셔널 체이닝 씀(null어쩌구일때)
