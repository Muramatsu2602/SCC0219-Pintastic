import React, {useEffect, useState, useContext} from 'react';
import './PinOfTheDay.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import Confetti from 'react-confetti';
import Menu from '../components/Nav';
import {useNavigate} from 'react-router-dom';
import {calculateDiscountedPrice} from './utils/calculateDiscountedPrice';
import {specialDiscountPercentage} from './utils/specialDiscountPercentage';
import {WishlistContext} from '../contexts/Wishlist';
import {CartContext} from '../contexts/Cart';
import Swal from 'sweetalert2';

const PinOfTheDay = () => {
  const {wishlistItems} = useContext(WishlistContext);
  const {cartItems, addToCart} = useContext(CartContext);
  const [pinOfTheDay, setPinOfTheDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (wishlistItems.length < 5) {
      return;
    }

    // choosing a ramdom product from wishlist to be the pin of the day
    const randomIndex = Math.floor(Math.random() * wishlistItems.length);
    const randomProduct = wishlistItems[randomIndex];

    // set new price given it is the pin of the day
    randomProduct.productDiscountPercentage+=5;

    setPinOfTheDay(randomProduct);
  }, [wishlistItems]);

  // what will be shown on screen if number of items on wishlist < 5
  if (!pinOfTheDay) {
    return (
      <>
        <Header quantity={7} />
        <Menu />
        <main id='pinoftheday-main'>
          <div className='pinoftheday-container'>
            <h2 className='pinoftheday-title'>Pin of The Day 😎</h2>
            {wishlistItems.length < 5 ? (
              <p className='pinoftheday-message'>
                Add at least 5 items to your wishlist to unlock the Pin of The
                Day functionality!
              </p>
            ) : (
              <p className='pinoftheday-message'>Loading...</p>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const totalDiscountPercentage =
    specialDiscountPercentage + pinOfTheDay.productDiscountPercentage;
  const totalDiscountPrice = calculateDiscountedPrice(
      pinOfTheDay.productPrice,
      totalDiscountPercentage,
  );

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some((item) => item.productId === pinOfTheDay.productId);

    const product = {
      productId: pinOfTheDay.productId,
      productPrice: pinOfTheDay.productPrice,
      productTitle: pinOfTheDay.productTitle,
      productDescription: pinOfTheDay.productDescription,
      productDiscountPercentage: pinOfTheDay.productDiscountPercentage,
      productImage: pinOfTheDay.productImage,
      productCategory: pinOfTheDay.productCategory,
      quantity: 1,
      productStock: pinOfTheDay.productStock,
    };


    if (isProductInCart) {
      Swal.fire({
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      addToCart(product);
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

  return (
    <>
      <Header />
      <Menu />
      <main id='pinoftheday-main'>
        <div className='pinoftheday-container'>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            run={2}
          />

          <h2 className='pinoftheday-title'>Pin of The Day 😎</h2>
          <h3>An additional 5% discount to a pin on your wishlist</h3>
          <div className='pinoftheday-details'>
            <div className='pinoftheday-image'>
              <img src={pinOfTheDay.productImage} alt='Pin of The Day' />
            </div>
            <div className='pinoftheday-info'>
              <h3 className='pinoftheday-product-title'>
                {pinOfTheDay.productTitle}
              </h3>
              <div className='pinoftheday-rating'>
                <StarRating rating={pinOfTheDay.productRating} />
              </div>
              <div className='pinoftheday-description'>
                {pinOfTheDay.productDescription}
              </div>
              <div className='pinoftheday-price'>
                <span className='pinoftheday-discount'>
                  Special Discount of {totalDiscountPercentage}% !
                </span>
                <span className='pinoftheday-original-price'>
                  ${pinOfTheDay.productPrice.toFixed(2)}
                </span>
                <span className='pinoftheday-sale-price'>
                  ${totalDiscountPrice}
                </span>
                <div className='pinoftheday-addcart-button'>
                  <Button
                    buttonText='Add to Cart'
                    onClick={() => handleAddToCart()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PinOfTheDay;
