import React, {useState} from 'react';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

const CartItem = ({item, handleQuantityChange, handleRemoveItem}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity)) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
    handleQuantityChange(item.productId, quantity);
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
    <div className="cart-item">
      <img src={item.productImage} alt="cart item product" className="cart-image" />
      <div className="cart-details">
        <h3>{item.productTitle}</h3>
        <p>{item.productDescription}</p>
        <div className="cart-actions">
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              max="10"
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <div className="cart-remove">
            <div className="cart-price">
              <h3>${(item.productPrice * quantity).toFixed(2)}</h3>
            </div>
            <button type="button" onClick={confirmRemoveItem}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
