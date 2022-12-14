import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "../assets/i18n/en.json"
import zhTW from "../assets/i18n/zh-TW.json"

const resources = {
  en: {
    translation: en,
  },
  "zh-TW": {
    translation: zhTW,
  },
}
i18n.use(initReactI18next).init({
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "zh-TW",
  resources,
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === "development" && true,
})

export default i18n
