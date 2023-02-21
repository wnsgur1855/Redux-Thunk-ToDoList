import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { __deleteTodo } from '../redux/modules/todoSlice';
import { __fetchTodo } from '../redux/modules/todoSlice';
import { useSelector } from 'react-redux';
import { StBtn } from '../components/button';
import { backButtonHandler } from '../components/button';
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
  background-color: yellow;
  justify-content: center; //글자 가운데(가로)
  align-items: center; //글자 가운데(세로)
  margin: 20px 20px 20px 20px; //시계반대방향
`;

const StMapLargeInputBox = styled.div`
  width: 85%;
  height: 50px;
  display: flex !important;
  background-color: red;
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
    dispatch(__fetchTodo());
  }, []);
  //useEffect는 사용하면 해당 컴포넌트(List)가 마운트될 때, 서버로부터 데이터를 받아오기 위해__fetchtodo()함수를 실행하고있다
  //의존성배열(두번째인자)로 빈 배열을 뒀기 때문에 마운트 될 때만 함수가 실행하도록 설정.(빈 배열일 땐 컴포넌트가 처음 마운트 될 때 한 번만 실행)
  //이렇게 하면 컴포넌트가 업데이트 될 때는 useEffect가 실행되지 않고, 컴포넌트가 처음으로 마운트 될 때 한번만 실행되도록 할 수 있다.
  //->여기서 역할 : 컴포넌트가 마운트될 때 서버로부터 데이터를 받아와서 store에 저장하는 역할, 그 후 데이터를 받아올 필요가 없어서(의존성배열에 값 ㄴ)
  //?마운트란? : 컴포넌트가 브라우저상에 나타나는 것(처음으로 dom에 렌더링되어 보이게 되는 것)
  //get요청방식(instance적용)-------------------------------------------------------------------------------------
  //   const fetchTodos = async () => {
  //     await dispatch(__fetchTodo());
  //     //console.log('data', data);
  //   };
  //->이거 사용하면 데이터를 반환하기 전에(데이터를 완전히 받아지지 않은 상태에서)  dispatch함수가 실행되어 데이터가 정상적으로 가져와지지않고 data는 undefined
  //delete요청방식(instance적용)-----------------------------------------------------------------------------------------
  const deleteButtonHandler = async (id) => {
    await dispatch(__deleteTodo(id));
    //dispatch(__deleteTodo(id));
    //console.log(id);
    //window.location.reload();
    await dispatch(__fetchTodo()); //--------------->이게 있어버리니까 리듀서에 문제가 있어도 삭제가 되어버리네,,
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
