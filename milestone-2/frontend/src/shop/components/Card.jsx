import React, {useState, useContext} from 'react';
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
import Swal from 'sweetalert2'; // Import Swal

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
  const {cartItems, addToCart} = useContext(CartContext);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const navigate = useNavigate();

  const handleWishlistToggle = () => {
    setIsOnWishlist(!isOnWishlist);
  };

  const heartIcon = isOnWishlist ? faHeartSolid : faHeartRegular;

  const handleAddToCart = () => {
    const product = {
      productId,
      productPrice,
      productTitle,
      productDescription,
      productImage,
      quantity: 1,
    };

    // Check if the product already exists in the cart
    const isProductInCart = cartItems.some((item) => item.productId === productId);

    if (isProductInCart) {
      // Show error or alert indicating that the product is already in the cart
      Swal.fire({
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      // Product is not in the cart, add it
      addToCart(product);
      showAddToCartConfirmation(); // Call confirmation popup function
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
        navigate('/cart'); // Redirect to cart
      }
    });
  };

  return (
    <div className='item-card-container'>
      <div className='item-card-top-section'>
        {productDiscountPercentage > 0 ? (
          <div className='discount-pill'>{productDiscountPercentage}% OFF</div>
        ) : null}
      </div>
      <Link to={`/product/${productId}`}>
        <div className='item-card-img'>
          <img src={productImage} alt='card_image' />
        </div>
      </Link>
      <div className='item-card-details'>
        <div id='card-upper-section'>
          <h4 id='item-title'>
            <div className='item-category-and-icon'>
              <div
                className='item-card-wishlist-icon'
                onClick={handleWishlistToggle}
              >
                <FontAwesomeIcon icon={heartIcon} />
              </div>
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
          <span id='item-price'>R$ {productPrice}</span>
          <Button buttonText={'Add to Cart'} onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
