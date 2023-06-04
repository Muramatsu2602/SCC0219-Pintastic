import React, {useState} from 'react';
import './Card.style.css';
import Button from './Button';
import StarRating from './StarRating';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom';
const Card = ({
  productPrice,
  productTitle,
  productDescription,
  productDiscountPercentage,
  productImage,
  productRating,
}) => {
  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const handleWishlistToggle = () => {
    setIsOnWishlist(!isOnWishlist);
  };

  const heartIcon = isOnWishlist ? faHeartSolid : faHeartRegular;

  return (
    <div className='item-card-container'>
      <Link
        to={{
          pathname: '/product',
          state: {productId: 1},
        }}
      >
        <div className='item-card-img'>
          <div className='item-card-top-section'>
            <div className='discount-pill'>
              {productDiscountPercentage}% OFF
            </div>
          </div>
          <img src={require(`${productImage}`)} alt='card_image' />
        </div>
      </Link>
      <div className='item-card-details'>
        <Link
          to={{
            pathname: '/product',
            state: {productId: 1},
          }}
        >
          <div id='card-upper-section'>
            <h4 id='item-title'>
              {' '}
              <div
                className='item-card-wishlist-icon'
                onClick={handleWishlistToggle}
              >
                <FontAwesomeIcon icon={heartIcon} />
              </div>
              {productTitle}{' '}
            </h4>
            <span id='item-description'>{productDescription}</span>
            <div className='item-rating'>
              <StarRating rating={productRating} />
            </div>
          </div>
        </Link>

        <div id='item-card-bottom'>
          <span id='item-price'>R$ {productPrice}</span>
          <Button buttonText={'Add to Cart'} />
        </div>
      </div>
    </div>
  );
};

export default Card;
