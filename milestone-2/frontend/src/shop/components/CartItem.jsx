import React, { useState } from 'react'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartItem = ({ item, handleQuantityChange, removeItem }) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleChange = event => {
    const newQuantity = parseInt(event.target.value)
    setQuantity(newQuantity)
    handleQuantityChange(item.id, newQuantity) // Call the callback function with the updated values
  }

  return (
    <div className='cart-item'>
      <img
        src={item.productImage}
        alt='cart item product'
        className='cart-image'
      />
      <div className='cart-details'>
        <h3>{item.productTitle}</h3>
        <p>{item.productDescription}</p>
        <div className='cart-actions'>
          <div>
            <label htmlFor='quantity'>Quantity:</label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              min='1'
              max='10'
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <div className='cart-remove'>
            <button type='button' onClick={() => removeItem(item.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
      <div className='cart-price'>
        <h3>${(item.productPrice * quantity).toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default CartItem
