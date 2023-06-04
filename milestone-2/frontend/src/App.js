import React from 'react';
import './styles/global.css';

import {AuthProvider} from './contexts/Auth';

import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
