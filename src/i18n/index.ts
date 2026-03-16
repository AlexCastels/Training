import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from './locales/it.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
    resources: {
        it: { translation: it },
        en: { translation: en },
    },
    lng: 'it',           // lingua di default
    fallbackLng: 'en',   // se una chiave manca, usa inglese
    load: 'languageOnly' // per normalizzare il valore che generalmente è it-IT
});

export default i18n;