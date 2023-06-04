import React, {useState} from 'react';
import './Header.style.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({quantity}) => {
  const [cartItemCount] = useState(quantity);

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
          <Link to='/profile'>
            <FontAwesomeIcon icon={faUser} />
          </Link>

          <Link to='/cart'>
            <div className='cart-item-icon'>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && (
                <div className='cart-item-count'>{cartItemCount}</div>
              )}
            </div>
          </Link>

          <Link to='/wishlist'>
            <div className='wishlist-icon'>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
