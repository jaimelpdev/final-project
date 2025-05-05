import { useCart } from "../context/CartContext";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";

export default function Cart() {
  const {
    cart,
    showCart,
    toggleCart,
    addToCart,
    removeFromCart,
    decrementFromCart,
    emptyCart,
    checkout,
    getTotal,
  } = useCart();
  const { t } = useTranslation("common");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  // Obtain the user's email from the backend
  useEffect(() => {
    fetch("/api/getUserEmail.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          setCustomerEmail(data.email);
        }
      })
      .catch((error) => console.error("Error fetching user email:", error));
  }, []);

  const handleCheckout = () => {
    checkout();
    setShowSuccessPopup(true); // Show the success popup
  };

  return (
    <>
      {!showCart && (
        <div>
          <button className="cart-icon" onClick={toggleCart}>
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      )}
      <div className={`cart-sidebar ${showCart ? "show" : ""}`}>
        <div className="cart-header">
          <h2>{t("Shopping Cart")}</h2>
          <button className="close-cart" onClick={toggleCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cart-content">
          {Object.entries(cart).length > 0 ? (
            <>
              {Object.entries(cart).map(([category, items]) => (
                <div key={category} className="cart-category">
                  <h3>
                    {typeof category === "object" ? category.name : t(category)}
                  </h3>
                  <ul className="cart-items">
                    {items.map((item, index) => (
                      <li key={index}>
                        <span className="item-name">{item.name}</span>
                        <div className="item-details">
                          <span className="item-price">${item.price}</span>
                          <div className="quantity-control">
                            <button
                              onClick={() =>
                                decrementFromCart(item.name, category)
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                addToCart(item.name, item.price, category)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="remove"
                            onClick={() => removeFromCart(item.name, category)}
                          >
                            {t("Remove")}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="cart-footer">
                <p className="cart-total">Total: ${getTotal()}</p>
                <div className="cart-buttons">
                  <button className="empty-cart" onClick={emptyCart}>
                    {t("Empty Cart")}
                  </button>
                  <button className="checkout" onClick={handleCheckout}>
                    {t("Checkout")}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="empty-cart-message">{t("Your cart is empty")}</p>
          )}
        </div>
      </div>

      {/* Success popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <span className="success-icon">✔</span>
            <h2>Payment Successful</h2>
            <p>
              The payment has been successfully processed. Further instructions
              will be sent to your email: <strong>{customerEmail}</strong>.
            </p>
            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
