import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`/wishlist/${userId}`);
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post('/wishlist', {userId, productId});
      fetchWishlistItems();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/wishlist/${userId}/${productId}`);
      fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete(`/wishlist/${userId}`);
      fetchWishlistItems();
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
