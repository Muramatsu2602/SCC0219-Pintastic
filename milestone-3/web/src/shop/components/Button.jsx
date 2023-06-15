import React from 'react';
import './Button.style.css';

const Button = ({buttonText, onClick}) => {
  return (
    <button onClick={onClick} className='pintastic-button' type='submit'>
      <span>{buttonText}</span>
    </button>
  );
};

export default Button;
