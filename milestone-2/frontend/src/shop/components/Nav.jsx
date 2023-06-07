import React from 'react';
import './Nav.style.css';
import {Link} from 'react-router-dom';

const Menu = () => {
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <Link to={'/products/button'}>Button Pins</Link>{' '}
        </li>
        <li>
          <Link to={'/products/metal'}>Metal Pins</Link>{' '}
        </li>
        <li>
          <Link to={'/day'}>😎 Pin do Dia</Link>{' '}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
