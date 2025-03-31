import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/Cart";

const products = [
  {
    name: "ARCTIC F12",
    price: 10,
    image: "/imgs/fans/arctic-f12.webp",
    type: "120mm"
  },
  {
    name: "Cooler Master SickleFlow 120",
    price: 15,
    image: "/imgs/fans/cooler-master-sickleflow-120.webp",
    type: "120mm"
  },
  {
    name: "Phanteks PH-F140MP",
    price: 20,
    image: "/imgs/fans/phanteks-ph-f140mp.webp",
    type: "140mm"
  },
  {
    name: "Corsair ML120 Pro",
    price: 25,
    image: "/imgs/fans/corsair-ml120-pro.webp",
    type: "120mm"
  },
  {
    name: "be quiet! Silent Wings 3",
    price: 28,
    image: "/imgs/fans/bequiet-silent-wings-3.webp",
    type: "140mm"
  },
  {
    name: "Noctua NF-A12x25",
    price: 30,
    image: "/imgs/fans/noctua-nf-a12x25.webp",
    type: "120mm"
  },
  {
    name: "Lian Li UNI Fan SL120",
    price: 30,
    image: "/imgs/fans/lian-li-uni-fan-sl120.webp",
    type: "120mm"
  },
  {
    name: "NZXT Aer RGB 2",
    price: 35,
    image: "/imgs/fans/nzxt-aer-rgb-2.webp",
    type: "120mm"
  },
  {
    name: "Thermaltake Riing Plus 12",
    price: 40,
    image: "/imgs/fans/thermaltake-riing-plus-12.webp",
    type: "120mm"
  }
];

export default function fanStore() {
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
          <h2 id="title">Available Fans</h2>
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
              <p>Type: {product.type}</p>
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
