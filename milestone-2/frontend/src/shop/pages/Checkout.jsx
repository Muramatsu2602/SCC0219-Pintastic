import React, {useState} from 'react';
import './Checkout.style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Menu from '../components/Nav';

const Checkout = ({ }) => {
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
    delivery: '',
    payment: '',
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
    setForm({
      ...form,
      [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });

    // Reset individual error
    setErrors({
      ...errors,
      [e.target.id]: '',
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

    if (!form.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (form.paymentMethod === 'credit-card') {
      if (!form.cardNumber || !form.fullName || !form.expirationDate || !form.securityNumber) {
        newErrors.creditCardDetails = 'All credit card details are required';
      }
    }

    // if (!form.newsletter) {
    //   newErrors.newsletter = 'You must subscribe to our newsletter';
    // }

    if (!form.privacyPolicy) {
      newErrors.privacyPolicy = 'You must accept the privacy policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Form is valid
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header quantity={7} />
      <Menu />
      <main id='checkout-main'>
        <section id='checkout-payee-information'>
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
                  className={errors.name ? 'invalid-input' : ''}
                />
                {errors.name && <div className='error-message'>{errors.name}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='surname'>Surname</label>
                <input
                  type='text'
                  id='surname'
                  value={form.surname}
                  onChange={handleInputChange}
                  className={errors.surname ? 'invalid-input' : ''}
                />
                {errors.surname && <div className='error-message'>{errors.surname}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  value={form.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'invalid-input' : ''}
                />
                {errors.email && <div className='error-message'>{errors.email}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='telephone'>Telephone</label>
                <input
                  type='text'
                  id='telephone'
                  value={form.telephone}
                  onChange={handleInputChange}
                  className={errors.telephone ? 'invalid-input' : ''}
                />
                {errors.telephone && <div className='error-message'>{errors.telephone}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  id='address'
                  value={form.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'invalid-input' : ''}
                />
                {errors.address && <div className='error-message'>{errors.address}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  id='city'
                  value={form.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'invalid-input' : ''}
                />
                {errors.city && <div className='error-message'>{errors.city}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='state'>State</label>
                <input
                  type='text'
                  id='state'
                  value={form.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'invalid-input' : ''}
                />
                {errors.state && <div className='error-message'>{errors.state}</div>}
              </div>
              <div className='checkout-input-group'>
                <label htmlFor='cep'>CEP</label>
                <input
                  type='text'
                  id='cep'
                  value={form.cep}
                  onChange={handleInputChange}
                  className={errors.cep ? 'invalid-input' : ''}
                />
                {errors.cep && <div className='error-message'>{errors.cep}</div>}
              </div>
            </div>
          </section>

          {/* Add remaining sections */}

          <div className='checkout-confirmation-inputs'>
            <label htmlFor='newsletter'>
              <input
                type='checkbox'
                id='newsletter'
                checked={form.newsletter}
                onChange={handleInputChange}
              />
              I would like to receive newsletters and promotions
            </label>
            {errors.newsletter && <div className='error-message'>{errors.newsletter}</div>}

            <label htmlFor='privacyPolicy'>
              <input
                type='checkbox'
                id='privacyPolicy'
                checked={form.privacyPolicy}
                onChange={handleInputChange}
              />
              I agree with the Privacy Policy
            </label>
            {errors.privacyPolicy && <div className='error-message'>{errors.privacyPolicy}</div>}
          </div>

          <Button type='submit' text='Checkout' />
        </section>
        <section id='checkout-cart'>
          <h2>Shopping Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}: ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <div>Total: ${cartTotal.toFixed(2)}</div>
        </section>
      </main>
      <Footer />
    </form>
  );
};

export default Checkout;
