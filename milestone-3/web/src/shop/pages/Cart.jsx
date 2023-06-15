import React from 'react';
import './Cart.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSection from '../components/CartSection';
import Menu from '../components/Nav';

const Cart = () => {
  return (
    <>
      <Header />
      <Menu />
      <main id="cart-main">
        <CartSection />
      </main>
      <Footer />
    </>
  );
};

export default Cart;
