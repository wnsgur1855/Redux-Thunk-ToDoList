import styled from 'styled-components';

export const StCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
  background-color: rgba(255, 255, 128, 0.5);
  border: 30px solid yellow;
  border-style: ridge;
  margin: 20px 0px 0px 50px;
`;

//버튼 컴포넌트 하나론 힘들 것 같아요!
export const StMapInputBox = styled.button`
  width: 70%;
  height: 40px;
  display: flex !important; //important가 무슨 의미냐
  background-color: white;
  justify-content: center; //글자 가운데(가로)
  align-items: center; //글자 가운데(세로)
  margin: 20px 20px 20px 20px; //시계반대방향
  &:hover {
    color: blueviolet;
    background-color: antiquewhite;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export const StMapLargeInputBox = styled.div`
  width: 700px;
  height: 50px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 20px 20px; ;
`;
