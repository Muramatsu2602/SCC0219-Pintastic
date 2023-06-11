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
import {useNavigate} from 'react-router-dom';
import {calculateDiscountedPrice} from './utils/calculateDiscountedPrice';
import productsData from './mock/products.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import {WishlistContext} from '../contexts/Wishlist';

const ProductDetails = () => {
  const {signed} = useAuth();
  const {productId} = useParams();
  const {addToWishlist, removeFromWishlist, wishlistItems} = useContext(WishlistContext);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const productInWishlist = wishlistItems.some((item) => item.productId === parseInt(productId));
    setIsOnWishlist(productInWishlist);
  }, [wishlistItems, productId]);

  const handleWishlistToggle = () => {
    const product = productsData.find((product) => product.productId === parseInt(productId));

    if (isOnWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }

    setIsOnWishlist(!isOnWishlist);
  };
  const heartIcon = isOnWishlist ? faHeartSolid : faHeartRegular;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    // Logic to add the product to the cart
  };

  // Get the selected product
  const selectedProduct = productsData.find(
      (product) => product.productId === parseInt(productId),
  );

  // Use placeholder image if the product image is not available
  const placeholderImage =
    'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081';

  const productImageUrl = selectedProduct.productImage || placeholderImage;

  if (!selectedProduct) {
    // Handle the case when the product with the specified ID is not found
    return (
      <>
        <Header quantity={quantity} />
        <Menu />
        <main id="product-details-main">
          <div className="product-not-found-message">Product not found.</div>
        </main>
        <Footer />
      </>
    );
  }

  // Get related products
  const relatedProducts = productsData
      .filter((product) => product.productId !== productId)
      .slice(0, 3);

  return (
    <>
      <Header quantity={quantity} />
      <Menu />
      <main id="product-details-main">
        <section className="product-details-container">
          <div className="product-details-image">
            <img src={productImageUrl} alt="Product Image" />
          </div>
          <div className="product-details-info">
            <h2 className="product-details-title">
              {selectedProduct.productTitle}
            </h2>
            <div className="product-details-rating">
              <StarRating rating={selectedProduct.productRating} />
            </div>
            <p className="product-details-description">
              {selectedProduct.productDescription}
            </p>
            <div className="product-details-wishlist-icon-container">
              {signed ? (
                <div
                  className="product-details-wishlist-icon"
                  onClick={handleWishlistToggle}
                >
                  <FontAwesomeIcon icon={heartIcon} />
                  <span>Add to Wishlist</span>
                </div>
              ) : null}
            </div>
            <div className="product-details-price">
              <div className="product-details-prices-container">
                {selectedProduct.productDiscountPercentage == 0 ? (
                  <span className="product-details-no-discount">
                    ${selectedProduct.productPrice}
                  </span>
                ) : (
                  <span className="product-details-original-price">
                    ${selectedProduct.productPrice}
                  </span>
                )}

                {selectedProduct.productDiscountPercentage > 0 ? (
                  <div className="product-details-discount">
                    <span className="product-details-discounted-price">
                      ${calculateDiscountedPrice(
                          selectedProduct.productPrice,
                          selectedProduct.productDiscountPercentage,
                      )}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="">
                <span className="product-details-quantity-label">
                  Quantity:
                </span>
                <input
                  className="product-details-input"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </div>

            <div className="product-details-button-container">
              <Button
                className="product-details-add-to-cart-button"
                onClick={handleAddToCart}
                buttonText="Add to Cart"
              />
            </div>
          </div>
        </section>

        <section className="related-products-container">
          <div className="related-products-upper">
            <h3 className="related-products-title">Related Products</h3>
            <Button
              className="product-details-other-products-button abs"
              onClick={() => {
                navigate('/catalog/');
              }}
              buttonText="Other Products"
            />
          </div>

          <div className="related-products-carousel">
            {relatedProducts.map((product, index) => (
              <Card
                key={index}
                productId={product.productId}
                productPrice={product.productPrice}
                productTitle={product.productTitle}
                productDescription={product.productDescription}
                productDiscountPercentage={product.productDiscountPercentage}
                productImage={product.productImage}
                productRating={product.productRating}
                productCategory={product.productCategory}
                isOnWishlist={wishlistItems.some(
                    (item) => item.productId === product.productId,
                )}
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
