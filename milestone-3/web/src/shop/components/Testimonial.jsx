import React from 'react';
import './Testimonial.style.css';

const Testimonial = ({
  testimonialText,
  testimonialImageSrc,
  testimonialAuthor,
}) => {
  return (
    <div className='testimonial'>
      <div className='testimonial-content'>
        <p className='testimonial-text'>{testimonialText}</p>
      </div>
      <div className='testimonial-image'>
        <img
          src={
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          alt={`Testimonial`}
          className='testimonial-avatar'
        />
      </div>
      <p className='testimonial-author'>{testimonialAuthor}</p>
    </div>
  );
};

export default Testimonial;
