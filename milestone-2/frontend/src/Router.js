import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ShopRouter from './shop/ShopRouter';
import AdminRouter from './admin/AdminRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<ShopRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
