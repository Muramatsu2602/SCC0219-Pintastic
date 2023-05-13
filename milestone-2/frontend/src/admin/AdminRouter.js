import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

function AdminRouter(props) {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
}

export default AdminRouter;
