import React from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { StBtn } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAdd } from '../redux/modules/todoSlice';
import api from '../axios/api';
import { __postTodo } from '../redux/modules/todoSlice';

const Stp = styled.p`
  font-size: x-large;
`;
const StInputBox = styled.input`
  border-radius: 20px;
`;

function Writerpile() {
  //useInput-------------------------------------------------------------------------------------
  const [writer, writerHandler] = useInput('');
  const [title, titleHandler] = useInput('');
  const [content, contentHandler] = useInput('');

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
  //db에 데이터가 어떤 형식으로 쌓이는지 잘 파악하고 post
  const onSubmitHandler = async (newTodo) => {
    //이 줄이 안 끝나고 저 navigate가 실행이 되니까 새로고침을 해야지 보여지는 것이다 await로 실행까지 기다리게 하자
    //객체안에는 key(e.target.value)를 가져왔어서 안 됐다. :객체 자체를 추가해줘야한다.
    navigate('/list');
    dispatch(__postTodo(newTodo));
  };

  //-------------------------------------------------------------------------------------
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //버튼 클릭시, input에 들어가는 값(state)을 이용하여 db에 저장(post요청)
          const newTodo = {
            // id: Date.now(), 상세페이지 만들때 쓴다
            title,
            content,
          };
          onSubmitHandler(newTodo);
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
