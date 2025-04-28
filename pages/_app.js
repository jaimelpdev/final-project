import { appWithTranslation } from 'next-i18next';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from "../context/AuthContext";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);