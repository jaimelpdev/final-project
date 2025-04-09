import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";

const products = [
  {
    name: "NVIDIA GeForce RTX 5090",
    brand: "ASUS",
    price: 2000,
    image: "/imgs/gpus/nvidia-rtx-5090.webp",
  },
  {
    name: "AMD Radeon RX 7900 XTX",
    brand: "Gigabyte",
    price: 1600,
    image: "/imgs/gpus/amd-rx-7900xtx.webp",
  },
  {
    name: "NVIDIA GeForce RTX 4080",
    brand: "MSI",
    price: 1200,
    image: "/imgs/gpus/nvidia-rtx-4080.webp",
  },
  {
    name: "AMD Radeon RX 7800 XT",
    brand: "ASUS",
    price: 1000,
    image: "/imgs/gpus/amd-rx-7800xt.webp",
  },
  {
    name: "NVIDIA GeForce RTX 4070",
    brand: "Gigabyte",
    price: 900,
    image: "/imgs/gpus/nvidia-rtx-4070.webp",
  },
  {
    name: "AMD Radeon RX 7700 XT",
    brand: "Gigabyte",
    price: 800,
    image: "/imgs/gpus/amd-rx-7700xt.webp",
  },
  {
    name: "NVIDIA GeForce RTX 3060",
    brand: "ASUS",
    price: 700,
    image: "/imgs/gpus/nvidia-rtx-3060.webp",
  },
  {
    name: "AMD Radeon RX 6600 XT",
    brand: "Gigabyte",
    price: 600,
    image: "/imgs/gpus/amd-rx-6600xt.webp",
  },
  {
    name: "NVIDIA GeForce RTX 2060",
    brand: "MSI",
    price: 500,
    image: "/imgs/gpus/nvidia-rtx-2060.webp",
  },
  {
    name: "AMD Radeon RX 5600 XT",
    brand: "ASUS",
    price: 400,
    image: "/imgs/gpus/amd-rx-5600xt.webp",
  },
  {
    name: "NVIDIA GeForce GTX 1660 Super",
    brand: "Gigabyte",
    price: 300,
    image: "/imgs/gpus/nvidia-gtx-1660super.webp",
  },
  {
    name: "AMD Radeon RX 5500 XT",
    brand: "MSI",
    price: 200,
    image: "/imgs/gpus/amd-rx-5500xt.webp",
  },
];

export default function gpuStore() {
  const { addToCart } = useCart();

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">Available GPUs</h2>
          
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
                onClick={() => addToCart(product.name, product.price, "GPUs")}
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
