import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/Cart";

const products = [
  {
    name: "Seagate Barracuda 1TB HDD",
    price: 50,
    image: "/imgs/storage/seagate-barracuda-1tb-hdd.webp",
    readSpeed: "210 MB/s"
  },
  {
    name: "Kingston A2000 500GB SSD",
    price: 55,
    image: "/imgs/storage/kingston-a2000-ssd.webp",
    readSpeed: "2200 MB/s"
  },
  {
    name: "Western Digital Blue 1TB HDD",
    price: 55,
    image: "/imgs/storage/wd-blue-1tb-hdd.webp",
    readSpeed: "150 MB/s"
  },
  {
    name: "Crucial MX500 500GB SSD",
    price: 60,
    image: "/imgs/storage/crucial-mx500-ssd.webp",
    readSpeed: "560 MB/s"
  },
  {
    name: "Samsung 970 EVO 500GB SSD",
    price: 70,
    image: "/imgs/storage/samsung-970-evo-500gb-ssd.webp",
    readSpeed: "3500 MB/s"
  },
  {
    name: "Western Digital Black 500GB SSD",
    price: 75,
    image: "/imgs/storage/wd-black-ssd.webp",
    readSpeed: "3400 MB/s"
  },
  {
    name: "Seagate Barracuda 2TB HDD",
    price: 80,
    image: "/imgs/storage/seagate-barracuda-2tb-hdd.webp",
    readSpeed: "220 MB/s"
  },
  {
    name: "Western Digital Blue 2TB HDD",
    price: 85,
    image: "/imgs/storage/wd-blue-2tb-hdd.webp",
    readSpeed: "175 MB/s"
  },
  {
    name: "Kingston A2000 1TB SSD",
    price: 100,
    image: "/imgs/storage/kingston-a2000-ssd.webp",
    readSpeed: "2200 MB/s"
  },
  {
    name: "Crucial MX500 1TB SSD",
    price: 110,
    image: "/imgs/storage/crucial-mx500-ssd.webp",
    readSpeed: "560 MB/s"
  },
  {
    name: "Samsung 970 EVO 1TB SSD",
    price: 130,
    image: "/imgs/storage/samsung-970-evo-1tb-ssd.webp",
    readSpeed: "3500 MB/s"
  },
  {
    name: "Western Digital Black 1TB SSD",
    price: 140,
    image: "/imgs/storage/wd-black-ssd.webp",
    readSpeed: "3400 MB/s"
  }
];

export default function ramStore() {
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
          <h2 id="title">Available Rams</h2>
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
              <p>ReadSpeed: {product.readSpeed}</p>
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
