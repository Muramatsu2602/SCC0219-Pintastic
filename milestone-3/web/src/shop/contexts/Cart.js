import React, {createContext, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const cartItem = {
      ...product,
      quantity: quantity,
    };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId ? {...item, quantity} : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{cartItems, addToCart, removeFromCart, clearCart, updateCartQuantity}}
    >
      {children}
    </CartContext.Provider>
  );
};
