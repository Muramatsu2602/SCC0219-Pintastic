import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Nav';
import Input from '../components/Input';
import Button from '../components/Button';

import PintasticException from '../../models/PinstaticException';
import {useAuth} from '../contexts/Auth';

import './Profile.style.css';
import Swal from 'sweetalert2';

export default function Profile() {
  const auth = useAuth();

  const mockUser = {
    'name': 'Cliente',
    'cep': '12900-000',
    'state': 'São Paulo',
    'address': 'Rua 1, Jardim B, São Paulo',
    'complement': 'Número 15',
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(mockUser.name);
  const [cep, setCep] = useState(mockUser.cep);
  const [state, setState] = useState(mockUser.state);
  const [address, setAddress] = useState(mockUser.address);
  const [complement, setComplement] = useState(mockUser.complement);

  async function handleUpdateProfile(e) {
    try {
      e.preventDefault();

      if (currentPassword != '123') {
        throw new PintasticException('Current password is invalid', 'A senha atual está incorreta!');
      }

      if (password != confirmPassword) {
        throw new PintasticException('Passwords do not match', 'As senhas não estão iguais!');
      }

      const updatedUser = {
        currentPassword,
        password,
        name,
        cep,
        state,
        address,
        complement,
      };

      console.log(updatedUser);

      Swal.fire('Dados atualizados!', 'Seus dados foram atualizados com sucesso', 'success');
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível realizar o login, tente novamente mais tarde', 'error');
    }
  }

  async function handleLogout(e) {
    try {
      e.preventDefault();

      await auth.logout();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível realizar sair da sua conta, tente novamente mais tarde', 'error');
    }
  }

  return (
    <>
      <Header />
      <Menu />

      <main id='profile'>
        <div className="profile-wrapper">
          <div className="header">
            <h1>Meu perfil</h1>
            <Link onClick={handleLogout} className='link'>Sair da minha conta</Link>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <div className="row">
              <div className="col-md-4">
                <Input
                  label='Senha atual'
                  type='password'
                  id='currentPassword'
                  placeholder='*****'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <Input
                  label='Nova senha'
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
                  label='Confirmar nova senha'
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
                  buttonText='Salvar'
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
