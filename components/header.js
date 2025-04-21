import Link from "next/link";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./languageSwitcher";
import { useEffect, useState } from "react";

const Header = () => {
  const { t } = useTranslation("common");
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Fetch the username from the session (or API)
    const user = sessionStorage.getItem("user_name"); // Replace with your session logic
    if (user) {
      setUserName(user);
    }
  }, []);

  const handleLogout = () => {
    // Clear session and redirect to login
    sessionStorage.clear(); // Clear session storage
    window.location.href =
      "http://localhost/ProyectoClase/final-project/pages/sessions/login.php"; // Redirect to login page
  };

  return (
    <div className="header">
      <Link href="/">
        <img className="pageLogo" src="/imgs/logo.webp" alt="Logo" />
      </Link>
      <div className="headerCenter">
        <h1>BYTEMASTERS</h1>
      </div>
      <ul className="menu">
        <li className="categoriesHeader">
          <b>
            <Link href="/general/computers">{t("Computers")}</Link>
          </b>
        </li>
        <li className="categoriesHeader">
          <b>
            <Link href="/general/notebooks">{t("Notebooks")}</Link>
          </b>
        </li>
        <li className="categoriesHeader">
          <b>
            <Link href="/general/components">{t("Components")}</Link>
          </b>
        </li>
      </ul>
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
          <Link href="/sessions/login.php">
            <button className="loginButton">{t("Log In")}</button>
          </Link>
        )}
      </div>
      <div className="languageSwitcher">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
