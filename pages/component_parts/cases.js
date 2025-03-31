import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/Cart";

const products = [
  {
    name: "Cooler Master MasterBox Q300L",
    price: 60,
    image: "/imgs/cases/cooler-master-q300l.webp",
    type: "Micro ATX"
  },
  {
    name: "NZXT H510",
    price: 80,
    image: "/imgs/cases/nzxt-h510.webp",
    type: "Mid Tower"
  },
  {
    name: "Phanteks Eclipse P400A",
    price: 90,
    image: "/imgs/cases/phanteks-eclipse-p400a.webp",
    type: "Mid Tower"
  },
  {
    name: "Corsair 4000D Airflow",
    price: 95,
    image: "/imgs/cases/corsair-4000d-airflow.webp",
    type: "Mid Tower"
  },
  {
    name: "Fractal Design Meshify C",
    price: 110,
    image: "/imgs/cases/fractal-meshify-c.webp",
    type: "Mid Tower"
  },
  {
    name: "Thermaltake Core P3",
    price: 150,
    image: "/imgs/cases/thermaltake-core-p3.webp",
    type: "Open Frame"
  },
  {
    name: "ASUS TUF Gaming GT501",
    price: 160,
    image: "/imgs/cases/asus-tuf-gt501.webp",
    type: "Mid Tower"
  },
  {
    name: "Be Quiet! Silent Base 802",
    price: 180,
    image: "/imgs/cases/bequiet-silent-base-802.webp",
    type: "Mid Tower"
  },
  {
    name: "Lian Li PC-O11 Dynamic",
    price: 200,
    image: "/imgs/cases/lian-li-pc-o11-dynamic.webp",
    type: "Mid Tower"
  }
];

export default function caseStore() {
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
          <h2 id="title">Available Cases</h2>
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
