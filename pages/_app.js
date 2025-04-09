import { appWithTranslation } from 'next-i18next';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default appWithTranslation(MyApp);
