/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import './CartItem.style.css';
import {CartContext} from '../contexts/Cart';

const CartItem = ({item, handleQuantityChange, handleRemoveItem}) => {
  const [curQuantity, setCurQuantity] = useState(item.quantity);
  const {cartItems} = useContext(CartContext);


  const calculateTotalPrice = () => {
    const itemPrice =
      item.discountPercentage > 0 ?
        item.price - (item.price * item.discountPercentage) / 100 :
        item.price;
    const totalPrice = itemPrice * curQuantity;
    return totalPrice.toFixed(2);
  };


  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity)) {
      setCurQuantity(1);
    } else if (newQuantity > item.stock) {
      Swal.fire({
        title: 'Error',
        text: 'You cannot choose a quantity above the available stock.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setCurQuantity(item.stock);
    } else {
      setCurQuantity(newQuantity);
      handleQuantityChange(item._id, newQuantity);
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
        handleRemoveItem(item._id);
      }
    });
  };

  return (
    <div className='cart-item'>
      <img src={item.image} alt='cart item product' className='cart-image' />
      <div className='cart-details'>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className='cart-actions'>
          <div className="quantity-container">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-input">
              <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                max={item.stock}
                value={curQuantity}
                onChange={handleChange}
                onKeyDown={(event) => {
                  if (event.key === '-' || event.key === 'e') {
                    event.preventDefault();
                  }
                }}
              />
              {curQuantity > item.stock && <span className="stock-info">Out of Stock</span>}
            </div>
            <span className="stock-info">Available Stock: {item.stock}</span>
          </div>
          <div className='cart-remove'>
            <div className='cart-price'>
              <h3>${calculateTotalPrice()}</h3>
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
