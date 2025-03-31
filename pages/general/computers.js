import { useState, useEffect } from "react";
import Header from "../../components/header";

export default function Computers() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [displayedModel, setDisplayedModel] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("/json/computers.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.computers) {
          const uniqueBrands = [
            ...new Set(data.computers.map((computer) => computer.brand))
          ];
          setBrands(uniqueBrands);
        } else {
          console.error("No computers data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching computers data:", error);
      });
  }, []);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel(null);
    setIsSubmitted(false);
    fetch("/json/computers.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredModels = data.computers.filter(
          (computer) => computer.brand === brand
        );
        setModels(filteredModels);
      });
  };

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    fetch("/json/computers.json")
      .then((response) => response.json())
      .then((data) => {
        const model = data.computers.find((computer) => computer.id == modelId);
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

  const addToCart = (product, price) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.product === product);
      if (item) {
        return prevCart.map((item) =>
          item.product === product
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + price
              }
            : item
        );
      } else {
        if (!showCart) {
          setShowCart(true);
        }
        return [
          ...prevCart,
          { product, price, quantity: 1, totalPrice: price }
        ];
      }
    });
  };

  const decrementFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.product === product
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - item.price
              }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.product !== product));
  };

  const emptyCart = () => setCart([]);
  const checkout = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <Header />
      <h2 id="title">Computers</h2>
      <div className="cart-header">
        <button className="cart-icon" onClick={toggleCart}>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
      {showCart && (
        <div id="cart" className="cart-dropdown show">
          <ul id="cart-items">
            {cart.map((item, index) => (
              <li key={index}>
                <span>
                  {item.product} - {item.price}$ x {item.quantity} ={" "}
                  {item.totalPrice}$
                </span>
                <span className="quantity-control">
                  <button
                    id="minus"
                    onClick={() => decrementFromCart(item.product)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    id="plus"
                    onClick={() => addToCart(item.product, item.price)}
                  >
                    +
                  </button>
                </span>
                <button
                  className="remove"
                  onClick={() => removeFromCart(item.product)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p id="total">Total: {total}$</p>
          <button onClick={emptyCart}>Empty Cart</button>
          <button onClick={checkout}>Checkout</button>
        </div>
      )}
      <form id="devices_form" onSubmit={handleSubmit}>
        <label htmlFor="device_brand">Brand:</label>
        <select id="device_brand" onChange={handleBrandChange}>
          <option value="">- Please select -</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="device_name">Model:</label>
        <select
          id="device_name"
          onChange={handleModelChange}
          disabled={!selectedBrand}
        >
          <option value="">- Please select -</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" id="device_submit" disabled={!selectedModel}>
          Show Computer
        </button>
      </form>
      {isSubmitted && displayedModel && (
        <div id="devicesDetails">
          <div className="devicesDetailsContainer">
            <img
              id="devicesImage"
              src={displayedModel.image}
              alt="device's image"
            />
            <div className="devicesDescriptionContainer">
              <p id="devicesDescription">{displayedModel.description}</p>
              <div id="devicesSpecifications">
                <h3>Specifications:</h3>
                <ul>
                  <li>
                    <b>Processor</b>: {displayedModel.specifications.processor}
                  </li>
                  <li>
                    <b>Geraphics</b>: {displayedModel.specifications.graphics}
                  </li>
                  <li>
                    <b>RAM</b>: {displayedModel.specifications.ram}
                  </li>
                  <li>
                    <b>Storage</b>: {displayedModel.specifications.storage}
                  </li>
                </ul>
              </div>
              <p>
                <b>Price</b>: {displayedModel.price}$
              </p>
              <button
                id="addToCart"
                onClick={() =>
                  addToCart(displayedModel.name, displayedModel.price)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
