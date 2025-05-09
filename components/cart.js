import { useCart } from "../context/CartContext";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

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
  const { userName } = useAuth(); // Obtén el estado del usuario desde el contexto
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State for error popup
  const [customerEmail, setCustomerEmail] = useState("");

  // Obtain the user email from the server
  useEffect(() => {
    fetch("/api/getUserEmail.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          setCustomerEmail(data.email);
        } else {
          setCustomerEmail(null); // No email found
        }
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
        setCustomerEmail(null); // Error to fetch email
      });
  }, []);

  const handleCheckout = () => {
    if (!userName) {
      // Si no hay usuario, mostrar el popup de error
      setShowErrorPopup(true);
      return;
    }

    try {
      checkout(); // Llama a la función síncrona
      setShowSuccessPopup(true); // Mostrar el popup de éxito
    } catch (error) {
      console.error("Error during checkout:", error);
      setShowErrorPopup(true); // Mostrar el popup de error en caso de fallo
    }
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
              will be sent to your email.
            </p>
            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Error popup */}
      {showErrorPopup && (
        <div className="error-popup">
          <div className="popup-content">
            <span className="error-icon">✖</span>
            <h2>Payment Failed</h2>
            <p>You must be logged in to complete the payment process.</p>
            <button onClick={() => setShowErrorPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
