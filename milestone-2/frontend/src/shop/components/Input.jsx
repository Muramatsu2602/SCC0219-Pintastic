import React from 'react';
import './Input.style.css';

export default function Input(props) {
  return (
    <div className='input-group'>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
    </div>
  );
}
