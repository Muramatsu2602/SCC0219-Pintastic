import React, {
  useState,
  useLayoutEffect,
  useContext,
  createContext,
} from 'react';

import PintasticException from '../../models/PinstaticException';

const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      if (email != 'admin@pintastic.com' || password != '123') {
        throw new PintasticException('Incorrect email or password', 'Email ou senha incorretos');
      }
      // const response = await api.post('/login', {
      //   email,
      //   senha: password,
      // });

      const response = {
        data: {
          email,
        },
      };

      setUser(response.data);

      localStorage.setItem('@PintasticAdmin:user', JSON.stringify(response.data));
    } catch (error) {
      // if(error.code == 'incorrectUserOrPassword') {
      //   throw new PintasticException('Incorrect user or password', 'O usuário ou senha estão incorretos');
      // }

      throw error;
    }
  }

  async function logout() {
    try {
      setUser(null);
      localStorage.clear();
    } catch (e) {
      throw e;
    }
  }

  useLayoutEffect(() => {
    loadStorageData();
  }, []);

  function loadStorageData() {
    try {
      const storagedUser = localStorage.getItem('@PintasticAdmin:user');

      const parsedUser = JSON.parse(storagedUser);

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
