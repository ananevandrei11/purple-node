import https from "https";
import { printError } from "./log.service.js";
import { getKeyValue, STORAGE_DICTONARY } from "./storage.service.js";
import { t } from "../locales/i18next.init.js";

const API_URL = "http://api.weatherapi.com/v1/current.json";

const getWeather = async (city) => {
  const token =
    process.env?.TOKEN ?? (await getKeyValue(STORAGE_DICTONARY.token));
  if (!token) {
    throw new Error(t("token.tokenUndefinded"));
  }
  const lang =
    process.env?.LANG ??
    (await getKeyValue(STORAGE_DICTONARY.lang)) ??
    "sr";

  const url = new URL(API_URL);
  url.searchParams.append("key", token);
  url.searchParams.append("q", city);
  url.searchParams.append("lang", lang);
  const res = await fetch(url.href);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
};

export { getWeather };
