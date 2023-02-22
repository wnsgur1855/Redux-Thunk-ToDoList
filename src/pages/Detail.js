import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { __defetchTodo } from '../redux/modules/DetailSlice';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { __modifyTodo } from '../redux/modules/todoSlice';
import { useNavigate } from 'react-router-dom';
import { StCenterDiv } from '../components/Style';

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StModifyInputBox = styled.input`
  display: flex;
  margin-bottom: 300px;
  border-style: dashed;
  width: 400px;
  height: 30px;
`;

const StModifyTEXTBox = styled.div`
  width: 400px;
  height: 30px;
  border-style: ridge;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StModifyButton = styled.button`
  width: 60px;
  height: 32px;
  margin: 1px 0px 0px 20px;
  border-style: groove;
  background-color: #89f5a7;
  &:hover {
    color: blueviolet;
    background-color: antiquewhite;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

function Detail() {
  const [change, onchangeHandler] = useInput({});

  //url파라미터 값 가져오기 ------------------------------------------
  const params = useParams();
  //useDispatch사용    --------------------------------------
  const dispatch = useDispatch();
  //useNavigate사용----------------------------
  const navigate = useNavigate();
  //store에서 데이터 가져오기--------------------------------------
  const data = useSelector((state) => {
    return state.defetchTodoSlice.todo;
  });
  useEffect(() => {
    dispatch(__defetchTodo(params.id));
  }, [dispatch]);
  //수정 핸들러
  const modifyHandler = async (id, title) => {
    const test = dispatch(__modifyTodo({ id, title }));
    window.location.reload();
    //dispatch(__defetchTodo(params.id));
  };

  return (
    <StCenterDiv>
      <StForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StWrapper>
          <StModifyInputBox
            value={change.change}
            onChange={onchangeHandler}
            placeholder="수정은 title만 되오니 양해 부탁드릴게요😌"
          />
          <StModifyButton onClick={() => modifyHandler(params.id, change)}>수졍</StModifyButton>
          <StModifyButton onClick={() => navigate('/list')}>back</StModifyButton>
        </StWrapper>
        <StModifyTEXTBox>
          {data.id} : {data.title}
        </StModifyTEXTBox>
      </StForm>
    </StCenterDiv>
  );
}

export default Detail;
