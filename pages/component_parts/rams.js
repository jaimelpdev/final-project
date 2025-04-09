import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";

const products = [
  {
    name: "Corsair Vengeance LPX 8GB",
    price: 40,
    image: "/imgs/rams/corsair-vengeance-lpx.webp"
  },
  {
    name: "Corsair Vengeance LPX 16GB",
    price: 80,
    image: "/imgs/rams/corsair-vengeance-lpx.webp"
  },
  {
    name: "Corsair Vengeance LPX 32GB",
    price: 160,
    image: "/imgs/rams/corsair-vengeance-lpx.webp"
  },
  {
    name: "G.Skill Trident Z RGB 8GB",
    price: 45,
    image: "/imgs/rams/gskill-trident-z-rgb.webp"
  },
  {
    name: "G.Skill Trident Z RGB 16GB",
    price: 90,
    image: "/imgs/rams/gskill-trident-z-rgb.webp"
  },
  {
    name: "G.Skill Trident Z RGB 32GB",
    price: 180,
    image: "/imgs/rams/gskill-trident-z-rgb.webp"
  },
  {
    name: "Kingston HyperX Fury 8GB",
    price: 42,
    image: "/imgs/rams/kingston-hyperx-fury.webp"
  },
  {
    name: "Kingston HyperX Fury 16GB",
    price: 85,
    image: "/imgs/rams/kingston-hyperx-fury.webp"
  },
  {
    name: "Kingston HyperX Fury 32GB",
    price: 170,
    image: "/imgs/rams/kingston-hyperx-fury.webp"
  },
  {
    name: "Crucial Ballistix 8GB",
    price: 37,
    image: "/imgs/rams/crucial-ballistix.webp"
  },
  {
    name: "Crucial Ballistix 16GB",
    price: 75,
    image: "/imgs/rams/crucial-ballistix.webp"
  },
  {
    name: "Crucial Ballistix 32GB",
    price: 150,
    image: "/imgs/rams/crucial-ballistix.webp"
  },
  {
    name: "TeamGroup T-Force Delta RGB 8GB",
    price: 47,
    image: "/imgs/rams/teamgroup-tforce-delta-rgb.webp"
  },
  {
    name: "TeamGroup T-Force Delta RGB 16GB",
    price: 95,
    image: "/imgs/rams/teamgroup-tforce-delta-rgb.webp"
  },
  {
    name: "TeamGroup T-Force Delta RGB 32GB",
    price: 190,
    image: "/imgs/rams/teamgroup-tforce-delta-rgb.webp"
  },
  {
    name: "Patriot Viper Steel 8GB",
    price: 35,
    image: "/imgs/rams/patriot-viper-steel.webp"
  },
  {
    name: "Patriot Viper Steel 16GB",
    price: 70,
    image: "/imgs/rams/patriot-viper-steel.webp"
  },
  {
    name: "Patriot Viper Steel 32GB",
    price: 140,
    image: "/imgs/rams/patriot-viper-steel.webp"
  },
  {
    name: "Corsair Dominator Platinum RGB 16GB",
    price: 120,
    image: "/imgs/rams/corsair-dominator-platinum-rgb.webp"
  },
  {
    name: "Corsair Dominator Platinum RGB 32GB",
    price: 240,
    image: "/imgs/rams/corsair-dominator-platinum-rgb.webp"
  },
  {
    name: "G.Skill Ripjaws V 16GB",
    price: 80,
    image: "/imgs/rams/gskill-ripjaws-v.webp"
  },
  {
    name: "G.Skill Ripjaws V 32GB",
    price: 160,
    image: "/imgs/rams/gskill-ripjaws-v.webp"
  },
  {
    name: "Kingston Fury Beast 16GB",
    price: 85,
    image: "/imgs/rams/kingston-fury-beast.webp"
  },
  {
    name: "Kingston Fury Beast 32GB",
    price: 170,
    image: "/imgs/rams/kingston-fury-beast.webp"
  }
].sort((a, b) => a.price - b.price);

export default function ramStore() {
  const { addToCart } = useCart();

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">Available RAMs</h2>
          <Cart />
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`image of a ${product.name}`} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.name, product.price, "RAMs")}
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
