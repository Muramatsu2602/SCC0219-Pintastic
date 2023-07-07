import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Menu from '../components/Nav';
import Input from '../components/Input';

import PintasticException from '../../models/PintasticException';
import {useAuth} from '../contexts/Auth';

import Swal from 'sweetalert2';

import './Login.style.css';

export default function Login() {
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    try {
      e.preventDefault();

      await auth.login(email, password);
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível realizar o login, tente novamente mais tarde', 'error');
    }
  }

  return (
    <>
      <Header quantity={7} />
      <Menu />

      <main id='login'>
        <div className="login-card">
          <h3>Entrar</h3>
          <form onSubmit={handleLogin}>
            <Input
              label='Email'
              type='email'
              id='email'
              placeholder='client@pintastic.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label='Senha'
              type='password'
              id='password'
              placeholder='*****'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link className='link' to='/sign-up'>Não possui uma conta?</Link>
            <Button buttonText='Login' onClick={() => {}} />
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};
