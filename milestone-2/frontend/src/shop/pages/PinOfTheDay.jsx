import React from 'react';
import './PinOfTheDay.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import Confetti from 'react-confetti';
import Menu from '../components/Nav';
import {Link} from 'react-router-dom';

const PinOfTheDay = ({
  productPrice,
  productTitle,
  productDescription,
  productDiscountPercentage,
  productImage,
  productRating,
}) => {
  return (
    <>
      <Header quantity={7} />
      <Menu />
      <main id='pinoftheday-main'>
        <div className='pinoftheday-container'>
          <Confetti width={1000} height={1000} />

          <h2 className='pinoftheday-title'>Pin of The Day</h2>
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
                <span className='pinoftheday-discount'>Special Discount!</span>
                <span className='pinoftheday-original-price'>
                  ${productPrice}
                </span>
                <span className='pinoftheday-sale-price'>
                  ${productDiscountPercentage}
                </span>

                <Link to='/cart'>
                  <Button buttonText='Go To Cart !' />
                </Link>
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
