import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';
import translationSK from './locales/sk/translation.json';

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    backend: {
      load: 'languageOnly',
    },
    load: 'languageOnly',
    fallbackLng: 'sk',
    supportedLngs: ['sk'],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      sk: {
        translation: translationSK,
      },
    },
    detection: {
      order: ['path'],
      lookupFromPathIndex: 0,
    },
    cache: ['path'],
  });

export default i18n;
