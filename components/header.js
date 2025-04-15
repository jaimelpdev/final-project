import Link from "next/link";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./languageSwitcher"; // Importa el componente

const Header = () => {
  const { t } = useTranslation("common");

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
      <div className="languageSwitcher">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
