import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/Cart";

const products = [
  {
    name: "EVGA 600 W1 600W",
    price: 50,
    image: "/imgs/power/evga-600w1.webp",
    efficiency: "80+ White"
  },
  {
    name: "Cooler Master MWE 550W",
    price: 60,
    image: "/imgs/power/cooler-master-mwe-550.webp",
    efficiency: "80+ Bronze"
  },
  {
    name: "Thermaltake Smart 700W",
    price: 70,
    image: "/imgs/power/thermaltake-smart-700w.webp",
    efficiency: "80+ White"
  },
  {
    name: "Corsair CX550F RGB 550W",
    price: 80,
    image: "/imgs/power/corsair-cx550f-rgb.webp",
    efficiency: "80+ Bronze"
  },
  {
    name: "Corsair RM750x 750W",
    price: 120,
    image: "/imgs/power/corsair-rm750x.webp",
    efficiency: "80+ Gold"
  },
  {
    name: "NZXT C750 750W",
    price: 130,
    image: "/imgs/power/nzxt-c750.webp",
    efficiency: "80+ Gold"
  },
  {
    name: "Seasonic Focus GX-850 850W",
    price: 140,
    image: "/imgs/power/seasonic-focus-gx-850.webp",
    efficiency: "80+ Gold"
  },
  {
    name: "Be Quiet! Straight Power 11 750W",
    price: 160,
    image: "/imgs/power/bequiet-straight-power-11.webp",
    efficiency: "80+ Platinum"
  },
  {
    name: "ASUS ROG Thor 850W",
    price: 200,
    image: "/imgs/power/asus-rog-thor-850w.webp",
    efficiency: "80+ Platinum"
  }
];

export default function powerStore() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Calculate the total price of the cart
  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">Available Power Supplies</h2>
          <Cart
            cart={cart}
            setCart={setCart}
            showCart={showCart}
            toggleCart={toggleCart}
            total={total} // Pass the total as a prop
          />
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`image of a ${product.name}`} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Efficiency: {product.efficiency}</p>
              <button
                className="add-to-cart"
                onClick={() => {
                  if (!showCart) toggleCart();
                  setCart((prevCart) => {
                    const item = prevCart.find(
                      (item) => item.product === product.name
                    );
                    if (item) {
                      return prevCart.map((item) =>
                        item.product === product.name
                          ? {
                              ...item,
                              quantity: item.quantity + 1,
                              totalPrice: item.totalPrice + product.price
                            }
                          : item
                      );
                    } else {
                      return [
                        ...prevCart,
                        {
                          product: product.name,
                          price: product.price,
                          quantity: 1,
                          totalPrice: product.price
                        }
                      ];
                    }
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
