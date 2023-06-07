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
import {useNavigate} from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice.toFixed(2);
  }

  const handleAddToCart = () => {
    // Logic to add the product to the cart
  };

  // Use placeholder image if the product image is not available
  const placeholderImage =
    'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081';
  const productImageUrl = placeholderImage;

  return (
    <>
      <Header quantity={quantity} />
      <Menu />
      <main id='product-details-main'>
        <section className='product-details-container'>
          {' '}
          <div className='product-details-image'>
            <img src={productImageUrl} alt='Product Image' />
          </div>
          <div className='product-details-info'>
            <h2 className='product-details-title'>{productTitle}</h2>
            <div className='product-details-rating'>
              <StarRating rating={productRating} />
            </div>
            <p className='product-details-description'>{productDescription}</p>
            <div className='product-details-specs'>
              {/* <div>
                <strong>Height:</strong> 10cm
              </div>
              <div>
                <strong>Width:</strong> 20cm
              </div> */}
            </div>
            <div className='product-details-price'>
              <div className='product-details-prices-container'>
                <span className='product-details-original-price'>{`$${productPrice}`}</span>
                {productDiscountPercentage && (
                  <div className='product-details-discount'>
                    <span className='product-details-discounted-price'>{`$${calculateDiscountedPrice(
                        productPrice,
                        productDiscountPercentage,
                    )}`}</span>
                  </div>
                )}
              </div>
              <div className=''>
                <span className='product-details-quantity-label'>
                  Quantity:
                </span>
                <input
                  className='product-details-input'
                  type='number'
                  min='1'
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </div>

            <div className='product-details-button-container'>
              {' '}
              <Button
                className='product-details-add-to-cart-button'
                onClick={handleAddToCart}
                buttonText='Add to Cart'
              />
            </div>
          </div>
        </section>

        <section className='related-products-container'>
          <div className='related-products-upper'>
            <h3 className='related-products-title'>Related Products</h3>
            <Button
              className='product-details-other-products-button abs'
              onClick={() => {
                navigate('/catalog/metal');
              }}
              buttonText='Other Products'
            />{' '}
          </div>

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
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;
