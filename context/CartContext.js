import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const addToCart = async (product_id, price, category) => {
    setCart((prevCart) => {
      const categoryItems = prevCart[category] || [];
      const existingItem = categoryItems.find((item) => item.id === product_id);

      if (existingItem) {
        return {
          ...prevCart,
          [category]: categoryItems.map((item) =>
            item.id === product_id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.totalPrice + price,
                }
              : item
          ),
        };
      } else {
        if (!showCart) {
          setShowCart(true);
        }
        return {
          ...prevCart,
          [category]: [
            ...categoryItems,
            { product_id, price, quantity: 1, totalPrice: price },
          ],
        };
      }
    });
  };

  const removeFromCart = (product_id, category) => {
    setCart((prevCart) => {
      const categoryItems = prevCart[category] || [];
      const updatedItems = categoryItems.filter((item) => item.id !== product_id);
      
      if (updatedItems.length === 0) {
        const { [category]: _, ...rest } = prevCart;
        return rest;
      }
      
      return {
        ...prevCart,
        [category]: updatedItems,
      };
    });
  };

  const decrementFromCart = (product_id, category) => {
    setCart((prevCart) => {
      const categoryItems = prevCart[category] || [];
      const updatedItems = categoryItems
        .map((item) =>
          item.id === product_id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      if (updatedItems.length === 0) {
        const { [category]: _, ...rest } = prevCart;
        return rest;
      }

      return {
        ...prevCart,
        [category]: updatedItems,
      };
    });
  };

  const emptyCart = () => setCart({});
  const checkout = () => setCart({});
  const toggleCart = () => setShowCart(!showCart);

  const getTotal = () => {
    return Object.values(cart).reduce((total, categoryItems) => {
      return (
        total +
        categoryItems.reduce((categoryTotal, item) => categoryTotal + item.totalPrice, 0)
      );
    }, 0);
  };

  const value = {
    cart,
    showCart,
    addToCart,
    removeFromCart,
    decrementFromCart,
    emptyCart,
    checkout,
    toggleCart,
    getTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 