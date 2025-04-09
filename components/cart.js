import { useCart } from "../context/CartContext";

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
    getTotal
  } = useCart();

  return (
    <>
      <button className="cart-icon" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
      </button>
      <div className={`cart-sidebar ${showCart ? 'show' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={toggleCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cart-content">
          {Object.entries(cart).length > 0 ? (
            <>
              {Object.entries(cart).map(([category, items]) => (
                <div key={category} className="cart-category">
                  <h3>{category}</h3>
                  <ul className="cart-items">
                    {items.map((item, index) => (
                      <li key={index}>
                        <span className="item-name">{item.name}</span>
                        <div className="item-details">
                          <span className="item-price">${item.price}</span>
                          <div className="quantity-control">
                            <button
                              onClick={() => decrementFromCart(item.name, category)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item.name, item.price, category)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="remove"
                            onClick={() => removeFromCart(item.name, category)}
                          >
                            Remove
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
                    Empty Cart
                  </button>
                  <button className="checkout" onClick={checkout}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="empty-cart-message">Your cart is empty</p>
          )}
        </div>
      </div>
    </>
  );
}
