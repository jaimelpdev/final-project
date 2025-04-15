import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">{t("Available Power Supplies")}</h2>
          <Cart />
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`image of a ${product.name}`} />
              <h3>{product.name}</h3>
              <p>{t("Price")}: ${product.price}</p>
              <p>{t("Efficiency")}: {product.efficiency}</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.name, product.price, "Power Supplies")}
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
