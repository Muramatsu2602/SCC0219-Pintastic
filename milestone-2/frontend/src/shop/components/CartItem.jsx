import React, {useState} from 'react';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CartItem = ({item, handleQuantityChange, handleRemoveItem}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    handleQuantityChange(item.productId, newQuantity); // Call the callback function with the updated values
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
            <button type="button" onClick={() => handleRemoveItem(item.productId)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
