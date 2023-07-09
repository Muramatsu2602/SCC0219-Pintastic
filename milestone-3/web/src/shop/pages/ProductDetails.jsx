import React, {useState, useContext, useEffect} from 'react';
import './ProductDetails.style.css';
import {useParams} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import Menu from '../components/Nav';
import Card from '../components/Card';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {calculateDiscountedPrice} from './utils/calculateDiscountedPrice';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import {WishlistContext} from '../contexts/Wishlist';
import {CartContext} from '../contexts/Cart';
import api from '../../services/api';

const ProductDetails = () => {
  const {cartItems, addToCart} = useContext(CartContext);
  const {signed} = useAuth();
  const {productId} = useParams();
  const {addToWishlist, removeFromWishlist, wishlistItems} = useContext(WishlistContext);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const heartIcon = isOnWishlist ? faHeartSolid : faHeartRegular;
  const [quantity, setQuantity] = useState(1);
  // Use placeholder image if the product image is not available
  const placeholderImage =
    'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081';
  const productImageUrl = selectedProduct?.image || placeholderImage;

  useEffect(() => {
    const productInWishlist = wishlistItems.some((item) => item._id === parseInt(productId));
    setIsOnWishlist(productInWishlist);
  }, [wishlistItems, productId]);

  const handleWishlistToggle = () => {
    if (isOnWishlist) {
      removeFromWishlist(productId);
      setIsOnWishlist(false);
    } else {
      addToWishlist(productId);
      setIsOnWishlist(true);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleAddToCart = () => {
    if (selectedProduct.stock === 0) {
      Swal.fire({
        title: 'Out of Stock',
        text: 'This product is currently out of stock.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (quantity > selectedProduct.stock) {
      Swal.fire({
        title: 'Invalid Quantity',
        text: 'Please select a quantity within the available stock.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      // Check if the product already exists in the cart
      const isProductInCart = cartItems.some((item) => item._id === selectedProduct._id);

      if (isProductInCart) {
        Swal.fire({
          title: 'Product Already in Cart',
          text: 'This product is already in your cart.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        addToCart(selectedProduct, quantity);
        showAddToCartConfirmation();
      }
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

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await api.get('/products/active?limit=10');
        const products = response.data;
        setRelatedProducts(products);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };
    fetchRelatedProducts();
  }, []);

  // Here we extract the info from the API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        const product = response.data;
        setSelectedProduct(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!selectedProduct) {
    // Handle the case when the product with the specified ID is not found
    return (
      <>
        <Header quantity={quantity} />
        <Menu />
        <main id='product-details-main'>
          <div className='product-not-found-message'>Product not found.</div>
        </main>
        <Footer />
      </>
    );
  }

  // Get related products
  const relatedProductsWithoutSelectProduct = relatedProducts.filter((product) => product._id !== selectedProduct._id).slice(0, 3);

  return (
    <>
      <Header quantity={quantity} />
      <Menu />
      <main id='product-details-main'>
        <section className='product-details-container'>
          {/* Render the product details when selectedProduct is not null */}
          {selectedProduct && (
            <>
              <div className='product-details-image'>
                <img src={productImageUrl} alt='Product Image' />
              </div>
              <div className='product-details-info'>
                <h2 className='product-details-title'>
                  {selectedProduct.title}
                </h2>
                <div className='product-details-rating'>
                  <StarRating rating={selectedProduct.rating} />
                </div>
                <p className='product-details-description'>
                  {selectedProduct.description}
                </p>
                {signed && (
                  <div className='product-details-wishlist-icon-container'>
                    <div className='product-details-wishlist-icon' onClick={handleWishlistToggle}>
                      <FontAwesomeIcon icon={heartIcon} />
                      <span>Add to Wishlist</span>
                    </div>
                  </div>
                )}
                <div className='product-details-price'>
                  <div className='product-details-prices-container'>
                    {selectedProduct.discountPercentage === 0 ? (
                      <span className='product-details-no-discount'>
                        ${selectedProduct.price}
                      </span>
                    ) : (
                      <span className='product-details-original-price'>
                        ${selectedProduct.price}
                      </span>
                    )}
                    {selectedProduct.discountPercentage > 0 && (
                      <div className='product-details-discount'>
                        <span className='product-details-discounted-price'>
                          ${calculateDiscountedPrice(
                              selectedProduct.price,
                              selectedProduct.discountPercentage,
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  {selectedProduct.stock > 0 && (
                    <div className='product-details-quantity'>
                      <span className='product-details-quantity-label'>Quantity:</span>
                      <input
                        className='product-details-input'
                        type='number'
                        min='1'
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      <span className='product-details-stock'>Stock: {selectedProduct.stock}</span>
                    </div>
                  )}
                </div>

                {selectedProduct.stock > 0 && (
                  <div className='product-details-button-container'>
                    <Button
                      className='product-details-add-to-cart-button'
                      onClick={handleAddToCart}
                      buttonText='Add to Cart'
                    />
                  </div>
                )}

                {selectedProduct.stock === 0 && (
                  <div className='out-of-stock-message'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='out-of-stock-icon' />
                    <span className='out-of-stock-text'>Out of Stock</span>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        <section className='related-products-container'>
          <div className='related-products-upper'>
            <h3 className='related-products-title'>Related Products</h3>
            <Button
              className='product-details-other-products-button abs'
              onClick={() => {
                navigate('/catalog/');
              }}
              buttonText='Other Products'
            />
          </div>

          <div className='related-products-carousel'>
            {relatedProductsWithoutSelectProduct.map((product, index) => (
              <Card
                key={index}
                productId={product._id}
                productPrice={product.price}
                productTitle={product.title}
                productDescription={product.description}
                productDiscountPercentage={product.discountPercentage}
                productImage={product.image}
                productRating={product.rating}
                productCategory={product.category}
                productStock={product.stock}
                isOnWishlist={wishlistItems.some((item) => item._id === product._id)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
