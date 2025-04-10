import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // Important!

i18n
  .use(HttpApi) // load translations using http (e.g., from public/locales)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    supportedLngs: ['en', 'hi'],
    fallbackLng: 'en',
    debug: true,

    // Path to your translation files in public/
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: { useSuspense: false },
  });

export default i18n;
