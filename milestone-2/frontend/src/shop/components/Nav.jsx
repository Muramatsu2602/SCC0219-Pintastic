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
          <Link to={'/catalog/button'}>Button Pins</Link>{' '}
        </li>
        <li>
          <Link to={'/catalog/metal'}>Metal Pins</Link>{' '}
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
