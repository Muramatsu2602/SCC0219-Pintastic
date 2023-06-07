import React from 'react';
import './Checkout.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
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
          <section id='checkout-billing-info' className='checkout-payee-info-section-card'>
            <h2>Basic Information</h2>

            <div className='checkout-input-group'>
              <label htmlFor='name'>Name, Surname</label>
              <input type='text' id='name' />
            </div>
            <div className='checkout-input-group'>
              <label htmlFor='email'>Email, Telephone Number</label>
              <input type='email' id='email' />
            </div>
            <div className='checkout-input-group'>
              <label htmlFor='address'>Address, City</label>
              <input type='text' id='address' />
            </div>
            <div className='checkout-input-group'>
              <label htmlFor='state'>State, CEP</label>
              <input type='text' id='state' />
            </div>
          </section>
          <section id='checkout-delivery-method' className='checkout-payee-info-section-card'>
            <h2>Delivery Method</h2>

            <div className='checkout-input-group'>
              <input type='radio' id='sedex' name='delivery' value='sedex' />
              <label htmlFor='sedex'>SEDEX</label>
            </div>
            <div className='checkout-input-group'>
              <input type='radio' id='dhl' name='delivery' value='dhl' />
              <label htmlFor='dhl'>DHL</label>
            </div>
          </section>
          <section id='checkout-payment-method' className='checkout-payee-info-section-card'>
            <h2>Payment Method</h2>

            <div className='checkout-input-group'>
              <input
                type='radio'
                id='credit-card'
                name='payment'
                value='credit-card'
              />
              <label htmlFor='credit-card'>Credit Card</label>
              <div className='credit-card-details'>
                <input type='text' id='card-number' placeholder='Card Number' />
                <input type='text' id='full-name' placeholder='Full Name' />
                <input
                  type='text'
                  id='expiration-date'
                  placeholder='Expiration Date'
                />
                <input
                  type='text'
                  id='security-number'
                  placeholder='Security Number'
                />
              </div>
            </div>
            <div className='checkout-input-group'>
              <input type='radio' id='pix' name='payment' value='pix' />
              <label htmlFor='pix'>PIX</label>
            </div>
            <div className='checkout-input-group'>
              <input type='radio' id='boleto' name='payment' value='boleto' />
              <label htmlFor='boleto'>Boleto</label>
            </div>
          </section>
          <section id='checkout-additional-info' className='checkout-payee-info-section-card'>
            <h2>Additional Information</h2>
            <div className='checkout-input-group'>
              <label htmlFor='observations'>Observations</label>
              <textarea id='observations' />
            </div>
          </section>
          <section id='checkout-confirmation' className='checkout-payee-info-section-card'>
            <h2>Confirmation</h2>

            <div className='checkout-input-group'>
              <input type='checkbox' id='newsletter' name='newsletter' />
              <label htmlFor='newsletter'>
                I agree to receive weekly newsletters from pintastic
              </label>
            </div>
            <div className='checkout-input-group'>
              <input
                type='checkbox'
                id='privacy-policy'
                name='privacy-policy'
              />
              <label htmlFor='privacy-policy'>
                I agree with the terms and conditions of the privacy policy
              </label>
            </div>
            <div className='checkout-input-group'>
              <Button buttonText='Complete Purchase' />
            </div>
          </section>
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
