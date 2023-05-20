import React from 'react';
import './Button.style.css';

const Button = ({ buttonText }) => {
  return (
    <button className="pintastic-button" type="submit">
      <span>{buttonText}</span>
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};

export default Button;
