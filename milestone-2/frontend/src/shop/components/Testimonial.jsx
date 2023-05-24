import React from 'react'
import './Testimonial.style.css'

const Testimonial = ({
  testimonialText,
  testimonialImageSrc,
  testimonialAuthor
}) => {
  return (
    <div className='testimonial'>
      <div className='testimonial-content'>
        <p className='testimonial-text'>{testimonialText}</p>
      </div>
      <div className='testimonial-image'>
        <img
          src={require(`${testimonialImageSrc}`)}
          alt={`Testimonial`}
          className='testimonial-avatar'
        />
      </div>
      <p className='testimonial-author'>{testimonialAuthor}</p>
    </div>
  )
}

export default Testimonial
