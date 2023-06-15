import React from 'react';

import {AuthProvider} from './contexts/Auth';

import AdminRouter from './AdminRouter';

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRouter />
    </AuthProvider>
  );
}
