import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ShopRouter from './shop/ShopRouter';
import AdminRouter from './admin/AdminRouter';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopRouter />} />
        <Route path="/admin" element={<AdminRouter />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
