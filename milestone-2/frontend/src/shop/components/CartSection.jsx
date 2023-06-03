import './CartSection.style.css'
import React from 'react'
import { Link } from 'react-router-dom'

const CartSection = () => {
  // Mock data for cart items
  const cartItems = [
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
  ]

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  )

  return (
    <section className='cart-section'>
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
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
    </section>
  )
}

const CartItem = ({ item }) => {
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
              value={item.quantity}
            />
          </div>
          <div className='cart-remove'>
            <button type='button'>
              <i className='fas fa-trash-alt'></i> Remove
            </button>
          </div>
        </div>
      </div>
      <div className='cart-price'>
        <h3>${item.productPrice.toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default CartSection
