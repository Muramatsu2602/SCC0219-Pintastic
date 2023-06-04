/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import './ProductDetails.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import Menu from '../components/Nav';
import Card from '../components/Card';

const ProductDetails = ({
  productPrice,
  productTitle,
  productDescription,
  productDiscountPercentage,
  productImage,
  productRating,
}) => {
  const [quantity, setQuantity] = useState(1);
  const {productId} = useParams();


  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    // Logic to add the product to the cart
  };

  return (
    <>
      <Header quantity={quantity} />
      <Menu />
      <main id='product-details-main'>
        <div className='product-details-container'>
          <div className='product-details-image'>
            <img src={productImage} alt='Product Image' />
          </div>
          <div className='product-details-info'>
            <h2 className='product-details-title'>{productTitle}</h2>
            <div className='product-details-rating'>
              <StarRating rating={productRating} />
            </div>
            <p className='product-details-description'>{productDescription}</p>
            <div className='product-details-specs'>
              <div>
                <strong>Height:</strong> 10cm
              </div>
              <div>
                <strong>Width:</strong> 20cm
              </div>
            </div>
            <div className='product-details-price'>
              <span className='product-details-quantity-label'>Quantity:</span>
              <input
                type='number'
                min='1'
                value={quantity}
                onChange={handleQuantityChange}
              />
              <span className='product-details-price-label'>{`$${productPrice}`}</span>
            </div>
            <Button
              className='product-details-add-to-cart-button'
              onClick={handleAddToCart}
              buttonText='Add to Cart'
            />
          </div>
        </div>

        <div className='related-products-container'>
          <h3 className='related-products-title'>Related Products</h3>
          <div className='related-products-carousel'>
            <Card
              productPrice={24.99}
              productTitle='Related Product 1'
              productDescription='Related product description 1'
              productDiscountPercentage={10}
              productImage='./assets/img/items/caramelo.png'
              productRating={4.0}
            />
            <Card
              productPrice={19.99}
              productTitle='Related Product 2'
              productDescription='Related product description 2'
              productDiscountPercentage={20}
              productImage='./assets/img/items/caramelo.png'
              productRating={4.5}
            />
            {/* Add more Card components as needed */}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;
