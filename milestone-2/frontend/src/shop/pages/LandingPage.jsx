/* eslint-disable max-len */
import './LandingPage.style.css';
import cardData from './mock/products.json';

import React, {useState, useEffect} from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import Nav from '../components/Nav.jsx';
import Card from '../components/Card.jsx';
import Testimonial from '../components/Testimonial.jsx';
import {useNavigate} from 'react-router-dom';

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the number of cards per page based on the window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setCardsPerPage(4);
      } else {
        setCardsPerPage(1);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate index range for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <Nav />
      <div className='landing-hero'>
        <div className='hero-text'>
          <h1>Welcome to Pintastic</h1>
          <p>Discover the best collection of pins and stickers!</p>
        </div>
      </div>
      <main id='landing-main'>
        <section id='landing-highlighted'>
          <div className='section-title'>
            <span>Best selling products</span>
          </div>
          <div id='highlighted-content'>
            <div id='highlighted-options'>
              <ul>
                <li>
                  <a href='#'>New Arrivals</a>
                </li>
                <li>
                  <a href='#'>Best Sellers</a>
                </li>
                <li>
                  <a href='#'>Sale Items</a>
                </li>
                <li>
                  <a href='#'>Clearance</a>
                </li>
              </ul>

              <Button buttonText={'More Products'} onClick={() => {
                navigate('/catalog/');
              }}/>
            </div>
            <div id='highlighted-items'>
              <section id='landing-cards-pagination'>
                <div className='section-title'>
                  <span>More Cards</span>
                </div>

                <div className='cards-container'>
                  <div id='cards-content' className='horizontal-scroll'>
                    {currentCards.map((card, index) => (
                      <Card
                        key={index}
                        productId={card.productId}
                        productTitle={card.productTitle}
                        productDescription={card.productDescription}
                        productPrice={card.productPrice}
                        productDiscountPercentage={
                          card.productDiscountPercentage
                        }
                        productImage={card.productImage}
                        productRating={card.productRating}
                        productIsOnWishlist={card.productIsOnWishlist}
                        productCategory={card.productCategory}
                        productStock={card.productStock}
                      />
                    ))}
                  </div>
                </div>

                {windowWidth >= 768 && (
                  <div className='pagination'>
                    {Array.from(
                        Array(Math.ceil(cardData.length / cardsPerPage)),
                        (e, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                          >
                            {i + 1}
                          </button>
                        ),
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>
        <hr />
        <section id='landing-testimonials'>
          <div className='section-title'>
            <span>Relato de nossos clientes</span>
          </div>
          <div id='testimonials-content'>
            <Testimonial
              testimonialText={
                'Pintastic has made it so easy for me to find unique and high-quality pins for my collection. I\'m always impressed with  the selection and the customer service.'
              }
              testimonialImgSrc={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
              testimonialAuthor={'Pedro Hering'}
            />

            <Testimonial
              testimonialText={
                'Pintastic is my go-to for all things pins and stickers. The website is user-friendly and the checkout process is a breeze. I can always count on Pintastic to deliver high-quality products!'
              }
              testimonialImgSrc={
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              testimonialAuthor={'Maria Schoffen'}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
