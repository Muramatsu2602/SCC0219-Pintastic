import React from 'react'
import './Nav.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <a href='#'>
            Adesivos <FontAwesomeIcon icon={faChevronDown} />
          </a>
          <ul>
            <li>
              <a href='#'>Adesivo 1</a>
            </li>
            <li>
              <a href='#'>Adesivo 2</a>
            </li>
            <li>
              <a href='#'>Adesivo 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#'>
            Pins em Metal <FontAwesomeIcon icon={faChevronDown} />
          </a>
          <ul>
            <li>
              <a href='#'>Pin 1</a>
            </li>
            <li>
              <a href='#'>Pin 2</a>
            </li>
            <li>
              <a href='#'>Pin 3</a>
            </li>
          </ul>
        </li>
        <li>
          <Link to={'/day'}>😎 Pin do Dia</Link>{' '}
        </li>
      </ul>
    </nav>
  )
}

export default Menu
