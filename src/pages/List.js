import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { __deleteTodo } from '../redux/modules/deletetodo';
import { __fetchTodo } from '../redux/modules/todoSlice';
import { useSelector } from 'react-redux';
import { StBtn } from '../components/button';

const StLargeBox = styled.div`
  width: 80%;
  height: 500px;
  margin-left: 30px;
  border-radius: 30px;
  border: 3px black solid;
`;

//버튼 컴포넌트 하나론 힘들 것 같아요!
const StMapInputBox = styled.button`
  width: 70%;
  height: 40px;
  display: flex !important; //important가 무슨 의미냐
  background-color: white;
  justify-content: center; //글자 가운데(가로)
  align-items: center; //글자 가운데(세로)
  margin: 20px 20px 20px 20px; //시계반대방향
`;

const StMapLargeInputBox = styled.div`
  width: 85%;
  height: 50px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 20px 20px; ;
`;

function List() {
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

  const backButtonHandler = () => {
    alert('빽');
    navigate('/writer');
  };

  //-------------------------------------------------------------------------------------

  return (
    <>
      <StBtn onClick={backButtonHandler}>빽!!</StBtn>
      <div style={{ marginLeft: '30px' }}>나의 할 일</div>
      <StLargeBox>
        <div>
          {data?.map((item) => {
            //console.log(item.id);
            return (
              <StMapLargeInputBox key={item.id}>
                <StMapInputBox
                  onClick={() => {
                    navigate(`/${item.id}`);
                    alert('딸깍!');
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
      </StLargeBox>
    </>
  );
}

export default List;
