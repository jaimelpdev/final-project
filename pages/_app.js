import { appWithTranslation } from 'next-i18next';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from "../context/AuthContext";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;