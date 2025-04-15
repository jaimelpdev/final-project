import { useState, useEffect } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function Components() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { addToCart } = useCart();

  const handleComponentClick = (componentType) => {
    router.push(`/components/${componentType}`);
  };

  return (
    <div>
      <Header />
      <h2 id="title">{t("Components")}</h2>
      <div className="cart-header">
        <Cart />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/cpus")}
          >
            <img
              src="/imgs/components/processors.webp"
              alt={t("Processors")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Processors")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/gpus")}
          >
            <img
              src="/imgs/components/graphics.webp"
              alt={t("Graphics Cards")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Graphics Cards")}</p>
        </div>
        <div>
          <button
            onClick={() =>
              handleComponentClick("../component_parts/motherboards")
            }
          >
            <img
              src="/imgs/components/motherboards.webp"
              alt={t("Motherboards")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Motherboards")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/rams")}
          >
            <img
              src="/imgs/components/memory.webp"
              alt={t("Memory")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Memory")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/storage")}
          >
            <img
              src="/imgs/components/storage.webp"
              alt={t("Storage")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Storage")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/power")}
          >
            <img
              src="/imgs/components/power.webp"
              alt={t("Power Supplies")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Power Supplies")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/cases")}
          >
            <img
              src="/imgs/components/cases.webp"
              alt={t("Cases")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Cases")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/cooling")}
          >
            <img
              src="/imgs/components/cooling.webp"
              alt={t("Cooling")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Cooling")}</p>
        </div>
        <div>
          <button
            onClick={() => handleComponentClick("../component_parts/fans")}
          >
            <img
              src="/imgs/components/fans.webp"
              alt={t("Fans")}
              style={{ cursor: "pointer" }}
            />
          </button>
          <p>{t("Fans")}</p>
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
