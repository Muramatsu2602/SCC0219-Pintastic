/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import './CartItem.style.css';
import {CartContext} from '../contexts/Cart';

const CartItem = ({item, handleQuantityChange, handleRemoveItem}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const {cartItems} = useContext(CartContext);
  const productStock = cartItems.find((cartItem) => cartItem.productId === item.productId)?.productStock;

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity)) {
      setQuantity(1);
    } else if (newQuantity > productStock) {
      Swal.fire({
        title: 'Error',
        text: 'You cannot choose a quantity above the available stock.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setQuantity(productStock);
    } else {
      setQuantity(newQuantity);
      handleQuantityChange(item.productId, newQuantity);
    }
  };

  const confirmRemoveItem = () => {
    Swal.fire({
      title: 'Remove Item',
      text: 'Are you sure you want to remove this item from your cart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveItem(item.productId);
      }
    });
  };

  return (
    <div className='cart-item'>
      <img src={item.productImage} alt='cart item product' className='cart-image' />
      <div className='cart-details'>
        <h3>{item.productTitle}</h3>
        <p>{item.productDescription}</p>
        <div className='cart-actions'>
          <div className="quantity-container">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-input">
              <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                max={productStock + 1}
                value={quantity}
                onChange={handleChange}
                onKeyDown={(event) => {
                  if (event.key === '-' || event.key === 'e') {
                    event.preventDefault();
                  }
                }}
              />
              {quantity > productStock && <span className="stock-info">Out of Stock</span>}
            </div>
            <span className="stock-info">Available Stock: {productStock}</span>
          </div>
          <div className='cart-remove'>
            <div className='cart-price'>
              <h3>${(item.productPrice * quantity)}</h3>
            </div>
            <button type='button' onClick={confirmRemoveItem}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
