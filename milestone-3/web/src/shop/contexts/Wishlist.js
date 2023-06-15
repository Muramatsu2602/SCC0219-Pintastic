import React, {createContext, useState} from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prevWishlistItems) => [...prevWishlistItems, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevWishlistItems) =>
      prevWishlistItems.filter((item) => item.productId !== productId),
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{wishlistItems, addToWishlist, removeFromWishlist, clearWishlist}}
    >
      {children}
    </WishlistContext.Provider>
  );
};
