import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/Cart";

const products = [
  {
    name: "Intel Core i9 11900K",
    price: 500,
    image: "/imgs/cpus/intel-core-i9.webp"
  },
  {
    name: "AMD Ryzen 9 5900X",
    price: 450,
    image: "/imgs/cpus/amd-ryzen-9.webp"
  },
  {
    name: "Intel Core i7 11700K",
    price: 350,
    image: "/imgs/cpus/intel-core-i7.webp"
  },
  {
    name: "AMD Ryzen 7 5800X",
    price: 300,
    image: "/imgs/cpus/amd-ryzen-7.webp"
  },
  {
    name: "Intel Core i5 11600K",
    price: 250,
    image: "/imgs/cpus/intel-core-i5.webp"
  },
  {
    name: "AMD Ryzen 5 5600X",
    price: 200,
    image: "/imgs/cpus/amd-ryzen-5.webp"
  },
  {
    name: "Intel Core i3 10100",
    price: 150,
    image: "/imgs/cpus/intel-core-i3.webp"
  },
  {
    name: "AMD Ryzen 3 3300X",
    price: 100,
    image: "/imgs/cpus/amd-ryzen-3.webp"
  },
  {
    name: "AMD FX 8350",
    price: 90,
    image: "/imgs/cpus/amd-fx.webp"
  },
  {
    name: "Intel Pentium G6400",
    price: 80,
    image: "/imgs/cpus/intel-pentium.webp"
  },
  {
    name: "AMD Ryzen 3 3200G",
    price: 70,
    image: "/imgs/cpus/amd-ryzen-3-3200G.webp"
  },
  {
    name: "Intel Celeron G5905",
    price: 60,
    image: "/imgs/cpus/intel-celeron.webp"
  }
];

export default function cpuStore() {
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
          <h2 id="title">Available CPUs</h2>
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
