import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const products = [
  {
    id: 13,
    name: "Intel Core i9 11900K",
    price: 500,
    image: "/imgs/cpus/intel-core-i9.webp",
  },
  {id: 14,
    name: "AMD Ryzen 9 5900X",
    price: 450,
    image: "/imgs/cpus/amd-ryzen-9.webp",
  },
  {
    id: 15,
    name: "Intel Core i7 11700K",
    price: 350,
    image: "/imgs/cpus/intel-core-i7.webp",
  },
  {
    id: 16,
    name: "AMD Ryzen 7 5800X",
    price: 300,
    image: "/imgs/cpus/amd-ryzen-7.webp",
  },
  {
    id: 17,
    name: "Intel Core i5 11600K",
    price: 250,
    image: "/imgs/cpus/intel-core-i5.webp",
  },
  {
    id: 18,
    name: "AMD Ryzen 5 5600X",
    price: 200,
    image: "/imgs/cpus/amd-ryzen-5.webp",
  },
  {
    id: 19,
    name: "Intel Core i3 10100",
    price: 150,
    image: "/imgs/cpus/intel-core-i3.webp",
  },
  {
    id: 20,
    name: "AMD Ryzen 3 3300X",
    price: 100,
    image: "/imgs/cpus/amd-ryzen-3.webp",
  },
  {
    id: 21,
    name: "AMD FX 8350",
    price: 90,
    image: "/imgs/cpus/amd-fx.webp",
  },
  {
    id: 22,
    name: "Intel Pentium G6400",
    price: 80,
    image: "/imgs/cpus/intel-pentium.webp",
  },
  {
    id: 23,
    name: "AMD Ryzen 3 3200G",
    price: 70,
    image: "/imgs/cpus/amd-ryzen-3-3200G.webp",
  },
  {
    id: 24,
    name: "Intel Celeron G5905",
    price: 60,
    image: "/imgs/cpus/intel-celeron.webp",
  },
];

export default function cpusStore() {
  const { addToCart } = useCart();
  const { t } = useTranslation("common");
  
  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">{t("Available CPUs")}</h2>
          <Cart />
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`image of a ${product.name}`} />
              <h3>{product.name}</h3>
              <p>{t("Price")}: ${product.price}</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.name, product.price, "CPUs")}
              >
                {t("Add to Cart")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}