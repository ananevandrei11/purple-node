import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { getKeyValue, STORAGE_DICTONARY } from "../services/storage.service.ts";

const lng =
  process.env?.LANG ??
  (await getKeyValue(STORAGE_DICTONARY.lang)) ??
  "sr";

await i18next.use(Backend).init({
  lng,
  fallbackLng: "en",
  backend: {
    loadPath: "locales/{{lng}}.json",
  },
  interpolation: {
    // CLI output, not HTML — don't escape &, quotes, etc.
    escapeValue: false,
  },
});

const { t } = i18next;

export { t };