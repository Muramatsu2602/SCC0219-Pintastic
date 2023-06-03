import React from 'react'
import './Header.style.css'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header>
      <div className='header-main'>
        <div className='logo'>
          <Link to='/'>
          <img
            src={require('./assets/img/pintastic-logo.png')}
            id='img-logotipo'
            className='logotipo'
            alt='Logo'
          />
          </Link>
       
        </div>
        <div className='search-bar'>
          <div className='search'>
            <select name='filter'>
              <option value='all'>All</option>
              <option value='pins'>Pins</option>
              <option value='stickers'>Stickers</option>
            </select>
            <input type='text' placeholder='Search...' />
            <button>
              <i className='fa fa-search'></i>
            </button>
          </div>
        </div>
        <div className='user-icons'>
          <div>
            <a href='#'>
              <FontAwesomeIcon icon={faUser} />
            </a>

            <Link to='/cart'>
              <a href='#'>
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
