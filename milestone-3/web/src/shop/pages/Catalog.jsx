import './Catalog.style.css';
import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Card from '../components/Card';
import StarRating from '../components/StarRating';
import api from '../../services/api';
import Swal from 'sweetalert2';


export default function Catalog({type}) {
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState([1, 2, 3, 4, 5]);
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [productCategoryFilter, setProductCategoryFilter] = useState(
      type || 'all',
  );

  // Add a new state for storing the fetched products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Show loading popup
        Swal.fire({
          title: 'Loading',
          text: 'Fetching products...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await api.get('/products/active'); // Update the API endpoint path
        setProducts(response.data);
        // Hide loading popup
        Swal.close();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Set the loading status to false in case of an error
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch products',
        });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setProductCategoryFilter(type || 'all');
  }, [type]);

  useEffect(() => {
    // Apply filters and update filtered data
    const filteredItems = products.filter((item) => {
      // Apply rating filter
      if (
        ratingFilter.length > 0 &&
        !ratingFilter.some(
            (rating) =>
              item.rating >= rating && item.rating < rating + 1,
        )
      ) {
        return false;
      }

      // Apply price filter
      if (
        item.price < priceFilter[0] ||
        item.price > priceFilter[1]
      ) {
        return false;
      }

      // Apply product category filter
      if (
        productCategoryFilter !== 'all' &&
        item.category !== productCategoryFilter
      ) {
        return false;
      }

      // Apply search query filter
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredData(filteredItems);
    console.log(filteredData);
    setCurrentPage(1); // Reset to first page when changing filters
  }, [ratingFilter, priceFilter, productCategoryFilter, searchQuery, products]);

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
    if (value === '') {
      setPriceFilter([0, 100]); // Set to default maximum value
    } else {
      setPriceFilter([parseFloat(value), parseFloat(value)]);
    }
  };
  const handleProductCategoryFilterChange = (value) => {
    setProductCategoryFilter(value);
  };

  const handleApplyFilter = () => {
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleResetFilter = () => {
    setRatingFilter([1, 2, 3, 4, 5]);
    setPriceFilter([0, 100]);
    setProductCategoryFilter(type || 'all');
    setCurrentPage(1); // Reset to first page when resetting filters
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header
        quantity={3}
        displaySearchBar={true}
        onSearch={handleSearch}
        onProductCategoryFilterChange={handleProductCategoryFilterChange}
        selectedProductCategory={productCategoryFilter}
      />
      <Nav />

      <main id='catalog-main'>
        {loading ? (
          <div id='loading-section'>Loading...</div>
        ) : (
          <>
            <aside>
              <div className='filter-container'>
                <div className='filters-title'>
                  <span> Filters</span>
                </div>
              </div>

              {/* Star Rating Filter  */}
              <div className='filter-container'>
                <h3 className='filter-title'>Ratings</h3>
                <div className='rating-filter'>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} htmlFor={`rating-${rating}`}>
                      <input
                        type='checkbox'
                        id={`rating-${rating}`}
                        name='rating'
                        value={rating}
                        checked={ratingFilter.includes(rating)}
                        onChange={(event) =>
                          handleRatingFilterChange(parseInt(event.target.value))
                        }
                      />
                      <StarRating rating={rating} />
                    </label>
                  ))}
                </div>
              </div>
              {/* Price Range Filter */}
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
              {/* Product Category Filter  */}
              <div className='filter-container'>
                <h3 className='filter-title'>Product Category</h3>
                <div className='product-category-filter'>
                  <label htmlFor='category-all'>
                    <input
                      type='radio'
                      id='category-all'
                      name='product-category'
                      value='all'
                      checked={productCategoryFilter === 'all'}
                      onChange={() => handleProductCategoryFilterChange('all')}
                    />
                  All
                  </label>
                  <label htmlFor='category-pin'>
                    <input
                      type='radio'
                      id='category-pin'
                      name='product-category'
                      value='Pin'
                      checked={productCategoryFilter === 'Pin'}
                      onChange={() => handleProductCategoryFilterChange('Pin')}
                    />
                  Pins
                  </label>
                  <label htmlFor='category-sticker'>
                    <input
                      type='radio'
                      id='category-sticker'
                      name='product-category'
                      value='Sticker'
                      checked={productCategoryFilter === 'Sticker'}
                      onChange={() => handleProductCategoryFilterChange('Sticker')}
                    />
                  Stickers
                  </label>
                </div>
              </div>

              <div className='filter-buttons'>
                <Button buttonText='Apply' onClick={handleApplyFilter} />
                <Button buttonText='Reset' onClick={handleResetFilter} />
              </div>
            </aside>

            <section>
              {currentCards.length > 0 ? (
              <div className='card-grid'>
                {currentCards.map((item, index) => (
                  <Card
                    key={item._id} // Use a unique identifier for the key, such as _id
                    productId={item._id} // Use the appropriate property for the product ID
                    productTitle={item.title} // Use the appropriate property for the product title
                    productDescription={item.description} // Use the appropriate property for the product description
                    productPrice={item.price} // Use the appropriate property for the product price
                    productDiscountPercentage={item.discountPercentage} // Use the appropriate property for the product discount percentage
                    productImage={item.image} // Use the appropriate property for the product image
                    productRating={item.rating} // Use the appropriate property for the product rating ! not available
                    productCategory={item.category} // Use the appropriate property for the product category
                    productStock={item.stock} // Use the appropriate property for the product stock
                  />
                ))}
              </div>
            ) : (
              <div className='no-items-message'>
                No items could be found with the specified filter.
              </div>
            )}

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
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
