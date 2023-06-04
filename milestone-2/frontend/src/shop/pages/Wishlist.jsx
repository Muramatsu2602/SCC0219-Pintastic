import React, { useState } from 'react'
import './Wishlist.style.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

const Wishlist = () => {
  // Mock data for wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      productTitle: 'Product Title 1',
      stars: 4,
      price: 39.99,
      discountPrice: 29.99
    },
    {
      id: 2,
      productTitle: 'Product Title 2',
      stars: 3,
      price: 24.99,
      discountPrice: 19.99
    }
    // Add more wishlist items as needed
  ])

  // Mock data for cart items
  const [cartItems, setCartItems] = useState([])

  const handleRemoveItem = itemId => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const handleAddToCart = itemId => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId))
    setCartItems(prevItems => [
      ...prevItems,
      wishlistItems.find(item => item.id === itemId)
    ])
  }

  return (
    <>
      <Header quantity={wishlistItems.length} />

      <main>
        <div id='wishlist-container'>
          <h2 className='wishlist-title'>Wishlist</h2>

          {wishlistItems.length === 0 ? (
            <p className='wishlist-empty'>Your wishlist is empty.</p>
          ) : (
            <ul className='wishlist-items'>
              {wishlistItems.map(item => (
                <li key={item.id} className='wishlist-item'>
                  <div className='wishlist-details'>
                    <h3 className='wishlist-product-title'>
                      {item.productTitle}
                    </h3>
                    <div className='wishlist-rating'>
                      <span className='wishlist-stars'>{item.stars} stars</span>
                      <button
                        className='wishlist-remove-button'
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <i className='fas fa-heart'></i>
                      </button>
                    </div>
                    <div className='wishlist-prices'>
                      <span className='wishlist-price'>${item.price}</span>
                      <span className='wishlist-discount-price'>
                        ${item.discountPrice}
                      </span>
                    </div>
                  </div>
                  <Button
                    className='wishlist-add-to-cart-button'
                    onClick={() => handleAddToCart(item.id)}
                    buttonText={"+ Add to Cart"}
                  />
                </li>
              ))}
            </ul>
          )}

          <p className='wishlist-item-count'>
            Number of items in wishlist: {wishlistItems.length}
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Wishlist
