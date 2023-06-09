import React, {useState} from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Nav';
import Input from '../../components/Input';
import Button from '../../components/Button';

import PintasticException from '../../../models/PinstaticException';
import {useAuth} from '../../contexts/Auth';

import './styles.css';
import Swal from 'sweetalert2';

export default function Login() {
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [complement, setComplement] = useState('');

  async function handleSignup(e) {
    try {
      e.preventDefault();

      if (password != confirmPassword) {
        throw new PintasticException('Passwords do not match', 'As senhas não estão iguais!');
      }

      const newUser = {
        email,
        password,
        name,
        cep,
        state,
        address,
        complement,
      };

      console.log(newUser);

      await auth.login('client@pintastic.com', '123');
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

      <main id='signup'>
        <div className="signup-wrapper">
          <h1>Cadastro</h1>
          <form onSubmit={handleSignup}>
            <div className="row">
              <div className="col-md-4">
                <Input
                  label='Email'
                  type='email'
                  id='email'
                  placeholder='cliente@pintastic.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='Senha'
                  type='password'
                  id='password'
                  placeholder='*****'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='Confirmar senha'
                  type='password'
                  id='confirmPassword'
                  placeholder='*****'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Input
                  label='Nome completo'
                  type='text'
                  id='name'
                  placeholder=''
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='País'
                  type='text'
                  id='country'
                  placeholder='Brasil'
                  disabled
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='CEP'
                  type='text'
                  id='cep'
                  placeholder='12900-000'
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Input
                  label='Estado'
                  type='text'
                  id='state'
                  placeholder='São Paulo'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='Endereço'
                  type='text'
                  id='address'
                  placeholder='Rua 1, Jardim B, São Paulo'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='Complemento'
                  type='text'
                  id='complement'
                  placeholder='Número 15'
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Button
                  buttonText='Criar conta'
                />
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};
