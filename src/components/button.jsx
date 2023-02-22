import styled from 'styled-components';

export const StBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: wheat;
  border: none;
  border-radius: 20px;
  text-align: center;
  border-style: groove;
  background-color: #89f5a7;
  &:hover {
    color: blueviolet;
    background-color: antiquewhite;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export const backButtonHandler = () => {
  alert('빽');
};
