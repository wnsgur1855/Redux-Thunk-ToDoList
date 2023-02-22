import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { __deleteTodo } from '../redux/modules/TodoSlice';
import { __fetchTodo } from '../redux/modules/TodoSlice';
import { useSelector } from 'react-redux';
import { StCenterDiv, StMapInputBox, StMapLargeInputBox } from './Style';

function Delete() {
  //useSelector----------------------------------------------------------------
  const data = useSelector((state) => state.fetchtodoSlice.todos);
  console.log(' state data', data);
  //useNavigate--------------------------------
  const navigate = useNavigate();
  //useDispatch--------------------------------------------------
  const dispatch = useDispatch();
  //useEffect로 서버로부터 값 가져오기(api호출)-------------------------------------------------------------------------------------
  useEffect(() => {
    const result = dispatch(__fetchTodo());
    console.log(result);
  }, []);

  //delete요청방식(instance적용)-----------------------------------------------------------------------------------------
  const deleteButtonHandler = async (id) => {
    await dispatch(__deleteTodo(id));
    //window.location.reload();
    await dispatch(__fetchTodo());
  };

  return (
    <StCenterDiv>
      <div>
        {data?.map((item) => {
          return (
            <StMapLargeInputBox key={item.id}>
              <StMapInputBox
                onClick={() => {
                  navigate(`/${item.id}`);
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
    </StCenterDiv>
  );
}

export default Delete;
