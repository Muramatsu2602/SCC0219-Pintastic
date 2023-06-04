import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import './CartSection.style.css'

const CartSection = ({ items }) => {
  const [cartItems, setCartItems] = useState(items)

  // Calculate the total price of items in the cart
  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    )
  }, [cartItems])

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice())

  // Update the total price whenever cartItems changes
  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [calculateTotalPrice, cartItems])

  // Function to handle quantity changes for an item
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Function to remove an item from the cart
  const removeItem = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [calculateTotalPrice, cartItems])

  return (
    <section className='cart-section'>
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          handleQuantityChange={handleQuantityChange}
          removeItem={removeItem}
        />
      ))}
      {cartItems.length === 0 ? (
        <div className='cart-empty'>
          <h1>Cart is Empty</h1>
          <p>Start shopping now!</p>
          <Link to='/'>
            <button className='pintastic-button' type='button'>
              Go to Store
            </button>
          </Link>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </section>
  )
}

export default CartSection
