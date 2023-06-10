import React, {useContext, useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CartItem from './CartItem';
import './CartSection.style.css';
import {CartContext} from '../contexts/Cart';

const CartSection = () => {
  const {cartItems, updateCartQuantity, removeFromCart} = useContext(CartContext);

  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0,
    );
  }, [cartItems]);

  const totalPrice = calculateTotalPrice();

  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  useEffect(() => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    updateCartQuantity('', totalQuantity);
  }, [cartItems, updateCartQuantity]);

  return (
    <section className="cart-section">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          handleQuantityChange={handleQuantityChange}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h1>Cart is Empty</h1>
          <Link to="/">
            <button className="pintastic-button" type="button">
              Go to Store
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="cart-total">
            <h2>Total:</h2>
            <h2>${totalPrice.toFixed(2)}</h2>
          </div>
          <div className="cart-actions">
            <Link to="/">
              <button className="pintastic-button" type="button">
                Continue Shopping
              </button>
            </Link>
            <Link to="/checkout">
              <button className="pintastic-button" type="button">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSection;
