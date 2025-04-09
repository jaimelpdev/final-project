import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}