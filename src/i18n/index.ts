import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from '@/locales/zh-CN/common.json';
import zhTW from '@/locales/zh-TW/common.json';
import en from '@/locales/en/common.json';

void i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': { translation: zhCN },
    'zh-TW': { translation: zhTW },
    en: { translation: en },
  },
  lng: 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: { escapeValue: false },
});

export default i18n;
