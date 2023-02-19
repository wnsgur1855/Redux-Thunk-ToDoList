import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handler = (e) => {
    //db의 todos는 객체 형태이므로 이렇게 써줘야한다
    setValue({
      title: e.target.value,
      content: e.target.value,
    });
  };
  return [value, handler]; //--->return위치 똑바로 하기
};
export default useInput;
