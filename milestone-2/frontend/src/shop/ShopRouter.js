import React from 'react';
import {Routes, Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage'; // do not forget to include the extension
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import PinOfTheDay from './pages/PinOfTheDay';
import ProductDetails from './pages/ProductDetails';
import Catalog from './pages/Catalog';

function ShopRouter(props) {
  const mockDataPinOfTheDay = {
    productPrice: 49.99,
    productTitle: 'Product Title 3',
    productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productDiscountPercentage: 39.99,
    // eslint-disable-next-line max-len
    productImage: 'https://images.tcdn.com.br/img/img_prod/731014/pin_icebrg_vira_lata_caramelo_pipi_49_1_04dd5557995b5579f30d600218d8717f.jpg',
    productRating: 3.5,
  };
  const mockDataProductDetails = {
    productPrice: 39.99,
    productTitle: 'Sample Product',
    productDescription: 'This is a sample product description.',
    productDiscountPercentage: 20,
    productImage: './assets/img/items/caramelo.png',
    productRating: 4.5,
  };

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route
        path='/product'
        element={<ProductDetails {...mockDataProductDetails} />}
      />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route
        path='/day'
        element={<PinOfTheDay {...mockDataPinOfTheDay} />}
      />

      <Route
        path='/catalog/button'
        element={<Catalog type={'button'} />}
      />

      <Route path='/catalog/metal' element={<Catalog type={'metal'} />} />
    </Routes>
  );
}

export default ShopRouter;
