import Link from "next/link";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./languageSwitcher";
import { useEffect, useState } from "react";

const Header = () => {
  const { t } = useTranslation("common");
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Simula obtener el nombre del usuario desde una API o sesión
    const user = sessionStorage.getItem("user_name");
    if (!user) {
      // Si no hay usuario en sessionStorage, intenta obtenerlo desde el servidor
      fetch("/api/getUserName") // Cambia esto por tu endpoint real
        .then((res) => res.json())
        .then((data) => {
          if (data.user_name) {
            sessionStorage.setItem("user_name", data.user_name);
            setUserName(data.user_name);
          }
        });
    }
  }, []);

  useEffect(() => {
    // Obtain the user name from sessionStorage when the component mounts
    const user = sessionStorage.getItem("user_name");
    if (user) {
      setUserName(user);
    }

    // Listen for changes in sessionStorage
    const handleStorageChange = () => {
      const updatedUser = sessionStorage.getItem("user_name");
      setUserName(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserName(null);
    window.location.href =
      "http://localhost/ProyectoClase/final-project/pages/sessions/login.php";
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/">
          <img className="pageLogo" src="/imgs/logo.webp" alt="Logo" />
        </Link>
      </div>
      <div className="header-center">
        <h1 className="header-title">BYTEMASTERS</h1>
        <ul className="menu">
          <li>
            <Link href="/general/computers">{t("Computers")}</Link>
          </li>
          <li>
            <Link href="/general/notebooks">{t("Notebooks")}</Link>
          </li>
          <li>
            <Link href="/general/components">{t("Components")}</Link>
          </li>
        </ul>
      </div>
      <div className="header-right">
        <div className="userSection">
          {userName ? (
            <>
              <span>
                {t("Welcome")}, {userName}!
              </span>
              <button onClick={handleLogout} className="logoutButton">
                {t("Log Out")}
              </button>
            </>
          ) : (
            <>
              <Link href="http://localhost/ProyectoClase/final-project/pages/sessions/login.php">
                <button className="loginButton">{t("Log In")}</button>
              </Link>
              <Link href="http://localhost/ProyectoClase/final-project/pages/sessions/register.php">
                <button className="signupButton">{t("Sign Up")}</button>
              </Link>
            </>
          )}
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
