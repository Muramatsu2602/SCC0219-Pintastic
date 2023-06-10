import React, {useEffect, useState} from 'react';
import './PinOfTheDay.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import Confetti from 'react-confetti';
import Menu from '../components/Nav';
import {Link} from 'react-router-dom';
import productsData from './mock/products.json';
import {calculateDiscountedPrice} from './utils/calculateDiscountedPrice';
import {specialDiscountPercentage} from './utils/specialDiscountPercentage';

const PinOfTheDay = () => {
  const [pinOfTheDay, setPinOfTheDay] = useState(null);

  useEffect(() => {
    // Select a random product from the products array
    const randomIndex = Math.floor(Math.random() * productsData.length);
    const randomProduct = productsData[randomIndex];
    setPinOfTheDay(randomProduct);
  }, []);

  if (!pinOfTheDay) {
    return null; // Render null or a loading spinner while waiting for the random product
  }

  const {
    productTitle,
    productDescription,
    productPrice,
    productDiscountPercentage,
    productImage,
    productRating,
  } = pinOfTheDay;

  return (
    <>
      <Header quantity={7} />
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
              <img src={productImage} alt='Pin of The Day' />
            </div>
            <div className='pinoftheday-info'>
              <h3 className='pinoftheday-product-title'>{productTitle}</h3>
              <div className='pinoftheday-rating'>
                <StarRating rating={productRating} />
              </div>
              <div className='pinoftheday-description'>
                {productDescription}
              </div>
              <div className='pinoftheday-price'>
                <span className='pinoftheday-discount'>Special Discount! </span>
                <span className='pinoftheday-original-price'>
                  ${productPrice}
                </span>
                <span className='pinoftheday-sale-price'>
                  $
                  {calculateDiscountedPrice(
                      productPrice,
                      (productDiscountPercentage+specialDiscountPercentage),
                  )}
                </span>
                <div className='pinoftheday-addcart-button'>
                  {' '}
                  <Link to='/cart'>
                    <Button buttonText='Go To Cart !' />
                  </Link>
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
