import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {useAuth} from '../contexts/Auth';

import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Products from './pages/Products';
import Clients from './pages/Clients';
import Admins from './pages/Admins';

function AdminRouter(props) {
  const {signed} = useAuth();

  return signed ? <SignedRoutes /> : <UnsignedRoutes />;
}

function UnsignedRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
}

function SignedRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<></>} />
        <Route path='/products' element={<Products />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/administrators' element={<Admins />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
