import React, { useState } from 'react';
import './Cart.style.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartSection from '../components/CartSection'

const Cart = () => {
  // Mock data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productTitle: 'Product Title 1',
      productDescription: 'Product Description 1',
      productPrice: 49.99,
      productImage:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_cafezinho_73_5_86434fddbfff039553cd7f504cc08641.jpg',
      quantity: 1
    },
    {
      id: 2,
      productTitle: 'Product Title 2',
      productDescription: 'Product Description 2',
      productPrice: 44.99,
      productImage:
        'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_cafezinho_73_5_86434fddbfff039553cd7f504cc08641.jpg',
      quantity: 3
    }
    // Add more mock data items as needed
  ])

  return (
    <>
      <Header quantity={cartItems.length} />

      <main>
        <CartSection items={cartItems} />
      </main>

      <Footer />
    </>
  )
}

export default Cart
