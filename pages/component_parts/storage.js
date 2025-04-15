import { useState } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const products = [
  {
    name: "Seagate Barracuda 1TB HDD",
    price: 50,
    image: "/imgs/storage/seagate-barracuda-1tb-hdd.webp",
    readSpeed: "210 MB/s",
  },
  {
    name: "Kingston A2000 500GB SSD",
    price: 55,
    image: "/imgs/storage/kingston-a2000-ssd.webp",
    readSpeed: "2200 MB/s",
  },
  {
    name: "Western Digital Blue 1TB HDD",
    price: 55,
    image: "/imgs/storage/wd-blue-1tb-hdd.webp",
    readSpeed: "150 MB/s",
  },
  {
    name: "Crucial MX500 500GB SSD",
    price: 60,
    image: "/imgs/storage/crucial-mx500-ssd.webp",
    readSpeed: "560 MB/s",
  },
  {
    name: "Samsung 970 EVO 500GB SSD",
    price: 70,
    image: "/imgs/storage/samsung-970-evo-500gb-ssd.webp",
    readSpeed: "3500 MB/s",
  },
  {
    name: "Western Digital Black 500GB SSD",
    price: 75,
    image: "/imgs/storage/wd-black-ssd.webp",
    readSpeed: "3400 MB/s",
  },
  {
    name: "Seagate Barracuda 2TB HDD",
    price: 80,
    image: "/imgs/storage/seagate-barracuda-2tb-hdd.webp",
    readSpeed: "220 MB/s",
  },
  {
    name: "Western Digital Blue 2TB HDD",
    price: 85,
    image: "/imgs/storage/wd-blue-2tb-hdd.webp",
    readSpeed: "175 MB/s",
  },
  {
    name: "Kingston A2000 1TB SSD",
    price: 100,
    image: "/imgs/storage/kingston-a2000-ssd.webp",
    readSpeed: "2200 MB/s",
  },
  {
    name: "Crucial MX500 1TB SSD",
    price: 110,
    image: "/imgs/storage/crucial-mx500-ssd.webp",
    readSpeed: "560 MB/s",
  },
  {
    name: "Samsung 970 EVO 1TB SSD",
    price: 130,
    image: "/imgs/storage/samsung-970-evo-1tb-ssd.webp",
    readSpeed: "3500 MB/s",
  },
  {
    name: "Western Digital Black 1TB SSD",
    price: 140,
    image: "/imgs/storage/wd-black-ssd.webp",
    readSpeed: "3400 MB/s",
  },
];

export default function storageStore() {
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  return (
    <div>
      <Header />
      <div className="content">
        <div className="cart-header">
          <h2 id="title">{t("Available Storage")}</h2>
          <Cart />
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={`image of a ${product.name}`} />
              <h3>{product.name}</h3>
              <p>{t("Price")}: ${product.price}</p>
              <p>{t("Read Speed")}: {product.readSpeed}</p>
              <button
                className="add-to-cart"
                onClick={() =>
                  addToCart(product.name, product.price, "Storage")
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
