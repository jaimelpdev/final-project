import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const products = [
  {
    name: "Cooler Master MasterBox Q300L",
    price: 60,
    image: "/imgs/cases/cooler-master-q300l.webp",
    type: "Micro ATX",
  },
  {
    name: "NZXT H510",
    price: 80,
    image: "/imgs/cases/nzxt-h510.webp",
    type: "Mid Tower",
  },
  {
    name: "Phanteks Eclipse P400A",
    price: 90,
    image: "/imgs/cases/phanteks-eclipse-p400a.webp",
    type: "Mid Tower",
  },
  {
    name: "Corsair 4000D Airflow",
    price: 95,
    image: "/imgs/cases/corsair-4000d-airflow.webp",
    type: "Mid Tower",
  },
  {
    name: "Fractal Design Meshify C",
    price: 110,
    image: "/imgs/cases/fractal-meshify-c.webp",
    type: "Mid Tower",
  },
  {
    name: "Thermaltake Core P3",
    price: 150,
    image: "/imgs/cases/thermaltake-core-p3.webp",
    type: "Open Frame",
  },
  {
    name: "ASUS TUF GT501",
    price: 160,
    image: "/imgs/cases/asus-tuf-gt501.webp",
    type: "Mid Tower",
  },
  {
    name: "Be Quiet! Silent Base 802",
    price: 180,
    image: "/imgs/cases/bequiet-silent-base-802.webp",
    type: "Mid Tower",
  },
  {
    name: "Lian Li PC-O11 Dynamic",
    price: 200,
    image: "/imgs/cases/lian-li-pc-o11-dynamic.webp",
    type: "Mid Tower",
  },
];

export default function caseStore() {
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">
            {t("Available")} {t("Cases")}
          </h2>
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
                {t("Type")}: {t(product.type)}
              </p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.name, product.price, "Cases")}
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
