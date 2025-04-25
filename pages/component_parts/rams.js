import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const products = [
  {
    id: 25,
    name: "Corsair Vengeance LPX 8GB",
    price: 40,
    image: "/imgs/rams/corsair-vengeance-lpx.webp",
  },
  {
    id: 26,
    name: "Corsair Vengeance LPX 16GB",
    price: 80,
    image: "/imgs/rams/corsair-vengeance-lpx.webp",
  },
  {
    id: 27,
    name: "Corsair Vengeance LPX 32GB",
    price: 160,
    image: "/imgs/rams/corsair-vengeance-lpx.webp",
  },
  {
    id: 28,
    name: "G.Skill Trident Z RGB 8GB",
    price: 45,
    image: "/imgs/rams/gskill-trident-z-rgb.webp",
  },
  {
    id: 29,
    name: "G.Skill Trident Z RGB 16GB",
    price: 90,
    image: "/imgs/rams/gskill-trident-z-rgb.webp",
  },
  {
    id: 30,
    name: "G.Skill Trident Z RGB 32GB",
    price: 180,
    image: "/imgs/rams/gskill-trident-z-rgb.webp",
  },
  {
    id: 31,
    name: "Kingston HyperX Fury 8GB",
    price: 42,
    image: "/imgs/rams/kingston-hyperx-fury.webp",
  },
  {
    id: 32,
    name: "Kingston HyperX Fury 16GB",
    price: 85,
    image: "/imgs/rams/kingston-hyperx-fury.webp",
  },
  {
    id: 33,
    name: "Kingston HyperX Fury 32GB",
    price: 170,
    image: "/imgs/rams/kingston-hyperx-fury.webp",
  },
  {
    id: 34,
    name: "Crucial Ballistix 8GB",
    price: 37,
    image: "/imgs/rams/crucial-ballistix.webp",
  },
  {
    id: 35,
    name: "Crucial Ballistix 16GB",
    price: 75,
    image: "/imgs/rams/crucial-ballistix.webp",
  },
  {
    id: 36,
    name: "Crucial Ballistix 32GB",
    price: 150,
    image: "/imgs/rams/crucial-ballistix.webp",
  },
  {
    id: 37,
    name: "TeamGroup T-Force Delta RGB 8GB",
    price: 47,
    image: "/imgs/rams/teamgroup-tforce-delta-rgb.webp",
  },
  {
    id: 38,
    name: "TeamGroup T-Force Delta RGB 16GB",
    price: 95,
    image: "/imgs/rams/teamgroup-tforce-delta-rgb.webp",
  },
  {
    id: 39,
    name: "TeamGroup T-Force Delta RGB 32GB",
    price: 190,
    image: "/imgs/rams/teamgroup-tforce-delta-rgb.webp",
  },
  {
    id: 40,
    name: "Patriot Viper Steel 8GB",
    price: 35,
    image: "/imgs/rams/patriot-viper-steel.webp",
  },
  {
    id: 41,
    name: "Patriot Viper Steel 16GB",
    price: 70,
    image: "/imgs/rams/patriot-viper-steel.webp",
  },
  {
    id: 42,
    name: "Patriot Viper Steel 32GB",
    price: 140,
    image: "/imgs/rams/patriot-viper-steel.webp",
  },
  {
    id: 43,
    name: "Corsair Dominator Platinum RGB 16GB",
    price: 120,
    image: "/imgs/rams/corsair-dominator-platinum-rgb.webp",
  },
  {
    id: 44,
    name: "Corsair Dominator Platinum RGB 32GB",
    price: 240,
    image: "/imgs/rams/corsair-dominator-platinum-rgb.webp",
  },
  {
    id: 45,
    name: "G.Skill Ripjaws V 16GB",
    price: 80,
    image: "/imgs/rams/gskill-ripjaws-v.webp",
  },
  {
    id: 46,
    name: "G.Skill Ripjaws V 32GB",
    price: 160,
    image: "/imgs/rams/gskill-ripjaws-v.webp",
  },
  {
    id: 47,
    name: "Kingston Fury Beast 16GB",
    price: 85,
    image: "/imgs/rams/kingston-fury-beast.webp",
  },
  {
    id: 48,
    name: "Kingston Fury Beast 32GB",
    price: 170,
    image: "/imgs/rams/kingston-fury-beast.webp",
  },
].sort((a, b) => a.price - b.price);

export default function ramStore() {
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">{t("Available RAMs")}</h2>
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
                onClick={() => addToCart(product.name, product.price, "RAMs")}
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
