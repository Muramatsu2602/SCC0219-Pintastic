import React from 'react'
import './Card.style.css'

import Button from './Button'

const Card = ({
  productPrice,
  productTitle,
  productDescription,
  productDiscountPercentage,
  productImage
}) => {
  return (
    <div className='item-card-container'>
      <div className='item-card-img'>
        <div className='discount-pill'>{productDiscountPercentage}% OFF</div>
        <img src={require(`${productImage}`)} alt="card_image" />
      </div>
      <div className='item-card-details'>
        <div>
          <h4 id='item-title'>{productTitle}</h4>
          <span id='item-description'>{productDescription}</span>
        </div>
        <div id='item-card-bottom'>
          <span id='item-price'>R$ {productPrice}</span>
          <Button buttonText={' Buy Now !'} />
        </div>
      </div>
    </div>
  )
}

export default Card
