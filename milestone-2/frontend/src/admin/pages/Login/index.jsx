import {React, useState} from 'react';
import './styles.css';

import {useAuth} from '../../../contexts/Auth';
import PintasticException from '../../../models/PinstaticException';

import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Login() {
  const {login} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    try {
      e.preventDefault();

      await login(email, password);
    } catch (error) {
      if (error instanceof PintasticException) {
        alert(error.getBusinessMessage());
        return;
      }

      alert('Não foi possível realizar o login, tente novamente mais tarde');
    }
  }

  return (
    <div id='login-page'>
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

function Input(props) {
  return (
    <div className="input">
      <label htmlFor={props.id}>
        <FontAwesomeIcon icon={props.icon} />
        { props.label }
      </label>
      <input { ...props }/>
    </div>
  );
}

function SubmitButton(props) {
  return (
    <button type='submit' className="submit-button">
      { props.value }
    </button>
  );
}
