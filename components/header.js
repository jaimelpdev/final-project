import Link from "next/link";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./languageSwitcher";
import { useEffect, useState } from "react";

const Header = () => {
  const { t } = useTranslation("common");
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Obtain the user name from the server
    const fetchUserName = async () => {
      try {
        const response = await fetch("/api/getUserName");
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem("user_name", data.user_name);
          setUserName(data.user_name);
        } else {
          console.error("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    const user = sessionStorage.getItem("user_name");
    if (!user) {
      fetchUserName();
    } else {
      setUserName(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserName(null);
    window.location.href =
      "/";
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
