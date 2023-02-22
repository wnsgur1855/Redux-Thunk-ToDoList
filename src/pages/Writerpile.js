import React from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { StBtn } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { __postTodo } from '../redux/modules/posttodo';

const Stp = styled.p`
  font-size: x-large;
`;
const StInputBox = styled.input`
  display: flex;
  width: 500px;
  height: 70px;
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
  //POST추가기능-------------------------------------------------------------------------------------
  const onSubmitHandler = async (newTodo) => {
    navigate('/list');
    dispatch(__postTodo(newTodo));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTodo = {
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
          placeholder="입력ㄱㄱ"
          required
        />
        <Stp>제목</Stp>
        <StInputBox value={title.title} onChange={titleHandler} placeholder="입력ㄱㄱ" required />
        <Stp>내용</Stp>
        <StInputBox
          value={content.content}
          onChange={contentHandler}
          placeholder="입력ㄱㄱ"
          required
        />

        <StBtn style={{ marginTop: '10px' }}>추가하기</StBtn>
      </form>
    </>
  );
}

export default Writerpile;
