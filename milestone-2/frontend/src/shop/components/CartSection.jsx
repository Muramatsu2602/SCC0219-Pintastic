import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CartSection.style.css'
import CartItem from './CartItem'

const CartSection = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productTitle: 'Product Title 1',
      productDescription: 'Product Description 1',
      productPrice: 49.99,
      productImage:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_lucky_cat_maneki_neko_197_1_07960d5742c61ad68411c3c3d3ff4d72.jpg',
      quantity: 1
    },
    {
      id: 2,
      productTitle: 'Product Title 2',
      productDescription: 'Product Description 2',
      productPrice: 29.99,
      productImage:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_lucky_cat_maneki_neko_197_1_07960d5742c61ad68411c3c3d3ff4d72.jpg',
      quantity: 2
    },
    {
      id: 3,
      productTitle: 'Product Title 2',
      productDescription: 'Product Description 2',
      productPrice: 29.99,
      productImage:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_lucky_cat_maneki_neko_197_1_07960d5742c61ad68411c3c3d3ff4d72.jpg',
      quantity: 2
    }
    // Add more mock data items as needed
  ])

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  )

  // Remove an item from the cart
  const removeItem = itemId => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCartItems)
  }

  // Check if the cart is empty
  const isCartEmpty = cartItems.length === 0

  return (
    <section className='cart-section'>
      <h2>Shopping Cart</h2>
      {isCartEmpty ? (
        <div className='cart-empty'>
          <h1>Your cart is empty</h1>
          <Link to='/'>
            <button className='pintastic-button' type='button'>
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} removeItem={removeItem} />
          ))}
          <div className='cart-total'>
            <h2>Total:</h2>
            <h2>${totalPrice.toFixed(2)}</h2>
          </div>
          <div className='cart-actions'>
            <Link to='/'>
              <button className='pintastic-button' type='button'>
                Continue Shopping
              </button>
            </Link>

            <button className='pintastic-button' type='button'>
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default CartSection
