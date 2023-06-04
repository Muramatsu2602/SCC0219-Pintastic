import React, { useState } from 'react'
import './Wishlist.style.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import StarRating from '../components/StarRating'

const Wishlist = () => {
  // Mock data for wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      productTitle: 'Product Title 1',
      stars: 4.5,
      price: 39.99,
      discountPrice: 29.99,
      picture:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_machado_de_assis_191_4_20201210231655.jpg'
    },
    {
      id: 2,
      productTitle: 'Product Title 2',
      stars: 2.5,
      price: 24.99,
      discountPrice: 19.99,
      picture:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_vira_lata_caramelo_pipi_49_1_04dd5557995b5579f30d600218d8717f.jpg'
    },
    {
      id: 3,
      productTitle: 'Product Title 3',
      stars: 3.5,
      price: 49.99,
      discountPrice: 39.99,
      picture:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_vira_lata_caramelo_pipi_49_1_04dd5557995b5579f30d600218d8717f.jpg'
    },
    {
      id: 4,
      productTitle: 'Product Title 4',
      stars: 4.0,
      price: 19.99,
      discountPrice: 14.99,
      picture:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_vira_lata_caramelo_pipi_49_1_04dd5557995b5579f30d600218d8717f.jpg'
    }
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

      <main id='wishlist-main'>
        <div id='wishlist-container'>
          <h2 className='wishlist-title'>Wishlist</h2>

          {wishlistItems.length === 0 ? (
            <p className='wishlist-empty'>Your wishlist is empty.</p>
          ) : (
            <ul className='wishlist-items'>
              {wishlistItems.map(item => (
                <li key={item.id} className='wishlist-item'>
                  <div className='wishlist-details'>
                    <div className='wishlist-image-remove'>
                      <img
                        id='wishlist-item-image'
                        src={item.picture}
                        alt='Product'
                      />
                    </div>
                    <div className='wishlist-info'>
                      <h3 className='wishlist-product-title'>
                        {item.productTitle}
                      </h3>
                      <div className='wishlist-rating'>
                        <StarRating rating={item.stars} />
                      </div>
                      <div className='wishlist-prices'>
                        <span className='wishlist-price'>${item.price}</span>
                        <span className='wishlist-discount-price'>
                          ${item.discountPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className='wishlist-remove-button'
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> 
                    <span className='wishlist-remove-text'> Remover</span>
                  </button>
                  <Button
                    className='wishlist-add-to-cart-button'
                    onClick={() => handleAddToCart(item.id)}
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
  )
}

export default Wishlist
