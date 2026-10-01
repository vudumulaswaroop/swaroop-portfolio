import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./locales/en-US.json";
import hiIN from "./locales/hi-IN.json";
import arAE from "./locales/ar-AE.json";
import { languages } from "./constants/languages";

i18n.use(initReactI18next).init({
  resources: {
    "en-US": { translation: enUS },
    "en-GB": { translation: enUS },
    "en-IN": { translation: enUS },
    "en-AE": { translation: enUS },
    "hi-IN": { translation: hiIN },
    "ar-AE": { translation: arAE },
  },
  lng: "en-US",
  fallbackLng: "en-US",
  supportedLngs: Object.keys(languages),
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

const updateDocumentLocale = (language: string) => {
  document.documentElement.lang = language;
  document.documentElement.dir = i18n.dir(language);
};

updateDocumentLocale(i18n.language);
i18n.on("languageChanged", updateDocumentLocale);

export default i18n;
