import './CartSection.style.css'
import React from "react";

const CartSection = () => {
  return (
    <section className="cart-section">
      <h2>Shopping Cart</h2>
      <CartItem />
      <CartItem />
      <div className="cart-total">
        <h2>Total:</h2>
        <h2>$79.98</h2>
      </div>
      <div className="cart-actions">
        <button className="pintastic-button" type="button">
          Continue Shopping
        </button>
        <button className="pintastic-button" type="button">
          Checkout
        </button>
      </div>
    </section>
  );
};

const CartItem = () => {
  return (
    <div className="cart-item">
      <img
        src="../mockups/figma/img-pins/pin-cafezinho.webp"
        alt="Product Image"
        className="cart-image"
      />
      <div className="cart-details">
        <h3>Product Title</h3>
        <p>Product Description</p>
        <div className="cart-actions">
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              max="10"
              value="1"
            />
          </div>
          <div className="cart-remove">
            <button type="button">
              <i className="fas fa-trash-alt"></i> Remove
            </button>
          </div>
        </div>
      </div>
      <div className="cart-price">
        <h3>$49.99</h3>
      </div>
    </div>
  );
};

export default CartSection;
