import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faList, faUserGroup, faLock, faSignOut} from '@fortawesome/free-solid-svg-icons';

import {useAuth} from '../../contexts/Auth';

export default styled(RawSidebar)`
  min-width: 250px;
  height: auto;
  min-height: calc(100vh - 80px);
  background-color: var(--lightest-gray);

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 30px;

  .navigation-buttons {
      width: 100%;
  }

  .navigation-buttons li {
      font-size: var(--font-sm);

      padding: 15px 5px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color .2s;
  }

  .navigation-buttons li:hover {
      background-color: var(--lighter-gray);
  } 
`;

function RawSidebar(props) {
  const auth = useAuth();

  async function handleLogout(e) {
    try {
      await auth.logout();
    } catch (error) {
      alert('Não foi possível sair do sistema, tente novamente mais tarde');
    }
  }

  return (
    <div className={props.className}>
      <ul className="navigation-buttons">
        <MenuButton to='/admin' icon={faHome} text='Inicio' />
        <MenuButton to='/admin/products' icon={faList} text='Produtos' />
        <MenuButton to='/admin/clients' icon={faUserGroup} text='Clientes' />
        <MenuButton to='/admin/administrators' icon={faLock} text='Administradores' />
        <MenuButton onClick={handleLogout} to='/admin' icon={faSignOut} text='Sair' />
      </ul>
    </div>
  );
}

function MenuButton(props) {
  return (
    <Link to={props.to} onClick={props.onClick}>
      <li><FontAwesomeIcon icon={props.icon} /> {props.text}</li>
    </Link>
  );
}
