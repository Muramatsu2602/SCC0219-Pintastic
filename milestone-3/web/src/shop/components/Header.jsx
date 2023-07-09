import React, {useContext} from 'react';
import './Header.style.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser, faHeart} from '@fortawesome/free-solid-svg-icons';
import {CartContext} from '../contexts/Cart'; // Import CartContext
import {useAuth} from '../contexts/Auth';


const Header = ({displaySearchBar = false, onSearch, onProductCategoryFilterChange}) => {
  const {signed} = useAuth();
  const {cartItems} = useContext(CartContext); // Access cartItems from CartContext
  const cartItemCount = cartItems.length; // Calculate the cart item count

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };

  const handleProductCategoryFilterChange = (event) => {
    const {value} = event.target;
    onProductCategoryFilterChange(value);
  };

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
        {displaySearchBar && (
          <div className='search-bar'>
            <div className='search'>
              <select name='filter' onChange={handleProductCategoryFilterChange}>
                <option value='all'>All</option>
                <option value='Pin'>Pins</option>
                <option value='Sticker'>Stickers</option>
              </select>
              <input type='text' placeholder='Search...' onChange={handleSearch} />
              <button>
                <i className='fa fa-search'></i>
              </button>
            </div>
          </div>
        )}

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
          {signed? ( <Link to='/wishlist'>
            <div className='wishlist-icon'>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </Link>) : null}

        </div>
      </div>
    </header>
  );
};

export default Header;
