import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Header from "../components/header";

export default function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div>
      <Header />
      <h2 className="subtitle">{t("Welcome to ByteMasters!")}</h2>
      <p className="presentationText">
        {t(
          "Your one-stop shop for the latest and greatest in computer technology. Whether you're a gamer, a professional, or just looking for a reliable machine, we've got you covered."
        )}
      </p>

      <h2 className="subtitle">{t("🔥 Special Offers 🔥")}</h2>
      <div className="offers">
        <div className="offersItem">
          <img src="/imgs/notebooks/dell-xps-13.webp" alt="Dell XPS 13" />
          <p>{t("Dell XPS 13")}</p>
          <p>{t("XPS 13 Description")}</p>
          <p>
            <b>{t("Price")}</b>: $1399
          </p>
        </div>
        <div className="offersItem">
          <img
            src="/imgs/notebooks/apple-macbook-pro-16.webp"
            alt="MacBook Pro 16"
          />
          <p>{t("MacBook Pro 16")}</p>
          <p>{t("MacBook Pro 16 Description")}</p>
          <p>
            <b>{t("Price")}</b>: $2399
          </p>
        </div>
        <div className="offersItem">
          <img
            src="/imgs/computers/asus_rog_strix_ga35.webp"
            alt="ASUS ROG Strix GA35"
          />
          <p>{t("ASUS ROG Strix GA35")}</p>
          <p>{t("ROG Strix GA35 Description")}</p>
          <p>
            <b>{t("Price")}</b>: $1999
          </p>
        </div>
        <div className="offersItem">
          <img
            src="/imgs/computers/lenovo_legion_t5.webp"
            alt="Lenovo Legion T5"
          />
          <p>{t("Lenovo Legion T5")}</p>
          <p>{t("Legion T5 Description")}</p>
          <p>
            <b>{t("Price")}</b>: $1400
          </p>
        </div>
      </div>

      <h2 className="subtitle">{t("🆕 Latest Arrivals 🆕")}</h2>
      <div className="subtitleTextContainer">
        <p className="subtitleTextLeft">
          {t(
            "Check out the newest additions to our store! From the latest NVIDIA RTX 5090 GPUs to the powerful AMD Ryzen 9 processors, we have everything you need to build your dream PC."
          )}
        </p>
        <p className="subtitleTextCenter">
          {t(
            "Explore our collection of high-performance components and accessories. Perfect for gamers, creators, and tech enthusiasts."
          )}
        </p>
        <p className="subtitleTextRight">
          {t(
            "Stay ahead of the curve with our cutting-edge products. Shop now and be the first to experience the future of computing."
          )}
        </p>
      </div>

      <h2 className="subtitle">{t("💻 Featured Products 💻")}</h2>
      <div className="featured">
        <div className="featuredImg">
          <img
            src="/imgs/computers/asus_rog_strix_ga35dx.webp"
            alt="Featured Product"
          />
        </div>
        <div className="featuredText">
          <p>
            {t("ROG Strix GA35DX Description")}
          </p>
          <p>
            <b>{t("Price")}</b>: $2700
          </p>
        </div>
      </div>

      <h2 className="subtitle">{t("Why Choose ByteMasters?")}</h2>
      <div className="subtitleTextContainer">
        <p className="subtitleTextLeft">
          {t(
            "At ByteMasters, we pride ourselves on offering top-quality products at competitive prices. Our team of experts is here to help you find the perfect solution for your needs."
          )}
        </p>
        <p className="subtitleTextCenter">
          {t(
            "Enjoy fast shipping, excellent customer service, and a wide range of products to choose from. Your satisfaction is our priority."
          )}
        </p>
        <p className="subtitleTextRight">
          {t(
            "Join our community of tech enthusiasts and discover why ByteMasters is the go-to destination for all your computing needs."
          )}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
