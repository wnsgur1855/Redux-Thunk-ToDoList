import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StCenterDiv } from '../components/Style';
import CreateTodo from '../components/CreateTodo';

function Writerpile() {
  //useNavigate-------------------------------------------------------------------------------------
  const navigate = useNavigate();

  return (
    <StCenterDiv>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        back
      </button>
      <CreateTodo />
    </StCenterDiv>
  );
}

export default Writerpile;
