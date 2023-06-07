import React from 'react';
import './CartSection.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Nav';

const Checkout = ({}) => {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: 'Product 1',
      price: 9.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 14.99,
      quantity: 1,
    },
    // Add more items as needed
  ];

  // Calculate the total cost of the cart items
  const cartTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
  );

  return (
    <>
      <Header quantity={7} />
      <Menu />
      <main id='checkout-main'>
        <section id='checkout-payee-information'>
          {/* Payee information sections */}
        </section>
        <aside id='checkout-purchase-summary'>
          <div className='checkout-summary-item'>
            <h3>Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className='checkout-summary-item'>
            <h3>Promo Code</h3>
            <input type='text' placeholder='Enter promo code' />
          </div>
          <div className='checkout-summary-item'>
            <h3>Total</h3>
            <span>Subtotal: ${cartTotal.toFixed(2)}</span>
            <span>Delivery Tax: $5.00</span>
            <span>Final Cost: ${(cartTotal + 5).toFixed(2)}</span>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
