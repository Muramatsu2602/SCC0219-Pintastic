import React, {useState, useContext, useEffect} from 'react';
import './Card.style.css';
import Button from './Button';
import StarRating from './StarRating';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHeart as faHeartSolid,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import {Link, useNavigate} from 'react-router-dom';
import {CartContext} from '../contexts/Cart';
import {WishlistContext} from '../contexts/Wishlist';
import Swal from 'sweetalert2';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {useAuth} from '../contexts/Auth';

import placeholderImage from '../../shop/components/assets/placeholder.jpg'; // Import the placeholder image

const Card = ({
  productId,
  productPrice,
  productTitle,
  productDescription,
  productDiscountPercentage,
  productImage,
  productRating,
  productCategory,
  productStock,
}) => {
  const {cartItems, addToCart} = useContext(CartContext);
  const {wishlistItems, addToWishlist, removeFromWishlist} = useContext(
      WishlistContext,
  );
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const navigate = useNavigate();
  const {signed} = useAuth();

  useEffect(() => {
    const isProductWishlisted = wishlistItems.some(
        (item) => item.productId === productId,
    );
    setIsOnWishlist(isProductWishlisted);
  }, [wishlistItems, productId]);

  const handleWishlistToggle = () => {
    if (isOnWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setIsOnWishlist(!isOnWishlist);
  };

  const heartIcon = isOnWishlist ? faHeartSolid : faHeartRegular;

  const handleAddToCart = () => {
    const product = {
      _id: productId,
      price: productPrice,
      title: productTitle,
      description: productDescription,
      image: productImage,
      stock: productStock,
    };

    const isProductInCart = cartItems.some(
        (item) => item._id === productId,
    );

    if (isProductInCart) {
      Swal.fire({
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      addToCart(product, 1);
      showAddToCartConfirmation();
    }
  };

  const showAddToCartConfirmation = () => {
    Swal.fire({
      title: 'Item Added to Cart',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'View Cart',
      cancelButtonText: 'Continue Shopping',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/cart');
      }
    });
  };

  // Use the placeholder image if productImage is empty or undefined
  const imageSource = productImage || placeholderImage;

  return (
    <div className='item-card-container'>
      <div className='item-card-top-section'>
        {productDiscountPercentage > 0 && productStock > 0 && (
          <div className='discount-pill'>{productDiscountPercentage}% OFF</div>
        )}
      </div>
      <Link to={`/product/${productId}`}>
        <div className='item-card-img'>
          <img src={imageSource} alt='card_image' />
        </div>
      </Link>
      <div className='item-card-details'>
        <div id='card-upper-section'>
          <h4 id='item-title'>
            <div className='item-category-and-icon'>
              {signed && productStock > 0 && (
                <div
                  className='item-card-wishlist-icon'
                  onClick={handleWishlistToggle}
                >
                  <FontAwesomeIcon icon={heartIcon} />
                </div>
              )}
              <div className='category-pill'>
                <FontAwesomeIcon icon={faTag} />
                <span>{productCategory}</span>
              </div>
            </div>

            <Link to={`/product/${productId}`}>{productTitle} </Link>
          </h4>
          <span id='item-description'>{productDescription}</span>
          <div className='item-rating'>
            <StarRating rating={productRating} />
          </div>
        </div>
        <div id='item-card-bottom'>
          {productStock > 0 ? (
            <>
              <span id='item-price'>R$ {productPrice}</span>
              <Button buttonText={'Add to Cart'} onClick={handleAddToCart} />
            </>
          ) : (
            <div className='out-of-stock-message'>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className='out-of-stock-icon'
              />
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
