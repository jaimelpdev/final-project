import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (product, price, category) => {
    setCart((prevCart) => {
      // Verify if the item already exists in the cart
      const existingItem = prevCart.find(
        (item) => item.product === product && item.category === category
      );

      if (existingItem) {
        // Increment the quantity and total price of the existing item
        return prevCart.map((item) =>
          item.product === product && item.category === category
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + price,
              }
            : item
        );

        const toggleCart = () => setShowCart(!showCart);
      } else {
        // Add a new item to the cart
        return [
          ...prevCart,
          { product, price, quantity: 1, totalPrice: price, category },
        ];
      }
    });
  };

  const decrementFromCart = (product, category) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product === product && item.category === category
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (product, category) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product === product && item.category === category)
      )
    );
  };

  const emptyCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, toggleCart, showCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
