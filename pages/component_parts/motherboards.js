import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const products = [
  {
    name: "ASUS Prime H510M-E",
    price: 90,
    image: "/imgs/motherboards/asus-prime-h510m-e.webp",
    type: "Micro-ATX",
  },
  {
    name: "ASRock B450M Steel Legend",
    price: 100,
    image: "/imgs/motherboards/asrock-b450m-steel-legend.webp",
    type: "Micro-ATX",
  },

  {
    name: "Gigabyte B550 Aorus Pro",
    price: 170,
    image: "/imgs/motherboards/gigabyte-b550-aorus-pro.webp",
    type: "ATX",
  },
  {
    name: "ASUS TUF Gaming B550-PLUS",
    price: 200,
    image: "/imgs/motherboards/asus-tuf-gaming-b550-plus.webp",
    type: "ATX",
  },
  {
    name: "ASRock X570 Taichi",
    price: 350,
    image: "/imgs/motherboards/asrock-x570-taichi.webp",
    type: "ATX",
  },
  {
    name: "MSI MPG Z690 Carbon WiFi",
    price: 400,
    image: "/imgs/motherboards/msi-mpg-z690-carbon-wifi.webp",
    type: "ATX",
  },
  {
    name: "Gigabyte Z690 Aorus Master",
    price: 450,
    image: "/imgs/motherboards/gigabyte-z690-aorus-master.webp",
    type: "ATX",
  },
  {
    name: "ASUS ROG Strix Z790-E",
    price: 500,
    image: "/imgs/motherboards/asus-rog-strix-z790-e.webp",
    type: "ATX",
  },
];

export default function motherboardsStore() {
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">{t("Available Motherboards")}</h2>
          <Cart />
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`image of a ${product.name}`} />
              <h3>{product.name}</h3>
              <p>
                {t("Price")}: ${product.price}
              </p>
              <p>
                {t("Type")}: {product.type}
              </p>
              <button
                className="add-to-cart"
                onClick={() =>
                  addToCart(product.name, product.price, "Motherboards")
                }
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
