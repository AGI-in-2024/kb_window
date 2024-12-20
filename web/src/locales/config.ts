import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translation_en from './en';
import translation_es from './es';
import translation_id from './id';
import translation_ru from './ru';
import translation_vi from './vi';
import translation_zh from './zh';
import translation_zh_traditional from './zh-traditional';

const resources = {
  ru: translation_ru,
  en: translation_en,
  zh: translation_zh,
  'zh-TRADITIONAL': translation_zh_traditional,
  id: translation_id,
  es: translation_es,
  vi: translation_vi,
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      lookupLocalStorage: 'lng',
    },
    supportedLngs: ['ru', 'en', 'zh', 'zh-TRADITIONAL', 'id', 'es', 'vi'],
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
