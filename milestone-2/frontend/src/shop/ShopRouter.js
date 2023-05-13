import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

function ShopRouter(props) {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
}

export default ShopRouter;
