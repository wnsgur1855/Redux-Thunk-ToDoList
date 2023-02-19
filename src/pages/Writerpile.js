import React from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { StBtn } from './Home';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAdd } from '../redux/modules/todoSlice';
import axios from 'axios';
import api from '../axios/api';

const Stp = styled.p`
  font-size: x-large;
`;
const StInputBox = styled.input`
  border-radius: 20px;
`;

function Writerpile() {
  //useInput-------------------------------------------------------------------------------------
  //커스텀 훅
  //inputValue가 객체이니까 형태 맞게 변형
  const [writer, writerHandler] = useInput({
    title: '',
  });
  const [title, titleHandler] = useInput({
    title: '', //-->객체 형식만 맞추면 되는거라 content쓸 필요 ㄴ
  });
  const [content, contentHandler] = useInput({
    title: '',
  });
  //   console.log(writer);
  //   console.log(title);
  //   console.log(content);
  //useNavigate-------------------------------------------------------------------------------------
  const navigate = useNavigate();
  //useDispatch-------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  //추가기능-------------------------------------------------------------------------------------
  //   const AddButtonHandler = () => {
  //     alert('추가함');
  //     navigate('/list');
  //     dispatch(createAdd({ writer, title, content }));
  //   };
  //POST추가기능-------------------------------------------------------------------------------------
  const onSubmitHandler = async () => {
    //이 줄이 안 끝나고 저 navigate가 실행이 되니까 새로고침을 해야지 보여지는 것이다 await로 실행까지 기다리게 하자
    await api.post('/todos', writer, title, content);
    navigate('/list');
  };

  //-------------------------------------------------------------------------------------
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //버튼 클릭시, input에 들어가는 값(state)을 이용하여 db에 저장(post요청)
          onSubmitHandler();
        }}
      >
        <Stp>작성자</Stp>
        <StInputBox
          value={writer.writer}
          onChange={writerHandler}
          placeholder="입력해라"
          required
        />
        <Stp>제목</Stp>
        <StInputBox value={title.title} onChange={titleHandler} placeholder="입력해라" required />
        <Stp>내용</Stp>
        <StInputBox
          value={content.content}
          onChange={contentHandler}
          placeholder="입력해라"
          required
        />

        <StBtn style={{ marginTop: '100px' }}>추가하기</StBtn>
      </form>
    </>
  );
}

export default Writerpile;
