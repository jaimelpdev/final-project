import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);

    useEffect(() => {
      const fetchCart = async () => {
        const response = await fetch("/api/cart");
        const data = await response.json();
        setCart(data);
      };

      fetchCart();
    }, []);
  };

  const addToCart = async (product, price, category) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id }),
    });

    setCart((prevCart) => {
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
      } else {
        // Add a new item to the cart
        return [
          ...prevCart,
          { product, price, quantity: 1, totalPrice: price, category },
        ];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, toggleCart, showCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
