import React, {
  useState,
  useLayoutEffect,
  useContext,
  createContext,
} from 'react';

import api from '../../services/api';
import PintasticException from '../../models/PintasticException';

const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      console.log(api);

      const response = await api.post('/users/login', {
        email,
        password,
      });

      api.defaults.headers.Authorization = (
        `Bearer ${response.data.accessToken}`
      );

      setUser(response.data);
      localStorage.setItem('@PintasticShop:user', JSON.stringify(response.data));
    } catch (error) {
      throw new PintasticException('Incorrect user or password', 'O usuário ou senha estão incorretos');
    }
  }

  async function logout() {
    try {
      setUser(null);
      localStorage.removeItem('@PintasticShop:user');
    } catch (e) {
      throw e;
    }
  }

  useLayoutEffect(() => {
    loadStorageData();
  }, []);

  function loadStorageData() {
    try {
      const storagedUser = localStorage.getItem('@PintasticShop:user');

      const parsedUser = JSON.parse(storagedUser);

      api.defaults.headers.Authorization = (
        `Bearer ${parsedUser.accessToken}`
      );

      setUser(parsedUser);
    } catch (error) {
      console.log('Error while trying to load storage data');
    }
  }

  return (
    <AuthContext.Provider value={{
      signed: Boolean(user),
      user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
