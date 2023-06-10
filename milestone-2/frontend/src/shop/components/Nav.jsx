import React from 'react';
import './Nav.style.css';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';

const Menu = () => {
  const {signed} = useAuth();

  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>{' '}
        </li>
        <li>
          <Link to={'/catalog/'}>All Products !</Link>{' '}
        </li>
        <li>
          <Link to={'/catalog/pins'}>Pins</Link>{' '}
        </li>
        <li>
          <Link to={'/catalog/stickers'}>Stickers</Link>{' '}
        </li>
        {signed ? (
          <li>
            <Link to={'/day'}>😎 Pin do Dia</Link>{' '}
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Menu;
