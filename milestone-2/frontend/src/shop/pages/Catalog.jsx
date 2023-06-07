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
  const [ratingFilter, setRatingFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Apply filters and update filtered data
    const filteredItems = cardData.filter((item) => {
      // Apply rating filter
      if (
        ratingFilter.length > 0 &&
        item.productRating < Math.max(...ratingFilter) &&
        item.productRating >= Math.min(...ratingFilter)
      ) {
        return false;
      }

      // Apply price filter
      if (
        item.productPrice < priceFilter[0] ||
        item.productPrice > priceFilter[1]
      ) {
        return false;
      }

      return true;
    });

    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset to first page when changing filters
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
    const updatedFilter = [...ratingFilter];
    if (updatedFilter.includes(value)) {
      const index = updatedFilter.indexOf(value);
      updatedFilter.splice(index, 1);
    } else {
      updatedFilter.push(value);
    }
    setRatingFilter(updatedFilter);
  };

  const handlePriceFilterChange = (event) => {
    const {value} = event.target;
    setPriceFilter([0, parseInt(value)]);
  };

  const handleExactPriceFilterChange = (event) => {
    const {value} = event.target;
    setPriceFilter([parseInt(value), parseInt(value)]);
  };

  const handleApplyFilter = () => {
    // Apply filters and update filtered data
    const filteredItems = cardData.filter((item) => {
      // Apply rating filter
      if (
        ratingFilter.length > 0 &&
        item.productRating < Math.max(...ratingFilter) &&
        item.productRating >= Math.min(...ratingFilter)
      ) {
        return false;
      }

      // Apply price filter
      if (
        item.productPrice < priceFilter[0] ||
        item.productPrice > priceFilter[1]
      ) {
        return false;
      }

      return true;
    });

    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleResetFilter = () => {
    setRatingFilter([]);
    setPriceFilter([0, 100]);
    setCurrentPage(1); // Reset to first page when resetting filters
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
              <label htmlFor='rating-1'>
                <input
                  type='checkbox'
                  id='rating-1'
                  name='rating'
                  value={1}
                  checked={ratingFilter.includes(1)}
                  onChange={(event) =>
                    handleRatingFilterChange(parseInt(event.target.value))
                  }
                />
                <StarRating rating={1} />
              </label>

              <label htmlFor='rating-2'>
                <input
                  type='checkbox'
                  id='rating-2'
                  name='rating'
                  value={2}
                  checked={ratingFilter.includes(2)}
                  onChange={(event) =>
                    handleRatingFilterChange(parseInt(event.target.value))
                  }
                />
                <StarRating rating={2} />
              </label>

              <label htmlFor='rating-3'>
                <input
                  type='checkbox'
                  id='rating-3'
                  name='rating'
                  value={3}
                  checked={ratingFilter.includes(3)}
                  onChange={(event) =>
                    handleRatingFilterChange(parseInt(event.target.value))
                  }
                />
                <StarRating rating={3} />
              </label>

              <label htmlFor='rating-4'>
                <input
                  type='checkbox'
                  id='rating-4'
                  name='rating'
                  value={4}
                  checked={ratingFilter.includes(4)}
                  onChange={(event) =>
                    handleRatingFilterChange(parseInt(event.target.value))
                  }
                />
                <StarRating rating={4} />
              </label>

              <label htmlFor='rating-5'>
                <input
                  type='checkbox'
                  id='rating-5'
                  name='rating'
                  value={5}
                  checked={ratingFilter.includes(5)}
                  onChange={(event) =>
                    handleRatingFilterChange(parseInt(event.target.value))
                  }
                />
                <StarRating rating={5} />
              </label>
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
                value={priceFilter[1]}
                onChange={handlePriceFilterChange}
              />
              <div className='price-range-values'>
                <span>${priceFilter[0]}</span>
                <span>${priceFilter[1]}</span>
              </div>
              <div className='exact-price-input'>
                <label htmlFor='exact-price'>Exact Price:</label>
                <input
                  type='number'
                  id='exact-price'
                  min='0'
                  step='5'
                  value={priceFilter[1]}
                  onChange={handleExactPriceFilterChange}
                />
              </div>
            </div>
          </div>

          <div className='filter-buttons'>
            <Button buttonText='Apply' onClick={handleApplyFilter} />
            <Button buttonText='Reset' onClick={handleResetFilter} />
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
              {Array.from(
                  Array(Math.ceil(filteredData.length / cardsPerPage)),
                  (_, index) => index + 1,
              ).map((pageNumber) => (
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
