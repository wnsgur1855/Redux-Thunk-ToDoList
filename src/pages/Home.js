import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StBtn } from '../components/button';

const Stdiv = styled.div`
  font-size: large;
  margin-left: 20px;
  margin-bottom: 20px;
`;

function Home() {
  //     const data = useSelector((state) => {
  //     return state
  // })
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '50px' }}>
      <Stdiv>무엇을 할까용</Stdiv>
      <form
        style={{ flexDirection: 'column', display: 'flex', gap: '10px' }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StBtn
          onClick={() => {
            navigate('/writer');
            alert('할 일을 기록하러 갑시다');
          }}
        >
          할 일 기록하기
        </StBtn>
        <StBtn
          onClick={() => {
            navigate('/list');
            alert('내 할일로 갑시다');
          }}
        >
          ToDoList
        </StBtn>
      </form>
    </div>
  );
}

export default Home;
