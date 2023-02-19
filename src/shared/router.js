import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import List from '../pages/List';
import Writerpile from '../pages/Writerpile';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writer" element={<Writerpile />} />
        <Route path="/list" element={<List />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
