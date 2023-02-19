import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅 import
import api from '../axios/api';

function Detail() {
  const { id } = useParams(); // useParams 훅을 이용하여 id 값을 가져옴
  const [data, setData] = useState(null); // state 설정
  const [change, setChange] = useState({
    //수정할 input
    title: '',
  });
  //console.log(change);
  //get함수로 데이터 요청하기------------------------------------------------------------------------
  const fetchTodo = async () => {
    const { data } = await api.get(`/todos/${id}`); // id 값을 이용하여 해당 id에 대한 데이터만 불러옴
    setData(data); // state 업데이트
  };
  //get함수로 데이터 요청한 것 실행시키기------------------------------------------------------------------------
  useEffect(() => {
    fetchTodo();
  }, [id]);
  //patch로 db수정하기요청-------------------------------------------------------------------------------------------------
  const changeButtonHandler = async () => {
    //state로 이미 값을 갖고 있어서 인자로 안 받아도 된다. 밑의 인자도 no필요
    alert('수정이 되었씀미다?');
    const data = await api.patch(`/todos/${id}`, {
      title: change,
    }); //,뒤에는 어떻게 바꿔줄지를 적으면 된다 (객체형태이므로 형식 맞춰서)
    //원래같으면 $에서 아이디를 찾아서 title을 찾아서 change로 바꾼다 ==하지만 지금은 id에 들어와있다는 거
    setChange(change);
    console.log('---data--', data);
  };
  //input(onchange) 함수-------------------------------------------------------------------------------------------------
  const onchangeHandler = (e) => {
    setChange(e.target.value);
  };
  return (
    <>
      <input
        value={change.change}
        onChange={onchangeHandler}
        placeholder="수정좀 하고 살아라"
        required
      />
      <button onClick={changeButtonHandler}>수졍하기</button>
      <div>{data?.title}</div>
    </>
  );
}

export default Detail;

// <div>{data?.title}</div> : state를 이용하여 데이터 출력 -?옵셔널 체이닝 씀(null어쩌구일때)
