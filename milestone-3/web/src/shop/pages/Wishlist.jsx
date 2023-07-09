import React, {useContext, useEffect, useState} from 'react';
import './Wishlist.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/StarRating';
import Menu from '../components/Nav';
import {WishlistContext} from '../contexts/Wishlist';
import {CartContext} from '../contexts/Cart';
import {calculateDiscountedPrice} from './utils/calculateDiscountedPrice';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import api from '../../services/api';

const Wishlist = () => {
  const navigate = useNavigate();
  const {wishlistItems, removeFromWishlist} = useContext(WishlistContext);
  const {cartItems, addToCart} = useContext(CartContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const productIds = wishlistItems.map((item) => item.productId);
      const promises = productIds.map((productId) =>
        api.get(`/products/${productId}`),
      );
      const responses = await Promise.all(promises);
      const products = responses.map((response) => response.data);
      setWishlistProducts(products);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [wishlistItems]);

  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: 'Remove Item',
      text: 'Are you sure you want to remove this item from your wishlist?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromWishlist(itemId);
      }
    });
  };

  const handleAddToCart = (productId) => {
    // Check if the item is on the wishlist
    const item = wishlistProducts.find((item) => item._id === productId);

    if (!item) {
      return;
    }

    // Check if the item is already in the cart
    const isProductInCart = cartItems.some((item) => item._id === productId);

    if (isProductInCart) {
      Swal.fire({
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      const itemWithQuantity = {...item, quantity: 1}; // Add quantity property with value 1
      addToCart(itemWithQuantity, 1); // Pass the item and quantity to the addToCart function
      showAddToCartConfirmation();
      removeFromWishlist(productId); // Remove the item from the wishlist after adding it to the cart
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

  return (
    <>
      <Header />
      <Menu />
      <main id='wishlist-main'>
        <div id='wishlist-container'>
          <h2 className='wishlist-title'>Wishlist</h2>

          {wishlistItems.length === 0 ? (
            <p className='wishlist-empty'>Your wishlist is empty.</p>
          ) : (
            <ul className='wishlist-items'>
              {wishlistProducts.map((product, index) => (
                <li key={product._id} className='wishlist-item'>
                  <div className='wishlist-details'>
                    <div className='wishlist-image-remove'>
                      <img
                        id='wishlist-item-image'
                        src={product.image}
                        alt='Product'
                      />
                    </div>
                    <div className='wishlist-info'>
                      <h3 className='wishlist-product-title'>
                        {product.title}
                      </h3>
                      <div className='wishlist-rating'>
                        <StarRating rating={product.rating} />
                      </div>
                      <div className='wishlist-prices'>
                        {product.discountPercentage &&
                        product.discountPercentage > 0 ? (
                          <>
                            <span className='wishlist-original-price'>
                              ${product.price}
                            </span>
                            <span className='wishlist-discount-price'>
                              $
                              {calculateDiscountedPrice(
                                  product.price,
                                  product.discountPercentage,
                              )}
                            </span>
                          </>
                        ) : (
                          <span className='wishlist-price'>
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className='wishlist-remove-button'
                    onClick={() => handleRemoveItem(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span className='wishlist-remove-text'>Remove</span>
                  </button>
                  <Button
                    className='wishlist-add-to-cart-button'
                    onClick={() => handleAddToCart(product._id)}
                    buttonText='+ Add to Cart'
                  />
                </li>
              ))}
            </ul>
          )}

          <p className='wishlist-item-count'>
            Number of items in wishlist:{' '}
            <span id='wishlist-item-count'>
              {wishlistItems.length}{' '}
              {wishlistItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Wishlist;
