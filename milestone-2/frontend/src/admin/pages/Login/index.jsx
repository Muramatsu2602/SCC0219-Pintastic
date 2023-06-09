import {React, useState} from 'react';
import './styles.css';

import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import {useAuth} from '../../contexts/Auth';
import PintasticException from '../../../models/PinstaticException';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';

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
    <div id="admin-login-page">
      <div className="login-wrapper">
        <div className="title">
          <p>Pintastic<span>Admin</span></p>
        </div>
        <div className="card">
          <form onSubmit={handleLogin}>
            <Input
              type='email'
              id='email'
              icon={faEnvelope}
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type='password'
              id='password'
              icon={faLock}
              label='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <SubmitButton
              value='Entrar'
            />
          </form>
        </div>
      </div>
    </div>
  );
};
