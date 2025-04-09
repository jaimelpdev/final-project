import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";

const products = [
  {
    name: "Cooler Master Hyper 212",
    price: 40,
    image: "/imgs/cooling/cooler-master-hyper-212.webp",
    type: "Air Cooler"
  },
  {
    name: "Arctic Freezer 34 eSports DUO",
    price: 50,
    image: "/imgs/cooling/arctic-freezer-34.webp",
    type: "Air Cooler"
  },
  {
    name: "DeepCool AK620",
    price: 70,
    image: "/imgs/cooling/deepcool-ak620.webp",
    type: "Air Cooler"
  },
  {
    name: "Be Quiet! Dark Rock Pro 4",
    price: 90,
    image: "/imgs/cooling/bequiet-dark-rock-pro-4.webp",
    type: "Air Cooler"
  },
  {
    name: "Noctua NH-D15",
    price: 100,
    image: "/imgs/cooling/noctua-nh-d15.webp",
    type: "Air Cooler"
  },
  {
    name: "NZXT Kraken X63",
    price: 150,
    image: "/imgs/cooling/nzxt-kraken-x63.webp",
    type: "Liquid Cooler"
  },
  {
    name: "Corsair iCUE H150i Elite Capellix",
    price: 180,
    image: "/imgs/cooling/corsair-h150i-elite.webp",
    type: "Liquid Cooler"
  },
  {
    name: "EK-AIO 360 D-RGB",
    price: 200,
    image: "/imgs/cooling/ek-aio-360.webp",
    type: "Liquid Cooler"
  },
  {
    name: "Thermaltake Floe RC360",
    price: 220,
    image: "/imgs/cooling/thermaltake-floe-rc360.webp",
    type: "Liquid Cooler"
  }
];

export default function coolingStore() {
  const { addToCart } = useCart();

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">Available Cooling</h2>
          <Cart />
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
                onClick={() => addToCart(product.name, product.price, "Cooling")}
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
