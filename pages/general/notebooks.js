import { useState, useEffect } from "react";
import Header from "../../components/header";
import Cart from "../../components/cart";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Notebooks() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [displayedModel, setDisplayedModel] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  useEffect(() => {
    fetch("/json/notebooks.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.notebooks) {
          const uniqueBrands = [
            ...new Set(data.notebooks.map((notebook) => notebook.brand)),
          ];
          setBrands(uniqueBrands);
        } else {
          console.error("No notebooks data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching notebooks data:", error);
      });
  }, []);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel(null);
    setIsSubmitted(false);
    fetch("/json/notebooks.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredModels = data.notebooks.filter(
          (notebook) => notebook.brand === brand
        );
        setModels(filteredModels);
      });
  };

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    fetch("/json/notebooks.json")
      .then((response) => response.json())
      .then((data) => {
        const model = data.notebooks.find((notebook) => notebook.id == modelId);
        setSelectedModel(model);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedModel) {
      setIsSubmitted(true);
      setDisplayedModel(selectedModel);
    }
  };

  return (
    <div>
      <Header />
      <h2 id="title">{t("Notebooks")}</h2>
      <div className="cart-header">
        <Cart />
      </div>
      <form id="devices_form" onSubmit={handleSubmit}>
        <label htmlFor="device_brand">{t("Brand")}:</label>
        <select id="device_brand" onChange={handleBrandChange}>
          <option value="">{t("- Please select -")}</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="device_name">{t("Model")}:</label>
        <select
          id="device_name"
          onChange={handleModelChange}
          disabled={!selectedBrand}
        >
          <option value="">{t("- Please select -")}</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" id="device_submit" disabled={!selectedModel}>
          {t("Show Notebook")}
        </button>
      </form>
      {isSubmitted && displayedModel && (
        <div id="devicesDetails">
          <div className="devicesDetailsContainer">
            <img
              class="devicesImage"
              src={displayedModel.image}
              alt="device's image"
            />
            <div className="devicesDescriptionContainer">
              <p id="devicesDescription">
                {t(`${displayedModel.name} Description`)}
              </p>
              <div id="devicesSpecifications">
                <h3>{t("Specifications")}:</h3>
                <ul>
                  <li>
                    <b>{t("Processor")}</b>:{" "}
                    {displayedModel.specifications.processor}
                  </li>
                  <li>
                    <b>RAM</b>: {displayedModel.specifications.ram}
                  </li>
                  <li>
                    <b>{t("Storage")}</b>:{" "}
                    {displayedModel.specifications.storage}
                  </li>
                  <li>
                    <b>{t("Display")}</b>:{" "}
                    {displayedModel.specifications.display}
                  </li>
                </ul>
              </div>
              <p>
                <b>{t("Price")}</b>: {displayedModel.price}$
              </p>
              <button
                id="addToCart"
                onClick={() =>
                  addToCart(
                    displayedModel.name,
                    displayedModel.price,
                    "Notebooks"
                  )
                }
              >
                {t("Add to Cart")}
              </button>
            </div>
          </div>
        </div>
      )}
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
