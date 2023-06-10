import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {useAuth} from './contexts/Auth';

import LandingPage from './pages/LandingPage'; // do not forget to include the extension
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import PinOfTheDay from './pages/PinOfTheDay';
import ProductDetails from './pages/ProductDetails';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function ShopRouter(props) {
  const {signed} = useAuth();

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/product/:productId' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/catalog/' element={<Catalog type={'all'} />} />
      <Route path='/catalog/pins' element={<Catalog type={'pin'} />} />
      <Route path='/catalog/stickers' element={<Catalog type={'sticker'} />} />

      {
        signed ? (
          <>
            <Route path='/profile' element={<Profile />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/day' element={<PinOfTheDay />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<Signup />} />
            <Route path='/profile' element={<Login />} />
            <Route path='/checkout' element={<Login />} />
          </>
        )
      }

      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
}

export default ShopRouter;
