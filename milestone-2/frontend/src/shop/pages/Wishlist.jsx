import React, {useContext} from 'react';
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

const Wishlist = () => {
  const {wishlistItems, removeFromWishlist} = useContext(WishlistContext);
  const {cartItems, addToCart} = useContext(CartContext);

  const handleRemoveItem = (itemId) => {
    removeFromWishlist(itemId);
  };

  const handleAddToCart = (productId) => {
    const item = wishlistItems.find((item) => item.productId === productId);

    if (!item) {
      return;
    }

    const isProductInCart = cartItems.some(
        (item) => item.productId === productId,
    );

    if (isProductInCart) {
      Swal.fire({
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      addToCart(item);
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
        // Redirect to cart
      }
    });
  };

  return (
    <>
      <Header />
      <Menu />
      <main id="wishlist-main">
        <div id="wishlist-container">
          <h2 className="wishlist-title">Wishlist</h2>

          {wishlistItems.length === 0 ? (
            <p className="wishlist-empty">Your wishlist is empty.</p>
          ) : (
            <ul className="wishlist-items">
              {wishlistItems.map((item) => (
                <li key={item.productId} className="wishlist-item">
                  <div className="wishlist-details">
                    <div className="wishlist-image-remove">
                      <img
                        id="wishlist-item-image"
                        src={item.productImage}
                        alt="Product"
                      />
                    </div>
                    <div className="wishlist-info">
                      <h3 className="wishlist-product-title">
                        {item.productTitle}
                      </h3>
                      <div className="wishlist-rating">
                        <StarRating rating={item.productRating} />
                      </div>
                      <div className="wishlist-prices">
                        {item.productDiscountPercentage === 0 ? (
                          <span className="wishlist-price">
                            ${item.productPrice}
                          </span>
                        ) : (
                          <>
                            <span className="wishlist-original-price">
                              ${item.productPrice}
                            </span>
                            <span className="wishlist-discount-price">
                              ${calculateDiscountedPrice(
                                  item.productPrice,
                                  item.productDiscountPercentage,
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="wishlist-remove-button"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span className="wishlist-remove-text">Remover</span>
                  </button>
                  <Button
                    className="wishlist-add-to-cart-button"
                    onClick={() => handleAddToCart(item.productId)}
                    buttonText="+ Add to Cart"
                  />
                </li>
              ))}
            </ul>
          )}

          <p className="wishlist-item-count">
            Number of items in wishlist:{' '}
            <span id="wishlist-item-count">
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
