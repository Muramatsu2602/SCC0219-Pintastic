import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ShopApp from './shop/ShopApp';
import AdminApp from './admin/AdminApp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<ShopApp />} />
      </Routes>
    </Router>
  );
}

export default App;
