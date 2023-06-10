import React, {useContext} from 'react';
import './Cart.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSection from '../components/CartSection';
import Menu from '../components/Nav';
import {CartContext} from '../contexts/Cart';

const Cart = () => {
  const {cartItems, updateCartQuantity} = useContext(CartContext);

  return (
    <>
      <Header quantity={cartItems.length} />
      <Menu />

      <main id='cart-main'>
        <CartSection items={cartItems} updateCartQuantity={updateCartQuantity} />
      </main>

      <Footer />
    </>
  );
};

export default Cart;
