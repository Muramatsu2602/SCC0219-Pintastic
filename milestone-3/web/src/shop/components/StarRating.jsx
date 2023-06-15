import React from 'react';
import './StarRating.style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons';

const StarRating = ({rating}) => {
  const MAX_RATING = 5;

  const getStarIcon = (filled, half) => {
    if (filled) {
      return <FontAwesomeIcon icon={faStar} />;
    } else if (half) {
      return <FontAwesomeIcon icon={faStarHalf} />;
    }
  };

  const renderStarRating = () => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starRating = [];

    for (let i = 1; i <= MAX_RATING; i++) {
      if (i <= filledStars) {
        starRating.push(
            <span key={i} className='star-icon'>
              {getStarIcon(true)}
            </span>,
        );
      } else if (i === filledStars + 1 && hasHalfStar) {
        starRating.push(
            <span key={i} className='star-icon'>
              {getStarIcon(false, true)}
            </span>,
        );
      } else {
        starRating.push(
            <span key={i} className='star-icon'>
              {getStarIcon(false)}
            </span>,
        );
      }
    }

    return starRating;
  };

  return <div className='star-rating'>{renderStarRating()}</div>;
};

export default StarRating;
