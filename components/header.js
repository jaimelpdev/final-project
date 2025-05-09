import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./languageSwitcher";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { userName, logout } = useAuth(); // Obtain the userName and logout function from the AuthContext
  const { t } = useTranslation("common");

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from the AuthContext
      window.location.href = "/"; // Redirect to the home page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        <LanguageSwitcher />
        <div className="userSection">
          {userName ? ( // If authenticated user
            <>
              <span>
                {userName}, {t("Has logged in")}
              </span>
              <button onClick={handleLogout} className="logoutButton">
                {t("Log Out")}
              </button>
            </>
          ) : (
            // If not authenticated user
            <>
              <Link href="http://localhost/ProyectoClase/final-project/pages/sessions/login.php">
                <button className="loginButton">{t("Log In")}</button>
              </Link>
              <Link href="http://localhost/ProyectoClase/final-project/pages/sessions/register.php">
                <button className="signupButton">{t("Sign In")}</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
