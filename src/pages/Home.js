import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StBtn } from '../components/button';
import { StCenterDiv } from '../components/Style';

const Stdiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: large;
  width: 70%;
  margin-bottom: 300px;
  background-color: aqua;
  border-style: dashed;
`;

const Stform = styled.form`
  flex-direction: column;
  display: flex;
  gap: 10px;
`;

function Home() {
  const navigate = useNavigate();

  return (
    <StCenterDiv style={{ marginTop: '50px' }}>
      <Stdiv>무엇을 할까용</Stdiv>
      <Stform
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StBtn
          onClick={() => {
            navigate('/writer');
          }}
        >
          할 일 기록하기
        </StBtn>
        <StBtn
          onClick={() => {
            navigate('/list');
          }}
        >
          ToDoList
        </StBtn>
      </Stform>
    </StCenterDiv>
  );
}

export default Home;
