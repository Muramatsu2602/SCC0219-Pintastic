import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {useAuth} from '../contexts/Auth';

import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Home from './pages/Home';

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
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
