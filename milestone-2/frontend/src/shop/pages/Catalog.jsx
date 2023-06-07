import './Catalog.style.css';
import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Card from '../components/Card';
import StarRating from '../components/StarRating';

import cardData from './mock/products.json';

export default function Catalog({type}) {
  const [ratingFilter, setRatingFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Apply filters and update filtered data
    const filteredItems = cardData.filter((item) => {
      // Apply rating filter
      if (ratingFilter && item.productRating !== ratingFilter) {
        return false;
      }

      // Apply price filter
      if (priceFilter && item.productPrice > priceFilter) {
        return false;
      }

      return true;
    });

    setFilteredData(filteredItems);
  }, [ratingFilter, priceFilter]);

  // Get current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  return (
    <>
      <Header quantity={3} />
      <Nav />

      <main id='catalog-main'>
        <aside>
          <div className='filter-container'>
            <h3 className='filter-title'>Ratings</h3>
            <div className='rating-filter'>
              <input
                type='radio'
                id='rating-1'
                name='rating'
                value={1}
                onChange={(event) => handleRatingFilterChange(event.target.value)}
              />
              <label htmlFor='rating-1'>
                <StarRating rating={1} />
              </label>
              {/* Repeat the above input and label for ratings 2 to 5 */}
            </div>
          </div>

          <div className='filter-container'>
            <h3 className='filter-title'>Price Range</h3>
            <div className='price-filter'>
              <input
                type='range'
                id='price-range'
                min='0'
                max='100'
                step='5'
                value={priceFilter || ''}
                onChange={(event) => handlePriceFilterChange(event.target.value)}
              />
              {/* Add a Reset button to clear the price filter */}
              <Button buttonText='Reset' onClick={() => setPriceFilter(null)} />
            </div>
          </div>

          {/* Add more filters as needed */}
        </aside>

        <section>
          <div className='card-grid'>
            {currentCards.map((item, index) => (
              <Card
                key={index}
                productTitle={item.productTitle}
                productDescription={item.productDescription}
                productPrice={item.productPrice}
                productDiscountPercentage={item.productDiscountPercentage}
                productImage={item.productImage}
                productRating={item.productRating}
              />
            ))}
          </div>

          {filteredData.length > cardsPerPage && (
            <div className='pagination'>
              {Array.from(Array(Math.ceil(filteredData.length / cardsPerPage)), (x, index) => index + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  buttonText={pageNumber}
                  className={currentPage === pageNumber ? 'active' : ''}
                  onClick={() => handlePageChange(pageNumber)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
