import React, {createContext, useState, useEffect} from 'react';
import api from '../../services/api';
import {useAuth} from '../contexts/Auth';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const {user} = useAuth();
  const [curUserId, setCurUserId] = useState(null);

  useEffect(() => {
    fetchWishlistItems();
    setCurUserId(user?._id);
  }, [user]);

  const fetchWishlistItems = async () => {
    try {
      const response = await api.get(`/wishlist/${curUserId}`);
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post('/wishlist', {curUserId, productId});
      fetchWishlistItems();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${curUserId}/${productId}`);
      fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const clearWishlist = async () => {
    try {
      await api.delete(`/wishlist/${curUserId}`);
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
