import React from 'react'
import './Cart.style.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartSection from '../components/CartSection'

const Cart = () => {
  return (
    <>
      <Header />

      <main>
        <CartSection />
      </main>

      <Footer />
    </>
  )
}

export default Cart
