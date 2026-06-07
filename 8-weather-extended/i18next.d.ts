import "i18next";
import en from "./locales/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    // имя неймспейса по умолчанию (у тебя их нет → 'translation')
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}
