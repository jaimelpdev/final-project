import { appWithTranslation } from 'next-i18next';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from "../context/AuthContext";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CartProvider>
  );
}

export default appWithTranslation(MyApp);
