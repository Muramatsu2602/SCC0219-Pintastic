import React from 'react';

import {AuthProvider} from './contexts/Auth';
import {CartProvider} from './contexts/Cart';
import {WishlistProvider} from './contexts/Wishlist';

import ShopRouter from './ShopRouter';

export default function ShopApp() {
  return (

    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ShopRouter />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
