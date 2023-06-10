import React, {useState} from 'react';
import './Card.style.css';
import Button from './Button';
import StarRating from './StarRating';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHeart as faHeartSolid,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';


const Card = ({
  productId,
  productPrice,
  productTitle,
  productDescription,
  productDiscountPercentage,
  productImage,
  productRating,
  productCategory,
}) => {
  const {signed} = useAuth();

  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const handleWishlistToggle = () => {
    setIsOnWishlist(!isOnWishlist);
  };

  const heartIcon = isOnWishlist ? faHeartSolid : faHeartRegular;

  return (
    <div className='item-card-container'>
      <div className='item-card-top-section'>
        {productDiscountPercentage > 0 ? (
              <div className='discount-pill'>
                {productDiscountPercentage}% OFF
              </div>
            ) : null}
      </div>
      <Link to={`/product/${productId}`}> {/* Update the Link's to prop */}

        <div className='item-card-img'>

          <img src={productImage} alt='card_image' />
        </div>
      </Link>
      <div className='item-card-details'>
        <div id='card-upper-section'>
          <h4 id='item-title'>
            <div className='item-category-and-icon'>
              {signed ? ( <div
                className='item-card-wishlist-icon'
                onClick={handleWishlistToggle}
              >
                <FontAwesomeIcon icon={heartIcon} />
              </div>) : null}

              <div className='category-pill'>
                <FontAwesomeIcon icon={faTag} />
                <span>{productCategory}</span>
              </div>
            </div>

            <Link to={`/product/${productId}`}>
              {productTitle}{' '}
            </Link>
          </h4>
          <span id='item-description'>{productDescription}</span>
          <div className='item-rating'>
            <StarRating rating={productRating} />
          </div>
        </div>
        <div id='item-card-bottom'>
          <span id='item-price'>R$ {productPrice}</span>
          <Link to='/cart'>
            <Button buttonText={'Add to Cart'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
