import React, {useState, useContext} from 'react';
import './Checkout.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Menu from '../components/Nav';
import {useAuth} from '../contexts/Auth';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {CartContext} from '../contexts/Cart';

const Checkout = () => {
  const navigate = useNavigate();
  const {cartItems, clearCart} = useContext(CartContext);
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const {signed} = useAuth();

  // State for form fields
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    delivery: 'sedex', // Set default value for delivery method
    payment: 'credit-card', // Set default value for payment method
    cardNumber: '',
    fullName: '',
    expirationDate: '',
    securityNumber: '',
    observations: '',
    newsletter: false,
    privacyPolicy: false,
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const {id, value, type, checked} = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === 'checkbox' ? checked : value,
    }));

    // Reset individual error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const submitCheckout = (e) => {
    e.preventDefault();

    // Validate form fields

    // Display confirmation modal
    Swal.fire({
      title: 'Confirm Checkout',
      text: 'Are you sure you want to proceed with the checkout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
            'Checkout Confirmed',
            'Your order has been placed successfully!',
            'success',
        );

        // Form is valid and user confirmed the checkout
        // Submit the form or perform any necessary actions
        // For example, you can redirect to a thank you page
        navigate('/catalog/');
        clearCart(); // Clear the cart after checkout
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate form
    const newErrors = {};

    // Add validation checks here
    if (!form.name) {
      newErrors.name = 'Name is required';
    }

    if (!form.surname) {
      newErrors.surname = 'Surname is required';
    }

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!form.telephone) {
      newErrors.telephone = 'Telephone is required';
    } else if (!/^\d{10,15}$/.test(form.telephone)) {
      newErrors.telephone = 'Telephone is invalid';
    }

    if (!form.address) {
      newErrors.address = 'Address is required';
    }

    if (!form.city) {
      newErrors.city = 'City is required';
    }

    if (!form.state) {
      newErrors.state = 'State is required';
    }

    if (!form.cep) {
      newErrors.cep = 'CEP is required';
    } else if (!/^\d{5}-\d{3}$/.test(form.cep)) {
      newErrors.cep = 'CEP is invalid';
    }

    if (!form.delivery) {
      newErrors.delivery = 'Delivery method is required';
    }

    if (!form.payment) {
      newErrors.payment = 'Payment method is required';
    }

    if (form.payment === 'credit-card') {
      // Additional validation for credit card fields
      if (!form.cardNumber) {
        newErrors.cardNumber = 'Card Number is required';
      }

      if (!form.fullName) {
        newErrors.fullName = 'Full Name is required';
      }

      if (!form.expirationDate) {
        newErrors.expirationDate = 'Expiration Date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(form.expirationDate)) {
        newErrors.expirationDate = 'Invalid Expiration Date format (MM/YY)';
      }

      if (!form.securityNumber) {
        newErrors.securityNumber = 'Security Number is required';
      } else if (!/^\d{3,4}$/.test(form.securityNumber)) {
        newErrors.securityNumber = 'Invalid Security Number';
      }
    } else {
      // Reset credit card errors when payment method is not credit card
      delete newErrors.cardNumber;
      delete newErrors.fullName;
      delete newErrors.expirationDate;
      delete newErrors.securityNumber;
    }

    if (!form.newsletter) {
      newErrors.newsletter = 'You must subscribe to our newsletter';
    }

    if (!form.privacyPolicy) {
      newErrors.privacyPolicy = 'You must accept the privacy policy';
    }

    if (
      Object.keys(newErrors).length === 0 ||
      (signed && Object.keys(newErrors).length === 8)
    ) {
      // Form is valid
      // Call the submitCheckout function to display the confirmation modal
      submitCheckout(e);
    } else {
      // Form has errors, update the errors state
      setErrors(newErrors);
    }
  };

  const cartTotal = cartItems.reduce(
      (total, item) => {
        console.log(item.productPrice, item.quantity); // Print the values of ProductPrice and quantity for each item
        return total + item.productPrice * item.quantity;
      },
      0,
  );


  return (
    <form onSubmit={handleSubmit}>
      <Header quantity={quantity} />
      <Menu />
      <main id='checkout-main'>
        <section id='checkout-payee-information'>
          {/* Basic Information  */}
          {!signed ? (
            <section
              id='checkout-billing-info'
              className='checkout-payee-info-section-card'
            >
              <h2>Basic Information</h2>
              <div className='checkout-input-grid'>
                <div className='checkout-input-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    id='name'
                    value={form.name}
                    onChange={handleInputChange}
                    className={`${errors.name ? 'invalid-input' : ''}`}
                  />
                  {errors.name && (
                    <div className='error-message'>{errors.name}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='surname'>Surname</label>
                  <input
                    type='text'
                    id='surname'
                    value={form.surname}
                    onChange={handleInputChange}
                    className={`${errors.surname ? 'invalid-input' : ''}`}
                  />
                  {errors.surname && (
                    <div className='error-message'>{errors.surname}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    value={form.email}
                    onChange={handleInputChange}
                    className={`${errors.email ? 'invalid-input' : ''}`}
                  />
                  {errors.email && (
                    <div className='error-message'>{errors.email}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='telephone'>Telephone</label>
                  <input
                    type='text'
                    id='telephone'
                    value={form.telephone}
                    onChange={handleInputChange}
                    className={`${errors.telephone ? 'invalid-input' : ''}`}
                  />
                  {errors.telephone && (
                    <div className='error-message'>{errors.telephone}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    id='address'
                    value={form.address}
                    onChange={handleInputChange}
                    className={`${errors.address ? 'invalid-input' : ''}`}
                  />
                  {errors.address && (
                    <div className='error-message'>{errors.address}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    id='city'
                    value={form.city}
                    onChange={handleInputChange}
                    className={`${errors.city ? 'invalid-input' : ''}`}
                  />
                  {errors.city && (
                    <div className='error-message'>{errors.city}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='state'>State</label>
                  <input
                    type='text'
                    id='state'
                    value={form.state}
                    onChange={handleInputChange}
                    className={`${errors.state ? 'invalid-input' : ''}`}
                  />
                  {errors.state && (
                    <div className='error-message'>{errors.state}</div>
                  )}
                </div>

                <div className='checkout-input-group'>
                  <label htmlFor='cep'>CEP</label>
                  <input
                    type='text'
                    id='cep'
                    value={form.cep}
                    onChange={handleInputChange}
                    className={`${errors.cep ? 'invalid-input' : ''}`}
                  />
                  {errors.cep && (
                    <div className='error-message'>{errors.cep}</div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section
              id='checkout-billing-info'
              className='checkout-payee-info-section-card'
            >
              <div className='checkout-info-message'>
                Basic information, including address, obtained from logged-in
                user.
              </div>
            </section>
          )}
          {/* Delivery Method  */}
          <section
            id='checkout-delivery-method'
            className='checkout-payee-info-section-card'
          >
            <h2>Delivery Method</h2>
            <div className='checkout-input-group'>
              <input
                type='radio'
                id='sedex'
                name='delivery'
                value='sedex'
                checked={form.delivery === 'sedex'}
                onChange={handleInputChange}
              />
              <label htmlFor='sedex'>SEDEX</label>
            </div>
            <div className='checkout-input-group'>
              <input
                type='radio'
                id='dhl'
                name='delivery'
                value='dhl'
                // checked={form.delivery === 'dhl'}
                onChange={handleInputChange}
              />
              <label htmlFor='dhl'>DHL</label>
            </div>
            {errors.delivery && (
              <div className='error-message'>{errors.delivery}</div>
            )}
          </section>
          {/* Payment Method  */}
          <section
            id='checkout-payment-method'
            className='checkout-payee-info-section-card'
          >
            <h2>Payment Method</h2>

            <div className='checkout-input-group'>
              <input
                type='radio'
                id='credit-card'
                name='payment'
                value='credit-card'
                checked={form.payment === 'credit-card'}
                onChange={handleInputChange}
              />
              <label htmlFor='credit-card'>Credit Card</label>
              <div className='credit-card-details'>
                <input
                  type='text'
                  id='cardNumber'
                  placeholder='Card Number'
                  value={form.cardNumber}
                  onChange={handleInputChange}
                  className={`${errors.cardNumber ? 'invalid-input' : ''} ${
                    form.payment !== 'credit-card' ? 'hidden' : ''
                  }`}
                />
                {errors.cardNumber && form.payment === 'credit-card' && (
                  <div className='error-message'>{errors.cardNumber}</div>
                )}

                <input
                  type='text'
                  id='fullName'
                  placeholder='Full Name'
                  value={form.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'invalid-input' : ''}
                />
                {errors.fullName && (
                  <div className='error-message'>{errors.fullName}</div>
                )}

                <input
                  type='text'
                  id='expirationDate'
                  placeholder='Expiration Date'
                  value={form.expirationDate}
                  onChange={handleInputChange}
                  className={errors.expirationDate ? 'invalid-input' : ''}
                />
                {errors.expirationDate && (
                  <div className='error-message'>{errors.expirationDate}</div>
                )}

                <input
                  type='text'
                  id='securityNumber'
                  placeholder='Security Number'
                  value={form.securityNumber}
                  onChange={handleInputChange}
                  className={errors.securityNumber ? 'invalid-input' : ''}
                />
                {errors.securityNumber && (
                  <div className='error-message'>{errors.securityNumber}</div>
                )}
              </div>
            </div>
            <div className='checkout-input-group'>
              <input
                type='radio'
                id='pix'
                name='payment'
                value='pix'
                // checked={form.payment === 'pix'}
                onChange={handleInputChange}
              />
              <label htmlFor='pix'>PIX</label>
            </div>
            <div className='checkout-input-group'>
              <input
                type='radio'
                id='boleto'
                name='payment'
                value='boleto'
                // checked={form.payment === 'boleto'}
                onChange={handleInputChange}
              />
              <label htmlFor='boleto'>Boleto</label>
            </div>
            {errors.payment && errors.payment !== 'credit-card' && (
              <div className='error-message'>{errors.payment}</div>
            )}
          </section>

          {/* Additional Information */}
          <section
            id='checkout-additional-info'
            className='checkout-payee-info-section-card'
          >
            <h2>Additional Information</h2>
            <div className='checkout-input-group'>
              <label htmlFor='observations'>Observations</label>
              <textarea
                id='observations'
                value={form.observations}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <div className='checkout-confirmation-inputs'>
            <label htmlFor='newsletter'>
              <input
                type='checkbox'
                id='newsletter'
                // checked={form.newsletter}
                onChange={handleInputChange}
              />
              I would like to receive newsletters and promotions
            </label>
            {errors.newsletter && (
              <div className='error-message'>{errors.newsletter}</div>
            )}

            <label htmlFor='privacyPolicy'>
              <input
                type='checkbox'
                id='privacyPolicy'
                checked={form.privacyPolicy}
                onChange={handleInputChange}
              />
              I agree with the Privacy Policy
            </label>
            {errors.privacyPolicy && (
              <div className='error-message'>{errors.privacyPolicy}</div>
            )}
          </div>

          <Button type='submit' buttonText='Checkout' />
        </section>

        <aside id='checkout-purchase-summary'>
          <div className='checkout-summary-item'>
            <h3>Summary</h3>
            {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId}>
                <span>{item.productTitle}</span>
                <span>${item.productPrice}</span>
                <span>Qty: {item.quantity}</span>
              </div>
            ))
          ) : (
            <div>No items in the cart</div>
          )}
          </div>
          <div className='checkout-summary-item'>
            <h2>Total</h2>
          </div>
          {cartItems.length > 0 && ( // Add conditional check here
            <div className='checkout-summary-item'>
              <span>Delivery Tax: $5.00</span> <hr />
              <span>Final Cost: ${((cartTotal) + 5.0).toFixed(2)}</span>
            </div>
          )}
        </aside>

      </main>
      <Footer />
    </form>
  );
};

export default Checkout;
