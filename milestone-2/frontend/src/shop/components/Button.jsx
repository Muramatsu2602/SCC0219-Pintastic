import React from 'react';
import './Button.style.css';


const Button = ({ buttonText }) => {
  return (
    <button className="pintastic-button" type="submit">
      <span>{buttonText}</span>
    </button>
  );
};

export default Button;
