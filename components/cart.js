export default function Cart({ cart, setCart, showCart, toggleCart, total }) {
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

  return (
    <div>
      <button className="cart-icon" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
      </button>
      {showCart && (
        <div id="cart" className="cart-dropdown show">
          <ul id="cart-items">
            {cart.map((item, index) => (
              <li key={index}>
                <span>
                  {item.product} - ${item.price}
                </span>
                <span className="quantity-control">
                  <button onClick={() => decrementFromCart(item.product)}>
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => addToCart(item.product, item.price)}>
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
          <p id="total">Total: ${total}</p>
          <button className="blue-buttons-cart" onClick={emptyCart}>
            Empty Cart
          </button>
          <button className="blue-buttons-cart" onClick={checkout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
