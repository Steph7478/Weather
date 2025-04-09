import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/mainLayout/mainLayout';
import Home from '../page/home/index';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
