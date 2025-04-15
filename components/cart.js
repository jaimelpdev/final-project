import { useCart } from "../context/CartContext";
import { useTranslation } from "next-i18next";

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
                  <button className="checkout" onClick={checkout}>
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
    </>
  );
}
