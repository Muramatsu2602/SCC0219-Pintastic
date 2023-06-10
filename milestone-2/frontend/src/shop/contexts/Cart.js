import React, {createContext, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productId !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{cartItems, addToCart, removeFromCart, clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};
